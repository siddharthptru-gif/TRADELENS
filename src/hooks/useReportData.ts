import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { ref, onValue, off, get, set, push } from 'firebase/database';
import { db } from '../lib/rtdb';
import { ChartScan } from '../types/dashboard';
import { AnalysisReportRecord } from '../types/report';

export function useReportData(reportId: string | undefined) {
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [report, setReport] = useState<AnalysisReportRecord | null>(null);
  const [scan, setScan] = useState<ChartScan | null>(null);
  
  const [isSaved, setIsSaved] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    if (!user || !reportId) return;

    setLoading(true);
    const reportRef = ref(db, `analysisReports/${user.uid}/${reportId}`);
    
    get(reportRef).then(async (snapshot) => {
      if (!snapshot.exists()) {
        setError("Report not found.");
        setLoading(false);
        return;
      }
      
      const rData = snapshot.val() as AnalysisReportRecord;
      setReport(rData);
      
      // Check if saved
      const savedRef = ref(db, `savedReports/${user.uid}/${reportId}`);
      try {
        const savedSnap = await get(savedRef);
        setIsSaved(savedSnap.exists());
      } catch (e) {
        console.warn("Could not check saved status", e);
      }

      if (rData.scanId) {
        const scanRef = ref(db, `chartScans/${user.uid}/${rData.scanId}`);
        const scanSnap = await get(scanRef);
        if (scanSnap.exists()) {
          setScan(scanSnap.val() as ChartScan);
        }
      }
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setError("Failed to load report data.");
      setLoading(false);
    });

  }, [user, reportId]);

  const saveReport = async () => {
    if (!user || !report || isSaved) return { success: false };
    setActionLoading(true);
    try {
      const savedRef = ref(db, `savedReports/${user.uid}/${report.reportId}`);
      await set(savedRef, {
        reportId: report.reportId,
        scanId: report.scanId,
        savedAt: Date.now(),
        tags: [],
        userNote: ""
      });
      setIsSaved(true);
      return { success: true };
    } catch (err: any) {
      console.error("Save report failed:", err);
      return { success: false, error: err.message };
    } finally {
      setActionLoading(false);
    }
  };

  const addToJournal = async () => {
    if (!user || !report) return { success: false };
    setActionLoading(true);
    try {
      const newRef = push(ref(db, `tradingJournal/${user.uid}`));
      const journalId = newRef.key!;
      
      await set(newRef, {
        journalId,
        reportId: report.reportId,
        scanId: report.scanId,
        symbol: scan?.symbol || "",
        market: scan?.marketType || "unknown",
        timeframe: scan?.timeframe || "unknown",
        setupType: report.fullReport.ifIWereAnalyzing?.myBias || "Unknown",
        aiStance: report.finalStance,
        userDecision: "watchlist",
        entryPrice: null,
        exitPrice: null,
        result: null,
        rMultiple: null,
        emotionalState: "neutral",
        mistakeNotes: "",
        followUpNotes: "",
        followUpImagePath: "",
        lessonsLearned: "",
        tags: [],
        createdAt: Date.now(),
        updatedAt: Date.now()
      });
      return { success: true };
    } catch (err: any) {
      console.error("Add to journal failed:", err);
      return { success: false, error: err.message };
    } finally {
      setActionLoading(false);
    }
  };

  const addToWatchlist = async (symbolOverride?: string) => {
    if (!user || !report) return { success: false };
    const sym = symbolOverride || scan?.symbol;
    if (!sym) return { success: false, error: "symbol_missing" };
    
    setActionLoading(true);
    try {
      const newRef = push(ref(db, `watchlists/${user.uid}`));
      const watchlistId = newRef.key!;
      
      await set(newRef, {
        watchlistId,
        symbol: sym,
        market: scan?.marketType || "unknown",
        timeframe: scan?.timeframe || "unknown",
        importantSupport: report.fullReport.supportResistance?.keySupport?.[0] || "",
        importantResistance: report.fullReport.supportResistance?.keyResistance?.[0] || "",
        notes: "Added from AI report.",
        linkedReports: [report.reportId],
        createdAt: Date.now(),
        updatedAt: Date.now()
      });
      return { success: true };
    } catch (err: any) {
      console.error("Add to watchlist failed:", err);
      return { success: false, error: err.message };
    } finally {
      setActionLoading(false);
    }
  };

  return {
    loading,
    error,
    report,
    fullReport: report?.fullReport,
    scan,
    saveReport,
    addToJournal,
    addToWatchlist,
    isSaved,
    actionLoading
  };
}
