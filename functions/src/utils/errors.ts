import { HttpsError } from "firebase-functions/v2/https";

export class AnalysisError extends Error {
  constructor(public errorCode: string, message: string, public statusCode: import("firebase-functions/v2/https").FunctionsErrorCode = "internal") {
    super(message);
    this.name = "AnalysisError";
  }
}

export function createHttpsError(statusCode: import("firebase-functions/v2/https").FunctionsErrorCode, errorCode: string, message: string): HttpsError {
  return new HttpsError(statusCode, message, { errorCode });
}
