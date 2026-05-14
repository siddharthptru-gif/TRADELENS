"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadImageAsBase64 = downloadImageAsBase64;
const storage_1 = require("firebase-admin/storage");
const errors_1 = require("./errors");
async function downloadImageAsBase64(path) {
    try {
        const bucket = (0, storage_1.getStorage)().bucket();
        const file = bucket.file(path);
        const [exists] = await file.exists();
        if (!exists) {
            throw new errors_1.AnalysisError("storage_failed", `Image not found at path: ${path}`);
        }
        const [metadata] = await file.getMetadata();
        const mimeType = metadata.contentType || "image/jpeg";
        const [buffer] = await file.download();
        return {
            mimeType,
            base64: buffer.toString("base64")
        };
    }
    catch (error) {
        console.error("Failed to download image:", error);
        if (error instanceof errors_1.AnalysisError)
            throw error;
        throw new errors_1.AnalysisError("storage_failed", "Failed to load image from storage.");
    }
}
//# sourceMappingURL=storage.js.map