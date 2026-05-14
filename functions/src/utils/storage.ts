import { getStorage } from "firebase-admin/storage";
import { AnalysisError } from "./errors";

export async function downloadImageAsBase64(path: string): Promise<{ mimeType: string, base64: string }> {
  try {
    const bucket = getStorage().bucket();
    const file = bucket.file(path);
    
    const [exists] = await file.exists();
    if (!exists) {
      throw new AnalysisError("storage_failed", `Image not found at path: ${path}`);
    }

    const [metadata] = await file.getMetadata();
    const mimeType = metadata.contentType || "image/jpeg";
    
    const [buffer] = await file.download();
    
    return {
      mimeType,
      base64: buffer.toString("base64")
    };
  } catch (error: any) {
    console.error("Failed to download image:", error);
    if (error instanceof AnalysisError) throw error;
    throw new AnalysisError("storage_failed", "Failed to load image from storage.");
  }
}
