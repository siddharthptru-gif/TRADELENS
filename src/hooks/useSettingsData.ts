import { useState, useEffect } from 'react';
import { ref, onValue, set, get, remove } from 'firebase/database';
import { db } from '../lib/rtdb';
import { useAuth } from './useAuth';
import { 
  SettingsUserRecord, 
  SettingsUserProfile, 
  SettingsUsageLimits, 
  SettingsSubscription,
  SettingsDataCounts 
} from '../types/settings';
import { deleteUser, getAuth } from 'firebase/auth';

export function useSettingsData() {
  const { user } = useAuth();
  const auth = getAuth();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [userRecord, setUserRecord] = useState<SettingsUserRecord | null>(null);
  const [profile, setProfile] = useState<SettingsUserProfile | null>(null);
  const [subscription, setSubscription] = useState<SettingsSubscription | null>(null);
  const [usageLimits, setUsageLimits] = useState<SettingsUsageLimits | null>(null);
  const [dataCounts, setDataCounts] = useState<SettingsDataCounts>({
    scansCount: 0,
    reportsCount: 0,
    savedReportsCount: 0,
    journalEntriesCount: 0,
    watchlistItemsCount: 0
  });

  useEffect(() => {
    if (!user) {
      setUserRecord(null);
      setProfile(null);
      setSubscription(null);
      setUsageLimits(null);
      setDataCounts({
        scansCount: 0,
        reportsCount: 0,
        savedReportsCount: 0,
        journalEntriesCount: 0,
        watchlistItemsCount: 0
      });
      setLoading(false);
      return;
    }

    const refs = {
      user: ref(db, `users/${user.uid}`),
      profile: ref(db, `userProfiles/${user.uid}`),
      subscription: ref(db, `subscriptions/${user.uid}`),
      usageLimits: ref(db, `usageLimits/${user.uid}`),
      chartScans: ref(db, `chartScans/${user.uid}`),
      analysisReports: ref(db, `analysisReports/${user.uid}`),
      savedReports: ref(db, `savedReports/${user.uid}`),
      tradingJournal: ref(db, `tradingJournal/${user.uid}`),
      watchlists: ref(db, `watchlists/${user.uid}`)
    };

    const unsubs: (() => void)[] = [];

    const listenWithFallback = (r: any, setter: (val: any) => void, fallback: any) => {
      return onValue(r, (snap) => {
        setter(snap.val() || fallback);
      }, (err) => {
        console.warn(`Error reading ${r.key}, using fallback:`, err);
        setter(fallback);
      });
    };

    const userFallback = {
      uid: user.uid,
      email: user.email || "",
      displayName: user.displayName || "Trader",
      photoURL: user.photoURL || "",
      createdAt: Date.now(),
      lastLoginAt: Date.now(),
      disclaimerAcceptedAt: Date.now()
    };

    const profileFallback = {
      experienceLevel: "beginner",
      preferredMarkets: ["crypto"],
      tradingStyle: "swing",
      riskProfile: "medium",
      defaultTimeframe: "1D",
      defaultMarketType: "crypto",
      onboardingCompleted: true,
      preferences: {
        theme: "dark",
        language: "en",
        showPositionSizing: true,
        showSmcConcepts: true
      },
      updatedAt: Date.now()
    };

    const usageLimitsFallback = {
      dailyLimit: 999999,
      monthlyLimit: 999999,
      dailyUsed: 0,
      monthlyUsed: 0,
      dailyResetAt: Date.now() + 86400000,
      monthlyResetAt: Date.now() + 2592000000,
      lastScanAt: 0
    };

    // Pre-fill state so we don't flash error state while waiting for DB
    setUserRecord(userFallback);
    setProfile(profileFallback);
    setSubscription({ planId: 'free', status: 'active', currentPeriodEnd: 0 });
    setUsageLimits(usageLimitsFallback);

    const countListen = (r: any, key: keyof SettingsDataCounts) => {
      return onValue(r, (snap) => {
        const val = snap.val();
        const count = val ? Object.keys(val).length : 0;
        setDataCounts(prev => ({ ...prev, [key]: count }));
      }, (err) => {
        console.warn(`Error reading counts for ${r.key}:`, err);
        setDataCounts(prev => ({ ...prev, [key]: 0 }));
      });
    };

    unsubs.push(listenWithFallback(refs.user, setUserRecord, userFallback));
    unsubs.push(listenWithFallback(refs.profile, setProfile, profileFallback));
    unsubs.push(listenWithFallback(refs.subscription, setSubscription, { planId: 'free', status: 'active', currentPeriodEnd: 0 }));
    unsubs.push(listenWithFallback(refs.usageLimits, setUsageLimits, usageLimitsFallback));

    unsubs.push(countListen(refs.chartScans, 'scansCount'));
    unsubs.push(countListen(refs.analysisReports, 'reportsCount'));
    unsubs.push(countListen(refs.savedReports, 'savedReportsCount'));
    unsubs.push(countListen(refs.tradingJournal, 'journalEntriesCount'));
    unsubs.push(countListen(refs.watchlists, 'watchlistItemsCount'));

    // Consider loading done once we at least request them
    setLoading(false);

    return () => {
      unsubs.forEach(u => u());
    };
  }, [user]);

  const updateProfileSettings = async (displayName: string) => {
    if (!user || !userRecord) throw new Error("Not logged in");
    await set(ref(db, `users/${user.uid}`), {
      ...userRecord,
      displayName,
      lastProfileUpdateAt: Date.now()
    });
  };

  const updateTradingPreferences = async (experienceLevel: string, preferredMarkets: string[], tradingStyle: string, riskProfile: string) => {
    if (!user || !profile) throw new Error("Not logged in");
    await set(ref(db, `userProfiles/${user.uid}`), {
      ...profile,
      experienceLevel,
      preferredMarkets,
      tradingStyle,
      riskProfile,
      updatedAt: Date.now()
    });
  };

  const updateAnalysisDefaults = async (defaultMarketType: string, defaultTimeframe: string, preferences: any) => {
    if (!user || !profile) throw new Error("Not logged in");
    await set(ref(db, `userProfiles/${user.uid}`), {
      ...profile,
      defaultMarketType,
      defaultTimeframe,
      preferences: {
        ...profile.preferences,
        ...preferences
      },
      updatedAt: Date.now()
    });
  };

  const acceptDisclaimer = async () => {
    if (!user || !userRecord) throw new Error("Not logged in");
    await set(ref(db, `users/${user.uid}`), {
      ...userRecord,
      disclaimerAcceptedAt: Date.now()
    });
  };

  const exportUserData = async () => {
    if (!user) throw new Error("Not logged in");
    
    const [
      scansSnap,
      reportsSnap,
      savedSnap,
      journalSnap,
      watchlistSnap
    ] = await Promise.all([
      get(ref(db, `chartScans/${user.uid}`)),
      get(ref(db, `analysisReports/${user.uid}`)),
      get(ref(db, `savedReports/${user.uid}`)),
      get(ref(db, `tradingJournal/${user.uid}`)),
      get(ref(db, `watchlists/${user.uid}`))
    ]);

    const data = {
      userRecord,
      profile,
      subscription,
      usageLimits,
      chartScans: scansSnap.val() || {},
      analysisReports: reportsSnap.val() || {},
      savedReports: savedSnap.val() || {},
      tradingJournal: journalSnap.val() || {},
      watchlists: watchlistSnap.val() || {}
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tradelens-data-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const wipeUserData = async () => {
    if (!user || !usageLimits) throw new Error("Not logged in");
    
    await Promise.all([
      remove(ref(db, `chartScans/${user.uid}`)),
      remove(ref(db, `analysisReports/${user.uid}`)),
      remove(ref(db, `savedReports/${user.uid}`)),
      remove(ref(db, `tradingJournal/${user.uid}`)),
      remove(ref(db, `watchlists/${user.uid}`)),
      remove(ref(db, `feedback/${user.uid}`)),
      remove(ref(db, `aiAuditLogs/${user.uid}`))
    ]);

    // Reset usage limits
    await set(ref(db, `usageLimits/${user.uid}`), {
      ...usageLimits,
      dailyUsed: 0,
      monthlyUsed: 0
    });
  };

  const deleteAccountRequest = async () => {
    if (!user || !auth.currentUser) throw new Error("Not logged in");
    
    // Remote all app data first
    await wipeUserData();

    // Also remove the account records
    await Promise.all([
      remove(ref(db, `users/${user.uid}`)),
      remove(ref(db, `userProfiles/${user.uid}`)),
      remove(ref(db, `subscriptions/${user.uid}`)),
      remove(ref(db, `usageLimits/${user.uid}`))
    ]);

    // Finally delete Firebase Auth user
    await deleteUser(auth.currentUser);
  };

  return {
    loading,
    error,
    userRecord,
    profile,
    subscription,
    usageLimits,
    dataCounts,
    updateProfileSettings,
    updateTradingPreferences,
    updateAnalysisDefaults,
    acceptDisclaimer,
    exportUserData,
    wipeUserData,
    deleteAccountRequest
  };
}
