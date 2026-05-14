"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAndInitializeUsage = checkAndInitializeUsage;
exports.incrementUsage = incrementUsage;
const rtdb_1 = require("./rtdb");
const errors_1 = require("./errors");
async function checkAndInitializeUsage(uid) {
    const db = (0, rtdb_1.getRtdb)();
    const ref = db.ref(`usageLimits/${uid}`);
    return ref.transaction((currentData) => {
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
        const data = result.snapshot.val();
        if (data.dailyUsed >= data.dailyLimit || data.monthlyUsed >= data.monthlyLimit) {
            throw new errors_1.AnalysisError("usage_limit_reached", "You have reached your scan limit for this plan.", "resource-exhausted");
        }
        return data;
    });
}
async function incrementUsage(uid) {
    const db = (0, rtdb_1.getRtdb)();
    const ref = db.ref(`usageLimits/${uid}`);
    await ref.transaction((currentData) => {
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
//# sourceMappingURL=usage.js.map