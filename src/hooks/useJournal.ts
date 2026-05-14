import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { ref, onValue, set, remove, update } from 'firebase/database';
import { db } from '../lib/rtdb';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { 
  JournalEntry, 
  EnrichedJournalEntry, 
  JournalStats 
} from '../types/journal';
import { AnalysisReportRecord } from '../types/report';
import { ChartScan } from '../types/dashboard';

export function useJournal() {
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [enrichedEntries, setEnrichedEntries] = useState<EnrichedJournalEntry[]>([]);
  const [stats, setStats] = useState<JournalStats>({
    totalEntries: 0,
    openEntries: 0,
    closedEntries: 0,
    wins: 0,
    losses: 0,
    breakeven: 0,
    skipped: 0,
    averageRMultiple: 0,
    mostCommonMistakeTag: 'N/A',
    needsReviewCount: 0
  });

  useEffect(() => {
    if (!user) return;

    setLoading(true);
    
    const journalRef = ref(db, `tradingJournal/${user.uid}`);
    const analysisRef = ref(db, `analysisReports/${user.uid}`);
    const scansRef = ref(db, `chartScans/${user.uid}`);

    let journalMap: Record<string, JournalEntry> = {};
    let analysisMap: Record<string, AnalysisReportRecord> = {};
    let scansMap: Record<string, ChartScan> = {};

    const enrichAndCalculateStats = () => {
      const entryList = Object.values(journalMap).sort((a, b) => b.createdAt - a.createdAt);
      setEntries(entryList);

      const enriched: EnrichedJournalEntry[] = entryList.map(j => ({
        journal: j,
        report: analysisMap[j.reportId] || null,
        scan: scansMap[j.scanId] || null
      }));

      setEnrichedEntries(enriched);

      // Calculate Stats
      let wins = 0;
      let losses = 0;
      let breakeven = 0;
      let skipped = 0;
      let open = 0;
      let closed = 0;
      let rSum = 0;
      let rCount = 0;
      let needsReview = 0;
      let mistakeTagsCount: Record<string, number> = {};

      const now = Date.now();
      const ONE_DAY = 24 * 60 * 60 * 1000;

      entryList.forEach(entry => {
        const res = entry.result;
        if (res === 'win') wins++;
        else if (res === 'loss') losses++;
        else if (res === 'breakeven') breakeven++;
        else if (res === 'skipped') skipped++;
        else if (res === 'open' || !res) open++;

        if (res && res !== 'open' && res !== 'skipped') {
          closed++;
        }

        if (entry.rMultiple !== undefined) {
          rSum += entry.rMultiple;
          rCount++;
        }

        if (entry.mistakeTags) {
          entry.mistakeTags.forEach(t => {
            mistakeTagsCount[t] = (mistakeTagsCount[t] || 0) + 1;
          });
        }

        if ((!res || res === 'open') && (now - entry.createdAt) > ONE_DAY) {
          needsReview++;
        }
      });

      const mostCommonMistake = Object.entries(mistakeTagsCount)
        .sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

      setStats({
        totalEntries: entryList.length,
        openEntries: open,
        closedEntries: closed,
        wins,
        losses,
        breakeven,
        skipped,
        averageRMultiple: rCount > 0 ? (rSum / rCount) : 0,
        mostCommonMistakeTag: mostCommonMistake,
        needsReviewCount: needsReview
      });

      setLoading(false);
    };

    const unsubJournal = onValue(journalRef, (snap) => {
      journalMap = snap.val() || {};
      enrichAndCalculateStats();
    }, (err) => {
      console.error("Error fetching journal entries:", err);
      setError("Failed to load journal");
      setLoading(false);
    });

    const unsubAnalysis = onValue(analysisRef, (snap) => {
      analysisMap = snap.val() || {};
      enrichAndCalculateStats();
    });

    const unsubScans = onValue(scansRef, (snap) => {
      scansMap = snap.val() || {};
      enrichAndCalculateStats();
    });

    return () => {
      unsubJournal();
      unsubAnalysis();
      unsubScans();
    };

  }, [user]);

  const updateJournalEntry = async (journalId: string, updates: Partial<JournalEntry>) => {
    if (!user) return { success: false };
    try {
      const entryRef = ref(db, `tradingJournal/${user.uid}/${journalId}`);
      await update(entryRef, {
        ...updates,
        updatedAt: Date.now()
      });
      return { success: true };
    } catch (err: any) {
      console.error("Failed to update journal:", err);
      return { success: false, error: err.message };
    }
  };

  const markOutcome = async (journalId: string, result: string, rMultiple?: number, entryPrice?: number, exitPrice?: number) => {
    return updateJournalEntry(journalId, { result: result as any, rMultiple, entryPrice, exitPrice });
  };

  const updateMistakeTags = async (journalId: string, mistakeTags: string[]) => {
    return updateJournalEntry(journalId, { mistakeTags });
  };

  const uploadFollowUpScreenshot = async (journalId: string, file: File) => {
    if (!user) return { success: false };
    try {
      const storage = getStorage();
      const ext = file.name.split('.').pop() || 'png';
      const path = `journalAttachments/${user.uid}/${journalId}/followup_${Date.now()}.${ext}`;
      const sRef = storageRef(storage, path);
      
      const snapshot = await uploadBytes(sRef, file);
      const url = await getDownloadURL(snapshot.ref);

      await updateJournalEntry(journalId, {
        followUpImagePath: path,
        followUpImageUrl: url
      });

      return { success: true, url };
    } catch (err: any) {
      console.error("Failed to upload screenshot:", err);
      return { success: false, error: err.message };
    }
  };

  const deleteJournalEntry = async (journalId: string) => {
    if (!user) return { success: false };
    try {
      const entryRef = ref(db, `tradingJournal/${user.uid}/${journalId}`);
      await remove(entryRef);
      return { success: true };
    } catch (err: any) {
      console.error("Failed to delete journal:", err);
      return { success: false, error: err.message };
    }
  };

  return {
    loading,
    error,
    entries,
    enrichedEntries,
    stats,
    updateJournalEntry,
    markOutcome,
    updateMistakeTags,
    uploadFollowUpScreenshot,
    deleteJournalEntry
  };
}
