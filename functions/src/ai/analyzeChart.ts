import { getScanRecord, updateScanStatus, saveAnalysisReport, saveAuditLog, generateReportId, generateLogId } from "../utils/rtdb";
import { downloadImageAsBase64 } from "../utils/storage";
import { checkAndInitializeUsage, incrementUsage } from "../utils/usage";
import { AnalysisError } from "../utils/errors";
import { callGeminiVision } from "./geminiClient";
import { sanitizeReport, validateSafety } from "./safety";
import { PROMPT_VERSION } from "./prompts";
import Ajv from "ajv";
import { reportSchema } from "./reportSchema";

const ajv = new Ajv();
const validateSchema = ajv.compile(reportSchema);

export async function analyzeChartPipeline(uid: string, scanId: string): Promise<string> {
  console.log("[requestAnalysis] started", { uid, scanId });
  let modelUsedForPricing = "";
  let inTokens = 0;
  let outTokens = 0;
  let durationMs = 0;
  let finalReportId = "";
  
  try {
    // 1. Fetch scan
    const scan = await getScanRecord(uid, scanId);
    console.log("[requestAnalysis] scan loaded", scan);
    if (!scan) {
      throw new AnalysisError("not-found", "Scan not found", "not-found");
    }
    if (scan.ownerUid !== uid && scan.userId !== uid) {
      throw new AnalysisError("permission-denied", "Unauthorized access to scan", "permission-denied");
    }
    
    if (scan.status === "completed" && scan.reportId) {
      return scan.reportId;
    }

    // 2. Check usage limits
    await checkAndInitializeUsage(uid);
    console.log("[requestAnalysis] usage checked");

    // 3. Update status
    await updateScanStatus(uid, scanId, { status: "analyzing", startedAt: Date.now() });

    // 4. Download image
    const targetPath = scan.compressedImagePath || scan.imagePath || scan.originalImagePath;
    if (!targetPath) {
      throw new AnalysisError("storage_failed", "No image path found for scan.");
    }
    const imageInfo = await downloadImageAsBase64(targetPath);
    console.log("[requestAnalysis] image loaded from storage");

    // 5. Call API
    console.log("[requestAnalysis] calling Gemini");
    const aiResult = await callGeminiVision(imageInfo.base64, imageInfo.mimeType, {
      scanId,
      marketType: scan.marketType,
      symbol: scan.symbol,
      timeframe: scan.timeframe,
      currentPrice: scan.currentPrice,
      tradingStyle: scan.tradingStyle,
      riskProfile: scan.riskProfile,
      notes: scan.notes,
      accountSize: scan.accountSize,
      riskPercent: scan.riskPercent
    });

    modelUsedForPricing = aiResult.modelUsed;
    inTokens = aiResult.inputTokens;
    outTokens = aiResult.outputTokens;
    durationMs = aiResult.latencyMs;

    console.log("[requestAnalysis] Gemini response received");
    await updateScanStatus(uid, scanId, { status: "validating" });

    // 6. Validations
    const isValid = validateSchema(aiResult.report);
    if (!isValid) {
      console.error("Schema validation errors:", validateSchema.errors);
      throw new AnalysisError("validation_failed", "AI response did not match required schema.");
    }

    console.log("[requestAnalysis] report validated");
    const sanitizedReport = sanitizeReport(aiResult.report);
    const finalReport = validateSafety(sanitizedReport);
    
    // Check if it's a non-chart image (e.g. analysisConfidence 0)
    // We already validate it matches schema, but let's check confidence
    if (finalReport.analysisConfidence === 0) {
       // Proceed anyway, report usually structured logically.
    }

    // 7. Save report
    const reportId = await generateReportId(uid);
    finalReportId = reportId;
    finalReport.reportId = reportId;
    finalReport.scanId = scanId;

    await saveAnalysisReport(uid, reportId, {
      reportId,
      scanId,
      ownerUid: uid,
      analysisConfidence: finalReport.analysisConfidence,
      quickSummary: finalReport.quickSummary,
      finalStance: finalReport.ifIWereAnalyzing.stanceLabel,
      tradeQualityScore: finalReport.tradeQualityScore.score,
      riskLevel: finalReport.riskManagement.riskLevel,
      trendDirection: finalReport.trendAnalysis.direction,
      fullReport: finalReport
    });
    console.log("[requestAnalysis] report saved", { reportId });

    // 8. Update scan
    await updateScanStatus(uid, scanId, {
      status: "completed",
      reportId,
      completedAt: Date.now(),
      modelUsed: aiResult.modelUsed,
      promptVersion: PROMPT_VERSION
    });
    console.log("[requestAnalysis] scan completed");

    // 9. Increment usage
    await incrementUsage(uid);

    // 10. Audit log
    const logId = generateLogId(uid);
    await saveAuditLog(uid, logId, {
      logId,
      scanId,
      reportId,
      model: aiResult.modelUsed,
      promptVersion: PROMPT_VERSION,
      latencyMs: durationMs,
      inputTokens: inTokens,
      outputTokens: outTokens,
      safetyChecksPassed: true,
      createdAt: Date.now()
    });

    return reportId;

  } catch (error: any) {
    console.error(`[requestAnalysis] failed for scan ${scanId}:`, error);
    let errorCode = "unknown_error";
    
    if (error instanceof AnalysisError) {
      errorCode = error.errorCode;
    } else if (error.message && error.message.includes("GEMINI_API_KEY")) {
      errorCode = "gemini_key_missing";
    } else if (error.message && error.message.includes("parse")) {
      errorCode = "json_parse_failed";
    } else if (error.message && error.message.includes("schema")) {
      errorCode = "validation_failed";
    } else if (error.message && error.message.includes("storage")) {
      errorCode = "storage_failed";
    }

    // Mark as failed
    await updateScanStatus(uid, scanId, {
      status: "failed",
      errorCode
    });
    
    // Log audit failure if AI was called
    if (durationMs > 0) {
      const logId = generateLogId(uid);
      await saveAuditLog(uid, logId, {
        logId,
        scanId,
        reportId: null,
        model: modelUsedForPricing,
        promptVersion: PROMPT_VERSION,
        latencyMs: durationMs,
        inputTokens: inTokens,
        outputTokens: outTokens,
        safetyChecksPassed: false,
        error: error.message,
        createdAt: Date.now()
      });
    }

    throw error;
  }
}
