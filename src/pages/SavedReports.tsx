import React, { useState, useMemo } from 'react';
import { useSavedReports } from '../hooks/useSavedReports';
import { ReportFilters, ReportSortOption, EnrichedSavedReport } from '../types/savedReport';
import { ReportsFilterBar } from '../components/reports/ReportsFilterBar';
import { SavedReportCard } from '../components/reports/SavedReportCard';
import { ReportTagEditor } from '../components/reports/ReportTagEditor';
import { ReportNoteModal } from '../components/reports/ReportNoteModal';
import { ReportsEmptyState, FilterEmptyState } from '../components/reports/ReportsEmptyState';
import { ReportsSkeleton } from '../components/reports/ReportsSkeleton';
import { PageTransition } from '../components/ui/PageTransition';
import { PageHeader } from '../components/layout/PageHeader';
import { AppErrorState } from '../components/ui/AppErrorState';
import { ConfirmModal } from '../components/ui/ConfirmModal';
import { Bookmark } from 'lucide-react';
import { useToast } from '../components/ui/GlobalToast';

export default function SavedReports() {
  const { 
    loading, 
    error, 
    enrichedReports, 
    updateSavedReportTags, 
    updateSavedReportNote, 
    removeSavedReport 
  } = useSavedReports();

  const { toast } = useToast();

  const [filters, setFilters] = useState<ReportFilters>({
    search: '',
    market: 'all',
    timeframe: 'all',
    stance: 'all',
    risk: 'all',
    scoreRange: 'all',
  });
  
  const [sort, setSort] = useState<ReportSortOption>('newest');

  // Modal states
  const [editingTagsFor, setEditingTagsFor] = useState<EnrichedSavedReport | null>(null);
  const [editingNoteFor, setEditingNoteFor] = useState<EnrichedSavedReport | null>(null);
  const [deletingReport, setDeletingReport] = useState<string | null>(null);

  const filteredAndSorted = useMemo(() => {
    let result = [...enrichedReports];

    // Filter
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(r => {
        const sym = (r.scanData?.symbol || '').toLowerCase();
        const sum = (r.reportData?.quickSummary || '').toLowerCase();
        const note = (r.savedData?.userNote || '').toLowerCase();
        const tagsRaw = r.savedData?.tags || [];
        const tagsStr = tagsRaw.join(' ').toLowerCase();
        
        return sym.includes(q) || sum.includes(q) || note.includes(q) || tagsStr.includes(q);
      });
    }

    if (filters.market !== 'all') {
      result = result.filter(r => r.scanData?.marketType === filters.market);
    }
    if (filters.timeframe !== 'all') {
      result = result.filter(r => r.scanData?.timeframe === filters.timeframe);
    }
    if (filters.stance !== 'all') {
      result = result.filter(r => r.reportData?.finalStance === filters.stance);
    }
    if (filters.risk !== 'all') {
      result = result.filter(r => r.reportData?.riskLevel === filters.risk);
    }
    if (filters.scoreRange !== 'all') {
      const [min, max] = filters.scoreRange.split('-').map(Number);
      result = result.filter(r => {
        const s = r.reportData?.tradeQualityScore || 0;
        return s >= min && s <= max;
      });
    }

    // Sort
    result.sort((a, b) => {
      switch (sort) {
        case 'newest':
          return b.savedData.savedAt - a.savedData.savedAt;
        case 'oldest':
          return a.savedData.savedAt - b.savedData.savedAt;
        case 'highest-score':
          return (b.reportData?.tradeQualityScore || 0) - (a.reportData?.tradeQualityScore || 0);
        case 'lowest-score':
          return (a.reportData?.tradeQualityScore || 0) - (b.reportData?.tradeQualityScore || 0);
        case 'highest-confidence':
          return (b.reportData?.analysisConfidence || 0) - (a.reportData?.analysisConfidence || 0);
        case 'symbol-asc':
          return (a.scanData?.symbol || '').localeCompare(b.scanData?.symbol || '');
        default:
          return 0;
      }
    });

    return result;
  }, [enrichedReports, filters, sort]);

  const handleStats = () => {
    let sumScore = 0;
    let countsByStance: Record<string, number> = {};
    let countsByMarket: Record<string, number> = {};
    
    let validScores = 0;

    enrichedReports.forEach(r => {
      if (r.reportData?.tradeQualityScore) {
        sumScore += r.reportData.tradeQualityScore;
        validScores++;
      }
      if (r.reportData?.finalStance) {
        countsByStance[r.reportData.finalStance] = (countsByStance[r.reportData.finalStance] || 0) + 1;
      }
      if (r.scanData?.marketType) {
        countsByMarket[r.scanData.marketType] = (countsByMarket[r.scanData.marketType] || 0) + 1;
      }
    });

    const avgScore = validScores > 0 ? Math.round(sumScore / validScores) : 0;
    
    const maxStance = Object.entries(countsByStance).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
    const maxMarket = Object.entries(countsByMarket).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

    const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const weeklyCount = enrichedReports.filter(r => r.savedData.savedAt >= oneWeekAgo).length;

    return { avgScore, maxStance, maxMarket, weeklyCount };
  };

  const stats = handleStats();

  if (error) {
    return <AppErrorState title="Failed to Load" message={error} />;
  }

  return (
    <PageTransition>
      <PageHeader 
        title="Saved Reports" 
        subtitle="Review your saved AI chart analyses, compare setups, and revisit your trading decisions."
        disclaimer={true}
        badge={
          <span className="bg-[#8CFF3F] text-black w-10 h-10 flex items-center justify-center rounded-xl">
            <Bookmark className="w-5 h-5 fill-current" />
          </span>
        }
      />

      {loading ? (
        <ReportsSkeleton />
      ) : enrichedReports.length === 0 ? (
        <ReportsEmptyState />
      ) : (
        <>
          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <StatBox label="Total Saved" value={enrichedReports.length} />
            <StatBox label="Avg Score" value={stats.avgScore} />
            <StatBox label="Top Stance" value={stats.maxStance} />
            <StatBox label="Top Market" value={stats.maxMarket} className="capitalize" />
            <StatBox label="Saved this week" value={stats.weeklyCount} />
          </div>

          <ReportsFilterBar filters={filters} setFilters={setFilters} sort={sort} setSort={setSort} />

          {filteredAndSorted.length === 0 ? (
            <FilterEmptyState onClear={() => setFilters({ search: '', market: 'all', timeframe: 'all', stance: 'all', risk: 'all', scoreRange: 'all' })} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredAndSorted.map(report => (
                <SavedReportCard 
                  key={report.savedData.reportId} 
                  data={report} 
                  onEditTags={() => setEditingTagsFor(report)}
                  onEditNote={() => setEditingNoteFor(report)}
                  onRemove={() => setDeletingReport(report.savedData.reportId)}
                />
              ))}
            </div>
          )}
        </>
      )}

      {editingTagsFor && (
        <ReportTagEditor 
          initialTags={editingTagsFor.savedData.tags || []} 
          onSave={async (tags) => {
            await updateSavedReportTags(editingTagsFor.savedData.reportId, tags);
            setEditingTagsFor(null);
            toast({ type: 'success', title: 'Tags updated' });
          }}
          onCancel={() => setEditingTagsFor(null)}
        />
      )}

      {editingNoteFor && (
        <ReportNoteModal 
          initialNote={editingNoteFor.savedData.userNote || ''}
          onSave={async (note) => {
            await updateSavedReportNote(editingNoteFor.savedData.reportId, note);
            setEditingNoteFor(null);
            toast({ type: 'success', title: 'Notes updated' });
          }}
          onCancel={() => setEditingNoteFor(null)}
        />
      )}

      <ConfirmModal
        isOpen={!!deletingReport}
        title="Remove Saved Report"
        message="Are you sure you want to remove this report from your saved items? This action cannot be undone."
        confirmLabel="Remove"
        onConfirm={async () => {
          if (deletingReport) {
            await removeSavedReport(deletingReport);
            setDeletingReport(null);
            toast({ type: 'success', title: 'Report removed' });
          }
        }}
        onCancel={() => setDeletingReport(null)}
        isDestructive={true}
      />
    </PageTransition>
  );
}

function StatBox({ label, value, className }: { label: string; value: string | number; className?: string }) {
  return (
    <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col items-center justify-center text-center">
      <span className="text-[10px] text-white/40 uppercase tracking-widest mb-1">{label}</span>
      <span className={`text-lg font-bold text-white/90 ${className || ''}`} title={String(value)}>
        {String(value).length > 20 ? String(value).substring(0, 17) + '...' : value}
      </span>
    </div>
  );
}
