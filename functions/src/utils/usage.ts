import { getRtdb } from "./rtdb";
import { AnalysisError } from "./errors";

export interface UsageLimits {
  dailyLimit: number;
  monthlyLimit: number;
  dailyUsed: number;
  monthlyUsed: number;
  lastScanAt: number;
}

export async function checkAndInitializeUsage(uid: string): Promise<UsageLimits> {
  const db = getRtdb();
  const ref = db.ref(`usageLimits/${uid}`);
  
  return ref.transaction((currentData: any) => {
    if (currentData === null) {
      return {
        dailyLimit: 3,
        monthlyLimit: 90,
        dailyUsed: 0,
        monthlyUsed: 0,
        lastScanAt: 0
      };
    }
    return currentData; // No change
  }).then((result) => {
    const data = result.snapshot.val() as UsageLimits;
    if (data.dailyUsed >= data.dailyLimit || data.monthlyUsed >= data.monthlyLimit) {
      throw new AnalysisError("usage_limit_reached", "You have reached your scan limit for this plan.", "resource-exhausted");
    }
    return data;
  });
}

export async function incrementUsage(uid: string) {
  const db = getRtdb();
  const ref = db.ref(`usageLimits/${uid}`);
  await ref.transaction((currentData: any) => {
    if (currentData !== null) {
      currentData.dailyUsed = (currentData.dailyUsed || 0) + 1;
      currentData.monthlyUsed = (currentData.monthlyUsed || 0) + 1;
      currentData.lastScanAt = Date.now();
      return currentData;
    }
    return {
      dailyLimit: 3,
      monthlyLimit: 90,
      dailyUsed: 1,
      monthlyUsed: 1,
      lastScanAt: Date.now()
    };
  });
}
