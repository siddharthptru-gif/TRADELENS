"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalysisError = void 0;
exports.createHttpsError = createHttpsError;
const https_1 = require("firebase-functions/v2/https");
class AnalysisError extends Error {
    constructor(errorCode, message, statusCode = "internal") {
        super(message);
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.name = "AnalysisError";
    }
}
exports.AnalysisError = AnalysisError;
function createHttpsError(statusCode, errorCode, message) {
    return new https_1.HttpsError(statusCode, message, { errorCode });
}
//# sourceMappingURL=errors.js.map