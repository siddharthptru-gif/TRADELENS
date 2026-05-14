import React, { useState, useMemo } from 'react';
import { useJournal } from '../hooks/useJournal';
import { JournalFilters, JournalSortOption, EnrichedJournalEntry } from '../types/journal';
import { JournalFilterBar } from '../components/journal/JournalFilterBar';
import { JournalEntryCard } from '../components/journal/JournalEntryCard';
import { JournalEntryModal } from '../components/journal/JournalEntryModal';
import { JournalEmptyState, FilterEmptyState } from '../components/journal/JournalEmptyState';
import { JournalSkeleton } from '../components/journal/JournalSkeleton';
import { PageTransition } from '../components/ui/PageTransition';
import { PageHeader } from '../components/layout/PageHeader';
import { AppErrorState } from '../components/ui/AppErrorState';
import { ConfirmModal } from '../components/ui/ConfirmModal';
import { BookOpen } from 'lucide-react';
import { useToast } from '../components/ui/GlobalToast';

export default function Journal() {
  const {
    loading,
    error,
    enrichedEntries,
    stats,
    updateJournalEntry,
    uploadFollowUpScreenshot,
    deleteJournalEntry
  } = useJournal();

  const { toast } = useToast();

  const [filters, setFilters] = useState<JournalFilters>({
    search: '',
    result: 'all',
    market: 'all',
    timeframe: 'all',
    aiStance: 'all',
    emotionalState: 'all',
    reviewStatus: 'all'
  });
  
  const [sort, setSort] = useState<JournalSortOption>('newest');

  const [editingEntry, setEditingEntry] = useState<EnrichedJournalEntry | null>(null);
  const [deletingEntry, setDeletingEntry] = useState<string | null>(null);

  const filteredAndSorted = useMemo(() => {
    let result = [...enrichedEntries];

    // Filter
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(r => {
        const j = r.journal;
        const sym = (j.symbol || '').toLowerCase();
        const mnotes = (j.mistakeNotes || '').toLowerCase();
        const fnotes = (j.followUpNotes || '').toLowerCase();
        const lessons = (j.lessonsLearned || '').toLowerCase();
        
        return sym.includes(q) || mnotes.includes(q) || fnotes.includes(q) || lessons.includes(q);
      });
    }

    if (filters.result !== 'all') {
      if (filters.result === 'open') {
        result = result.filter(r => !r.journal.result || r.journal.result === 'open');
      } else {
        result = result.filter(r => r.journal.result === filters.result);
      }
    }
    
    if (filters.market !== 'all') {
      result = result.filter(r => r.journal.market === filters.market);
    }
    if (filters.aiStance !== 'all') {
      result = result.filter(r => r.journal.aiStance === filters.aiStance);
    }
    if (filters.emotionalState !== 'all') {
      result = result.filter(r => r.journal.emotionalState === filters.emotionalState);
    }

    // Sort
    result.sort((a, b) => {
      switch (sort) {
        case 'newest':
          return b.journal.createdAt - a.journal.createdAt;
        case 'oldest':
          return a.journal.createdAt - b.journal.createdAt;
        case 'symbol-asc':
          return (a.journal.symbol || '').localeCompare(b.journal.symbol || '');
        case 'best-r':
          return (b.journal.rMultiple || -999) - (a.journal.rMultiple || -999);
        case 'worst-r':
          return (a.journal.rMultiple || 999) - (b.journal.rMultiple || 999);
        case 'open-first':
          const aOpen = (!a.journal.result || a.journal.result === 'open') ? -1 : 1;
          const bOpen = (!b.journal.result || b.journal.result === 'open') ? -1 : 1;
          return aOpen - bOpen;
        default:
          return 0;
      }
    });

    return result;
  }, [enrichedEntries, filters, sort]);

  if (error) {
    return <AppErrorState title="Failed to Load" message={error} />;
  }

  return (
    <PageTransition>
      <PageHeader 
        title="Trading Journal" 
        subtitle="Track your decisions, outcomes, emotions, and lessons from every AI analysis."
        disclaimer={true}
        badge={
          <span className="bg-[#8CFF3F] text-black w-10 h-10 flex items-center justify-center rounded-xl">
            <BookOpen className="w-5 h-5 fill-current" />
          </span>
        }
      />

      {loading ? (
        <JournalSkeleton />
      ) : enrichedEntries.length === 0 ? (
        <JournalEmptyState />
      ) : (
        <>
          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
            <StatBox label="Total" value={stats.totalEntries} />
            <StatBox label="Open" value={stats.openEntries} className="text-blue-400" />
            <StatBox label="Wins" value={stats.wins} className="text-[#8CFF3F]" />
            <StatBox label="Losses" value={stats.losses} className="text-[#FF5C7A]" />
            <StatBox label="Avg R" value={stats.averageRMultiple.toFixed(2)} className={stats.averageRMultiple >= 0 ? "text-[#8CFF3F]" : "text-[#FF5C7A]"} />
            <StatBox label="Skipped" value={stats.skipped} className="text-yellow-400" />
            <StatBox label="Needs Review" value={stats.needsReviewCount} className={stats.needsReviewCount > 0 ? "text-[#FF5C7A]" : ""} />
          </div>

          <JournalFilterBar filters={filters} setFilters={setFilters} sort={sort} setSort={setSort} />

          {filteredAndSorted.length === 0 ? (
            <FilterEmptyState onClear={() => setFilters({ search: '', result: 'all', market: 'all', timeframe: 'all', aiStance: 'all', emotionalState: 'all', reviewStatus: 'all' })} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAndSorted.map(entry => (
                <JournalEntryCard 
                  key={entry.journal.journalId} 
                  data={entry} 
                  onEdit={() => setEditingEntry(entry)}
                  onRemove={() => setDeletingEntry(entry.journal.journalId)}
                />
              ))}
            </div>
          )}
        </>
      )}

      {editingEntry && (
        <JournalEntryModal 
          data={editingEntry}
          onSave={async (updates) => {
            await updateJournalEntry(editingEntry.journal.journalId, updates);
            toast({ type: 'success', title: 'Journal entry updated' });
          }}
          onUploadFollowUp={async (file) => {
            return await uploadFollowUpScreenshot(editingEntry.journal.journalId, file);
          }}
          onClose={() => setEditingEntry(null)}
        />
      )}

      <ConfirmModal
        isOpen={!!deletingEntry}
        title="Delete Journal Entry"
        message="Are you sure you want to delete this journal entry? This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={async () => {
          if (deletingEntry) {
            await deleteJournalEntry(deletingEntry);
            setDeletingEntry(null);
            toast({ type: 'success', title: 'Journal entry deleted' });
          }
        }}
        onCancel={() => setDeletingEntry(null)}
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
