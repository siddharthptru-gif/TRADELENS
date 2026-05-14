import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { ref, onValue, set, remove, get } from 'firebase/database';
import { db } from '../lib/rtdb';
import { SavedReportRecord, EnrichedSavedReport } from '../types/savedReport';
import { AnalysisReportRecord } from '../types/report';
import { ChartScan } from '../types/dashboard';

export function useSavedReports() {
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [savedReports, setSavedReports] = useState<SavedReportRecord[]>([]);
  const [enrichedReports, setEnrichedReports] = useState<EnrichedSavedReport[]>([]);

  useEffect(() => {
    if (!user) return;

    setLoading(true);
    
    // Listen to saved reports
    const savedRef = ref(db, `savedReports/${user.uid}`);
    const analysisRef = ref(db, `analysisReports/${user.uid}`);
    const scansRef = ref(db, `chartScans/${user.uid}`);

    // In a real application with huge data, we might only fetch specific IDs.
    // For this context, fetching the user's data spaces using onValue is reasonable.
    let savedMap: Record<string, SavedReportRecord> = {};
    let analysisMap: Record<string, AnalysisReportRecord> = {};
    let scansMap: Record<string, ChartScan> = {};

    const enrich = () => {
      const savedList = Object.values(savedMap).sort((a, b) => b.savedAt - a.savedAt);
      setSavedReports(savedList);

      const enriched: EnrichedSavedReport[] = savedList.map(s => ({
        savedData: s,
        reportData: analysisMap[s.reportId] || null,
        scanData: scansMap[s.scanId] || null
      }));

      setEnrichedReports(enriched);
      setLoading(false);
    };

    const unsubSaved = onValue(savedRef, (snap) => {
      savedMap = snap.val() || {};
      enrich();
    }, (err) => {
      console.error("Error fetching saved reports:", err);
      setError("Failed to load saved reports");
      setLoading(false);
    });

    const unsubAnalysis = onValue(analysisRef, (snap) => {
      analysisMap = snap.val() || {};
      enrich();
    });

    const unsubScans = onValue(scansRef, (snap) => {
      scansMap = snap.val() || {};
      enrich();
    });

    return () => {
      unsubSaved();
      unsubAnalysis();
      unsubScans();
    };

  }, [user]);

  const updateSavedReportTags = async (reportId: string, tags: string[]) => {
    if (!user) return { success: false };
    try {
      const tagsRef = ref(db, `savedReports/${user.uid}/${reportId}/tags`);
      await set(tagsRef, tags);
      return { success: true };
    } catch (err: any) {
      console.error("Failed to update tags:", err);
      return { success: false, error: err.message };
    }
  };

  const updateSavedReportNote = async (reportId: string, note: string) => {
    if (!user) return { success: false };
    try {
      const noteRef = ref(db, `savedReports/${user.uid}/${reportId}/userNote`);
      await set(noteRef, note);
      return { success: true };
    } catch (err: any) {
      console.error("Failed to update note:", err);
      return { success: false, error: err.message };
    }
  };

  const removeSavedReport = async (reportId: string) => {
    if (!user) return { success: false };
    try {
      const reportRef = ref(db, `savedReports/${user.uid}/${reportId}`);
      await remove(reportRef);
      return { success: true };
    } catch (err: any) {
      console.error("Failed to remove saved report:", err);
      return { success: false, error: err.message };
    }
  };

  return {
    loading,
    error,
    savedReports,
    enrichedReports,
    updateSavedReportTags,
    updateSavedReportNote,
    removeSavedReport
  };
}
