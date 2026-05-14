import React, { useState, useMemo } from 'react';
import { useWatchlist } from '../hooks/useWatchlist';
import { WatchlistFilters, WatchlistSortOption, EnrichedWatchlistItem, WatchlistItem } from '../types/watchlist';
import { WatchlistFilterBar } from '../components/watchlist/WatchlistFilterBar';
import { WatchlistCard } from '../components/watchlist/WatchlistCard';
import { WatchlistEditorModal } from '../components/watchlist/WatchlistEditorModal';
import { WatchlistEmptyState, FilterEmptyState } from '../components/watchlist/WatchlistEmptyState';
import { WatchlistSkeleton } from '../components/watchlist/WatchlistSkeleton';
import { LinkedReportsPanel } from '../components/watchlist/LinkedReportsPanel';
import { BookmarkPlus } from 'lucide-react';
import { GradientButton } from '../components/ui/GradientButton';
import { PageTransition } from '../components/ui/PageTransition';
import { PageHeader } from '../components/layout/PageHeader';
import { AppErrorState } from '../components/ui/AppErrorState';
import { ConfirmModal } from '../components/ui/ConfirmModal';
import { useToast } from '../components/ui/GlobalToast';

export default function Watchlist() {
  const {
    loading,
    error,
    enrichedItems,
    stats,
    createWatchlistItem,
    updateWatchlistItem,
    deleteWatchlistItem,
    unlinkReportFromWatchlistItem
  } = useWatchlist();

  const { toast } = useToast();

  const [filters, setFilters] = useState<WatchlistFilters>({
    search: '',
    market: 'all',
    timeframe: 'all',
    linkedReports: 'all',
    levelStatus: 'all'
  });
  
  const [sort, setSort] = useState<WatchlistSortOption>('recently-updated');

  const [isAdding, setIsAdding] = useState(false);
  const [editingItem, setEditingItem] = useState<EnrichedWatchlistItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<string | null>(null);
  const [viewingReportsItem, setViewingReportsItem] = useState<EnrichedWatchlistItem | null>(null);

  const filteredAndSorted = useMemo(() => {
    let result = [...enrichedItems];

    // Filter
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(r => {
        const w = r.item;
        const sym = (w.symbol || '').toLowerCase();
        const m = (w.market || '').toLowerCase();
        const sup = (w.importantSupport || '').toLowerCase();
        const res = (w.importantResistance || '').toLowerCase();
        const notes = (w.notes || '').toLowerCase();
        
        let reportText = '';
        if (r.latestReport) {
           reportText = [
              r.latestReport.quickSummary,
              r.latestReport.finalStance,
              r.latestReport.trendDirection
           ].join(' ').toLowerCase();
        }

        return sym.includes(q) || m.includes(q) || sup.includes(q) || res.includes(q) || notes.includes(q) || reportText.includes(q);
      });
    }

    if (filters.market !== 'all') {
      result = result.filter(r => r.item.market === filters.market);
    }
    if (filters.timeframe !== 'all') {
      result = result.filter(r => r.item.timeframe === filters.timeframe);
    }
    if (filters.linkedReports !== 'all') {
       if (filters.linkedReports === 'has-reports') {
          result = result.filter(r => r.linkedReports.length > 0);
       } else {
          result = result.filter(r => r.linkedReports.length === 0);
       }
    }
    if (filters.levelStatus !== 'all') {
      if (filters.levelStatus === 'has-support') {
         result = result.filter(r => !!r.item.importantSupport);
      } else if (filters.levelStatus === 'has-resistance') {
         result = result.filter(r => !!r.item.importantResistance);
      } else if (filters.levelStatus === 'missing-levels') {
         result = result.filter(r => !r.item.importantSupport && !r.item.importantResistance);
      }
    }

    // Sort
    result.sort((a, b) => {
      switch (sort) {
        case 'recently-updated':
          return b.item.updatedAt - a.item.updatedAt;
        case 'newest':
          return b.item.createdAt - a.item.createdAt;
        case 'oldest':
          return a.item.createdAt - b.item.createdAt;
        case 'symbol-asc':
          return (a.item.symbol || '').localeCompare(b.item.symbol || '');
        case 'most-linked':
          return b.linkedReports.length - a.linkedReports.length;
        case 'highest-score':
          const sa = a.latestReport?.tradeQualityScore || -1;
          const sb = b.latestReport?.tradeQualityScore || -1;
          return sb - sa;
        case 'lowest-score':
          const la = a.latestReport?.tradeQualityScore || 999;
          const lb = b.latestReport?.tradeQualityScore || 999;
          return la - lb;
        default:
          return 0;
      }
    });

    return result;
  }, [enrichedItems, filters, sort]);

  if (error) {
    return <AppErrorState title="Failed to Load" message={error} />;
  }

  return (
    <PageTransition>
      <PageHeader 
        title="Watchlist" 
        subtitle="Track symbols, important support/resistance levels, and link AI reports for quick review context."
        disclaimer={true}
        badge={
          <span className="bg-[#8CFF3F] text-black w-10 h-10 flex items-center justify-center rounded-xl">
            <BookmarkPlus className="w-5 h-5 fill-current" />
          </span>
        }
        actions={
          !loading && enrichedItems.length > 0 && (
            <GradientButton onClick={() => setIsAdding(true)} className="px-6 py-2.5 flex items-center gap-2 font-bold whitespace-nowrap">
              <BookmarkPlus className="w-4 h-4" />
              Add Symbol
            </GradientButton>
          )
        }
      />

      {loading ? (
        <WatchlistSkeleton />
      ) : enrichedItems.length === 0 ? (
        <WatchlistEmptyState onAdd={() => setIsAdding(true)} />
      ) : (
        <>
          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <StatBox label="Total Symbols" value={stats.totalItems} />
            <StatBox label="Markets Tracked" value={stats.marketsTracked} className="text-blue-400" />
            <StatBox label="Reports Linked" value={stats.reportsLinked} className="text-[#8CFF3F]" />
            <StatBox label="Missing Levels" value={stats.itemsWithoutLevels} className="text-yellow-400" />
            <StatBox label="Top Market" value={stats.mostTrackedMarket} className="font-mono uppercase text-sm" />
            <StatBox label="Recently Updated" value={stats.recentlyUpdatedCount} />
          </div>

          <WatchlistFilterBar filters={filters} setFilters={setFilters} sort={sort} setSort={setSort} />

            {filteredAndSorted.length === 0 ? (
              <FilterEmptyState onClear={() => setFilters({ search: '', market: 'all', timeframe: 'all', linkedReports: 'all', levelStatus: 'all' })} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredAndSorted.map(itemData => (
                  <WatchlistCard 
                    key={itemData.item.watchlistId} 
                    data={itemData} 
                    onEdit={() => setEditingItem(itemData)}
                    onRemove={() => setDeletingItem(itemData.item.watchlistId)}
                    onViewReports={() => setViewingReportsItem(itemData)}
                  />
                ))}
              </div>
            )}
        </>
      )}

      {isAdding && (
          <WatchlistEditorModal 
            onSave={async (data) => {
              await createWatchlistItem(data);
              setIsAdding(false);
              toast({ type: 'success', title: 'Watchlist item added' });
            }}
            onClose={() => setIsAdding(false)}
          />
      )}

      {editingItem && (
        <WatchlistEditorModal 
          initialData={editingItem.item}
          onSave={async (updates) => {
            await updateWatchlistItem(editingItem.item.watchlistId, updates);
            setEditingItem(null);
            toast({ type: 'success', title: 'Watchlist item updated' });
          }}
          onClose={() => setEditingItem(null)}
        />
      )}

      {viewingReportsItem && (
          <LinkedReportsPanel 
            data={viewingReportsItem}
            onUnlink={async (reportId) => {
                await unlinkReportFromWatchlistItem(viewingReportsItem.item.watchlistId, reportId);
                
                // We need to mutate viewingReportsItem locally to immediately reflect the change
                const newLinked = viewingReportsItem.linkedReports.filter(lr => lr.reportId !== reportId);
                setViewingReportsItem({
                  ...viewingReportsItem,
                  linkedReports: newLinked
                });
                toast({ type: 'success', title: 'Report unlinked' });
            }}
            onClose={() => setViewingReportsItem(null)}
          />
      )}

      <ConfirmModal
        isOpen={!!deletingItem}
        title="Remove Saved Item"
        message="Are you sure you want to remove this item from your watchlist? This action cannot be undone."
        confirmLabel="Remove"
        onConfirm={async () => {
          if (deletingItem) {
            await deleteWatchlistItem(deletingItem);
            setDeletingItem(null);
            toast({ type: 'success', title: 'Item removed' });
          }
        }}
        onCancel={() => setDeletingItem(null)}
        isDestructive={true}
      />
    </PageTransition>
  );
}

function StatBox({ label, value, className }: { label: string; value: string | number; className?: string }) {
  return (
    <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col items-center justify-center text-center overflow-hidden">
      <span className="text-[10px] text-white/40 uppercase tracking-widest mb-1 truncate w-full">{label}</span>
      <span className={`text-lg font-bold text-white/90 ${className || ''}`} title={String(value)}>
        {String(value).length > 20 ? String(value).substring(0, 17) + '...' : value}
      </span>
    </div>
  );
}