import { getDatabase } from "firebase-admin/database";

export function getRtdb() {
  return getDatabase();
}

export async function getScanRecord(uid: string, scanId: string) {
  const db = getRtdb();
  const snap = await db.ref(`chartScans/${uid}/${scanId}`).once("value");
  return snap.val();
}

export async function updateScanStatus(uid: string, scanId: string, updates: any) {
  const db = getRtdb();
  await db.ref(`chartScans/${uid}/${scanId}`).update(updates);
}

export async function saveAnalysisReport(uid: string, reportId: string, data: any) {
  const db = getRtdb();
  await db.ref(`analysisReports/${uid}/${reportId}`).set({
    ...data,
    createdAt: Date.now()
  });
}

export async function generateReportId(uid: string) {
  const db = getRtdb();
  return db.ref(`analysisReports/${uid}`).push().key as string;
}

export async function saveAuditLog(uid: string, logId: string, data: any) {
  const db = getRtdb();
  await db.ref(`aiAuditLogs/${uid}/${logId}`).set(data);
}

export function generateLogId(uid: string) {
  const db = getRtdb();
  return db.ref(`aiAuditLogs/${uid}`).push().key as string;
}
