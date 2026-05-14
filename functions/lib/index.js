"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestAnalysis = void 0;
const app_1 = require("firebase-admin/app");
const https_1 = require("firebase-functions/v2/https");
const analyzeChart_1 = require("./ai/analyzeChart");
(0, app_1.initializeApp)();
exports.requestAnalysis = (0, https_1.onCall)({ maxInstances: 10, timeoutSeconds: 300, memory: "1GiB" }, async (request) => {
    if (!request.auth) {
        throw new https_1.HttpsError("unauthenticated", "User must be authenticated to request analysis.");
    }
    const { scanId } = request.data;
    if (!scanId || typeof scanId !== "string") {
        throw new https_1.HttpsError("invalid-argument", "scanId is required and must be a string.");
    }
    try {
        const reportId = await (0, analyzeChart_1.analyzeChartPipeline)(request.auth.uid, scanId);
        return { success: true, reportId };
    }
    catch (error) {
        console.error("requestAnalysis error:", error);
        if (error.code && error.code.startsWith("functions/")) {
            throw new https_1.HttpsError(error.code.replace("functions/", ""), error.message);
        }
        else if (error.code) {
            throw new https_1.HttpsError(error.code, error.message);
        }
        throw new https_1.HttpsError("internal", error.message || "An unknown error occurred during analysis.");
    }
});
//# sourceMappingURL=index.js.map