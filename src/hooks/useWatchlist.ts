import { useState, useEffect } from 'react';
import { ref, onValue, set, remove, get } from 'firebase/database';
import { db } from '../lib/rtdb';
import { useAuth } from './useAuth';
import { WatchlistItem, EnrichedWatchlistItem, WatchlistStats } from '../types/watchlist';
import { AnalysisReportRecord } from '../types/report';
import { ChartScan } from '../types/dashboard';

export function useWatchlist() {
  const { user } = useAuth();
  const [watchlistItems, setWatchlistItems] = useState<WatchlistItem[]>([]);
  const [enrichedItems, setEnrichedItems] = useState<EnrichedWatchlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<WatchlistStats>({
    totalItems: 0,
    marketsTracked: 0,
    reportsLinked: 0,
    itemsWithoutLevels: 0,
    mostTrackedMarket: 'N/A',
    recentlyUpdatedCount: 0,
  });

  useEffect(() => {
    if (!user) {
      setWatchlistItems([]);
      setEnrichedItems([]);
      setLoading(false);
      return;
    }

    const itemsRef = ref(db, `watchlists/${user.uid}`);
    const reportsRef = ref(db, `analysisReports/${user.uid}`);
    const scansRef = ref(db, `chartScans/${user.uid}`);

    let rawItems: WatchlistItem[] = [];
    let rawReports: Record<string, AnalysisReportRecord> = {};
    let rawScans: Record<string, ChartScan> = {};

    let itemsLoaded = false;
    let reportsLoaded = false;
    let scansLoaded = false;

    const computeData = () => {
      if (!itemsLoaded || !reportsLoaded || !scansLoaded) return;

      const enriched: EnrichedWatchlistItem[] = rawItems.map(item => {
        const itemReports = (item.linkedReports || []).map(rid => {
          const rep = rawReports[rid];
          let scanObj: ChartScan | null = null;
          if (rep && rep.scanId) {
             scanObj = rawScans[rep.scanId] || null;
          }
          return {
            reportId: rid,
            report: rep,
            scan: scanObj
          };
        }).filter(r => !!r.report);

        // Sort itemReports by newest first
        itemReports.sort((a, b) => b.report.createdAt - a.report.createdAt);

        return {
          item,
          linkedReports: itemReports,
          latestReport: itemReports.length > 0 ? itemReports[0].report : null,
          latestScan: itemReports.length > 0 ? itemReports[0].scan : null,
        };
      });

      setWatchlistItems(rawItems);
      setEnrichedItems(enriched);

      // Compute stats
      const totalItems = rawItems.length;
      const marketCounts: Record<string, number> = {};
      let reportsLinked = 0;
      let itemsWithoutLevels = 0;
      let recentlyUpdatedCount = 0;
      
      const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
      const now = Date.now();

      rawItems.forEach(i => {
        const m = i.market || 'unknown';
        marketCounts[m] = (marketCounts[m] || 0) + 1;
        reportsLinked += (i.linkedReports?.length || 0);

        if (!i.importantSupport && !i.importantResistance) {
          itemsWithoutLevels++;
        }

        if (now - i.updatedAt <= SEVEN_DAYS) {
          recentlyUpdatedCount++;
        }
      });

      let mostTrackedMarket = 'N/A';
      let maxMarketCount = 0;
      for (const [m, count] of Object.entries(marketCounts)) {
        if (count > maxMarketCount) {
          maxMarketCount = count;
          mostTrackedMarket = m;
        }
      }

      setStats({
        totalItems,
        marketsTracked: Object.keys(marketCounts).length,
        reportsLinked,
        itemsWithoutLevels,
        mostTrackedMarket,
        recentlyUpdatedCount
      });

      setLoading(false);
    };

    const unsubItems = onValue(itemsRef, (snap) => {
      const val = snap.val();
      if (val) {
        rawItems = Object.values(val);
      } else {
        rawItems = [];
      }
      itemsLoaded = true;
      computeData();
    }, (err) => {
      setError(err.message);
      itemsLoaded = true;
      computeData();
    });

    const unsubReports = onValue(reportsRef, (snap) => {
      const val = snap.val();
      rawReports = val || {};
      reportsLoaded = true;
      computeData();
    });

    const unsubScans = onValue(scansRef, (snap) => {
      const val = snap.val();
      rawScans = val || {};
      scansLoaded = true;
      computeData();
    });

    return () => {
      unsubItems();
      unsubReports();
      unsubScans();
    };
  }, [user]);

  const createWatchlistItem = async (item: Pick<WatchlistItem, 'symbol' | 'market' | 'timeframe' | 'importantSupport' | 'importantResistance' | 'notes'>) => {
    if (!user) throw new Error("Must be logged in");
    const newId = `wt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    
    // Ensure symmetric symbol save as uppercase primarily
    let savedSymbol = item.symbol.toUpperCase();
    if (savedSymbol && savedSymbol.match(/[a-zA-Z]/)) {
       // if there's any letters, keep it uppercase
    } else {
       // else, it's fine (like a pure number ticker?) 
       savedSymbol = item.symbol;
    }

    const newItem: WatchlistItem = {
      watchlistId: newId,
      symbol: savedSymbol,
      market: item.market,
      timeframe: item.timeframe,
      importantSupport: item.importantSupport,
      importantResistance: item.importantResistance,
      notes: item.notes,
      linkedReports: [],
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    await set(ref(db, `watchlists/${user.uid}/${newId}`), newItem);
    return newId;
  };

  const updateWatchlistItem = async (watchlistId: string, updates: Partial<WatchlistItem>) => {
    if (!user) throw new Error("Must be logged in");
    
    const existingRef = ref(db, `watchlists/${user.uid}/${watchlistId}`);
    const snap = await get(existingRef);
    if (!snap.exists()) throw new Error("Item not found");

    const changes = {
      ...updates,
      updatedAt: Date.now()
    };
    
    if (changes.symbol) {
      if (changes.symbol.match(/[a-zA-Z]/)) {
         changes.symbol = changes.symbol.toUpperCase();
      }
    }

    await set(existingRef, { ...snap.val(), ...changes });
  };

  const deleteWatchlistItem = async (watchlistId: string) => {
    if (!user) throw new Error("Must be logged in");
    await remove(ref(db, `watchlists/${user.uid}/${watchlistId}`));
  };

  const linkReportToWatchlistItem = async (watchlistId: string, reportId: string) => {
    if (!user) throw new Error("Must be logged in");
    const itemRef = ref(db, `watchlists/${user.uid}/${watchlistId}`);
    const snap = await get(itemRef);
    if (!snap.exists()) throw new Error("Item not found");

    const item = snap.val() as WatchlistItem;
    const linked = item.linkedReports || [];
    if (!linked.includes(reportId)) {
      linked.push(reportId);
      await set(itemRef, {
        ...item,
        linkedReports: linked,
        updatedAt: Date.now()
      });
    }
  };

  const unlinkReportFromWatchlistItem = async (watchlistId: string, reportId: string) => {
    if (!user) throw new Error("Must be logged in");
    const itemRef = ref(db, `watchlists/${user.uid}/${watchlistId}`);
    const snap = await get(itemRef);
    if (!snap.exists()) throw new Error("Item not found");

    const item = snap.val() as WatchlistItem;
    const linked = item.linkedReports || [];
    const newLinked = linked.filter(id => id !== reportId);
    
    await set(itemRef, {
      ...item,
      linkedReports: newLinked,
      updatedAt: Date.now()
    });
  };

  return {
    loading,
    error,
    watchlistItems,
    enrichedItems,
    stats,
    createWatchlistItem,
    updateWatchlistItem,
    deleteWatchlistItem,
    linkReportToWatchlistItem,
    unlinkReportFromWatchlistItem
  };
}
