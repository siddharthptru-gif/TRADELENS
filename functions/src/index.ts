import { initializeApp } from "firebase-admin/app";
import { onCall, HttpsError } from "firebase-functions/v2/https";
import { analyzeChartPipeline } from "./ai/analyzeChart";

initializeApp();

export const requestAnalysis = onCall({ maxInstances: 10, timeoutSeconds: 300, memory: "1GiB" }, async (request) => {
    if (!request.auth) {
        throw new HttpsError("unauthenticated", "User must be authenticated to request analysis.");
    }
    
    const { scanId } = request.data;
    if (!scanId || typeof scanId !== "string") {
        throw new HttpsError("invalid-argument", "scanId is required and must be a string.");
    }

    try {
        const reportId = await analyzeChartPipeline(request.auth.uid, scanId);
        return { success: true, reportId };
    } catch (error: any) {
        console.error("requestAnalysis error:", error);
        
        if (error.code && error.code.startsWith("functions/")) {
            throw new HttpsError(error.code.replace("functions/", ""), error.message);
        } else if (error.code) {
           throw new HttpsError(error.code as any, error.message);
        }
        
        throw new HttpsError("internal", error.message || "An unknown error occurred during analysis.");
    }
});
