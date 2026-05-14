"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeChartPipeline = analyzeChartPipeline;
const rtdb_1 = require("../utils/rtdb");
const storage_1 = require("../utils/storage");
const usage_1 = require("../utils/usage");
const errors_1 = require("../utils/errors");
const geminiClient_1 = require("./geminiClient");
const safety_1 = require("./safety");
const prompts_1 = require("./prompts");
const ajv_1 = __importDefault(require("ajv"));
const reportSchema_1 = require("./reportSchema");
const ajv = new ajv_1.default();
const validateSchema = ajv.compile(reportSchema_1.reportSchema);
async function analyzeChartPipeline(uid, scanId) {
    let modelUsedForPricing = "";
    let inTokens = 0;
    let outTokens = 0;
    let durationMs = 0;
    let finalReportId = "";
    try {
        // 1. Fetch scan
        const scan = await (0, rtdb_1.getScanRecord)(uid, scanId);
        if (!scan) {
            throw new errors_1.AnalysisError("not-found", "Scan not found", "not-found");
        }
        if (scan.ownerUid !== uid && scan.userId !== uid) {
            throw new errors_1.AnalysisError("permission-denied", "Unauthorized access to scan", "permission-denied");
        }
        if (scan.status === "completed" && scan.reportId) {
            return scan.reportId;
        }
        // 2. Check usage limits
        await (0, usage_1.checkAndInitializeUsage)(uid);
        // 3. Update status
        await (0, rtdb_1.updateScanStatus)(uid, scanId, { status: "analyzing", startedAt: Date.now() });
        // 4. Download image
        const targetPath = scan.compressedImagePath || scan.imagePath || scan.originalImagePath;
        if (!targetPath) {
            throw new errors_1.AnalysisError("storage_failed", "No image path found for scan.");
        }
        const imageInfo = await (0, storage_1.downloadImageAsBase64)(targetPath);
        // 5. Call API
        const aiResult = await (0, geminiClient_1.callGeminiVision)(imageInfo.base64, imageInfo.mimeType, {
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
        await (0, rtdb_1.updateScanStatus)(uid, scanId, { status: "validating" });
        // 6. Validations
        const isValid = validateSchema(aiResult.report);
        if (!isValid) {
            console.error("Schema validation errors:", validateSchema.errors);
            throw new errors_1.AnalysisError("validation_failed", "AI response did not match required schema.");
        }
        const sanitizedReport = (0, safety_1.sanitizeReport)(aiResult.report);
        const finalReport = (0, safety_1.validateSafety)(sanitizedReport);
        // Check if it's a non-chart image (e.g. analysisConfidence 0)
        // We already validate it matches schema, but let's check confidence
        if (finalReport.analysisConfidence === 0) {
            // Proceed anyway, report usually structured logically.
        }
        // 7. Save report
        const reportId = await (0, rtdb_1.generateReportId)(uid);
        finalReportId = reportId;
        finalReport.reportId = reportId;
        finalReport.scanId = scanId;
        await (0, rtdb_1.saveAnalysisReport)(uid, reportId, {
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
        // 8. Update scan
        await (0, rtdb_1.updateScanStatus)(uid, scanId, {
            status: "completed",
            reportId,
            completedAt: Date.now(),
            modelUsed: aiResult.modelUsed,
            promptVersion: prompts_1.PROMPT_VERSION
        });
        // 9. Increment usage
        await (0, usage_1.incrementUsage)(uid);
        // 10. Audit log
        const logId = (0, rtdb_1.generateLogId)(uid);
        await (0, rtdb_1.saveAuditLog)(uid, logId, {
            logId,
            scanId,
            reportId,
            model: aiResult.modelUsed,
            promptVersion: prompts_1.PROMPT_VERSION,
            latencyMs: durationMs,
            inputTokens: inTokens,
            outputTokens: outTokens,
            safetyChecksPassed: true,
            createdAt: Date.now()
        });
        return reportId;
    }
    catch (error) {
        let errorCode = "ai_failed";
        if (error instanceof errors_1.AnalysisError) {
            errorCode = error.errorCode;
        }
        else if (error.message && error.message.includes("schema")) {
            errorCode = "validation_failed";
        }
        else if (error.message && error.message.includes("storage")) {
            errorCode = "storage_failed";
        }
        // Mark as failed
        await (0, rtdb_1.updateScanStatus)(uid, scanId, {
            status: "failed",
            errorCode
        });
        // Log audit failure if AI was called
        if (durationMs > 0) {
            const logId = (0, rtdb_1.generateLogId)(uid);
            await (0, rtdb_1.saveAuditLog)(uid, logId, {
                logId,
                scanId,
                reportId: null,
                model: modelUsedForPricing,
                promptVersion: prompts_1.PROMPT_VERSION,
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
//# sourceMappingURL=analyzeChart.js.map