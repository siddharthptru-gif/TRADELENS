import { useEffect, useState } from 'react';
import { ref, onValue, off } from 'firebase/database';
import { db } from '../lib/rtdb';
import { useAuth } from './useAuth';
import {
  UserRecord,
  UserProfile,
  UsageLimits,
  ChartScan,
  AnalysisReportSummary,
  SavedReport,
  JournalEntry,
  WatchlistItem,
  DashboardStats
} from '../types/dashboard';

export function useDashboardData() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [userRecord, setUserRecord] = useState<UserRecord | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [usageLimits, setUsageLimits] = useState<UsageLimits | null>(null);
  const [recentScans, setRecentScans] = useState<ChartScan[]>([]);
  const [reports, setReports] = useState<AnalysisReportSummary[]>([]);
  const [savedReports, setSavedReports] = useState<SavedReport[]>([]);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [watchlistItems, setWatchlistItems] = useState<WatchlistItem[]>([]);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const uid = user.uid;

    const refs = {
      user: ref(db, `users/${uid}`),
      profile: ref(db, `userProfiles/${uid}`),
      usage: ref(db, `usageLimits/${uid}`),
      scans: ref(db, `chartScans/${uid}`),
      reports: ref(db, `analysisReports/${uid}`),
      saved: ref(db, `savedReports/${uid}`),
      journal: ref(db, `tradingJournal/${uid}`),
      watchlist: ref(db, `watchlists/${uid}`)
    };

    const unsubscribes: (() => void)[] = [];

    const attachListener = (databaseRef: any, stateSetter: (val: any) => void, transform?: (val: any) => any) => {
      const listener = onValue(databaseRef, (snapshot) => {
        const val = snapshot.val();
        if (transform) {
          stateSetter(transform(val || {}));
        } else {
          stateSetter(val);
        }
      }, (err) => {
        console.error("Firebase subscription error", err);
        setError("Failed to sync some data.");
      });

      unsubscribes.push(() => off(databaseRef, 'value', listener));
    };

    const toArray = (obj: Record<string, any>) => Object.entries(obj || {}).map(([id, val]) => ({ id, ...val as any }));

    attachListener(refs.user, setUserRecord);
    attachListener(refs.profile, setProfile);
    attachListener(refs.usage, setUsageLimits);
    
    attachListener(refs.scans, setRecentScans, (val) => {
      return toArray(val).sort((a, b) => b.createdAt - a.createdAt);
    });
    
    attachListener(refs.reports, setReports, (val) => {
      return toArray(val).sort((a, b) => b.createdAt - a.createdAt);
    });
    
    attachListener(refs.saved, setSavedReports, (val) => {
      return toArray(val).sort((a, b) => b.savedAt - a.savedAt);
    });
    
    attachListener(refs.journal, setJournalEntries, (val) => {
      return toArray(val).sort((a, b) => b.createdAt - a.createdAt);
    });
    
    attachListener(refs.watchlist, setWatchlistItems, (val) => {
      return toArray(val).sort((a, b) => b.createdAt - a.createdAt);
    });

    // Give it a small timeout to consider "initial load" finished (not strictly waiting for all, 
    // since RTDB caches and returns fast if empty).
    const t = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => {
      clearTimeout(t);
      unsubscribes.forEach(unsub => unsub());
    };
  }, [user]);

  // Derived stats
  const stats: DashboardStats = {
    scansRemaining: Math.max(0, (usageLimits?.dailyLimit || 3) - (usageLimits?.dailyUsed || 0)),
    dailyUsed: usageLimits?.dailyUsed || 0,
    dailyLimit: usageLimits?.dailyLimit || 3,
    monthlyUsed: usageLimits?.monthlyUsed || 0,
    monthlyLimit: usageLimits?.monthlyLimit || 90,
    savedReportsCount: savedReports.length,
    journalCount: journalEntries.length,
    watchlistCount: watchlistItems.length,
    averageTradeQualityScore: reports.length ? 
      Math.round(reports.reduce((acc, r) => acc + (r.tradeQualityScore || 0), 0) / reports.length) : 0,
    recentScores: reports.slice(0, 10).map(r => r.tradeQualityScore || 0).reverse(),
    totalScans: recentScans.length,
    completedScans: recentScans.filter(s => s.status === 'completed').length,
    failedScans: recentScans.filter(s => s.status === 'failed').length,
    pendingScans: recentScans.filter(s => s.status === 'queued' || s.status === 'analyzing').length
  };

  return {
    loading,
    error,
    userRecord,
    profile,
    usageLimits,
    recentScans,
    reports,
    savedReports,
    journalEntries,
    watchlistItems,
    stats
  };
}
