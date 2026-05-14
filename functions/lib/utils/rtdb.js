"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRtdb = getRtdb;
exports.getScanRecord = getScanRecord;
exports.updateScanStatus = updateScanStatus;
exports.saveAnalysisReport = saveAnalysisReport;
exports.generateReportId = generateReportId;
exports.saveAuditLog = saveAuditLog;
exports.generateLogId = generateLogId;
const database_1 = require("firebase-admin/database");
function getRtdb() {
    return (0, database_1.getDatabase)();
}
async function getScanRecord(uid, scanId) {
    const db = getRtdb();
    const snap = await db.ref(`chartScans/${uid}/${scanId}`).once("value");
    return snap.val();
}
async function updateScanStatus(uid, scanId, updates) {
    const db = getRtdb();
    await db.ref(`chartScans/${uid}/${scanId}`).update(updates);
}
async function saveAnalysisReport(uid, reportId, data) {
    const db = getRtdb();
    await db.ref(`analysisReports/${uid}/${reportId}`).set({
        ...data,
        createdAt: Date.now()
    });
}
async function generateReportId(uid) {
    const db = getRtdb();
    return db.ref(`analysisReports/${uid}`).push().key;
}
async function saveAuditLog(uid, logId, data) {
    const db = getRtdb();
    await db.ref(`aiAuditLogs/${uid}/${logId}`).set(data);
}
function generateLogId(uid) {
    const db = getRtdb();
    return db.ref(`aiAuditLogs/${uid}`).push().key;
}
//# sourceMappingURL=rtdb.js.map