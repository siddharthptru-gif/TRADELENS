import { httpsCallable } from "firebase/functions";
import { functions } from "./firebase";

export async function requestChartAnalysis(scanId: string): Promise<{ success: boolean; reportId?: string }> {
  try {
    const fn = httpsCallable<{ scanId: string }, { success: boolean; reportId?: string }>(functions, "requestAnalysis");
    const result = await fn({ scanId });
    return result.data;
  } catch (error) {
    console.error("Failed to request analysis:", error);
    throw error;
  }
}
