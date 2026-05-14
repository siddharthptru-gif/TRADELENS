import React from 'react';
import { BookmarkPlus, Activity, SearchX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GlassCard } from '../ui/GlassCard';
import { GradientButton } from '../ui/GradientButton';

interface WatchlistEmptyStateProps {
  onAdd: () => void;
}

export function WatchlistEmptyState({ onAdd }: WatchlistEmptyStateProps) {
  const navigate = useNavigate();

  return (
    <GlassCard className="p-12 text-center rounded-3xl border border-white/10 flex flex-col items-center max-w-2xl mx-auto mt-12 bg-black/40">
      <div className="w-20 h-20 bg-[#8CFF3F]/10 rounded-full flex items-center justify-center mb-6 border border-[#8CFF3F]/20">
        <BookmarkPlus className="w-10 h-10 text-[#8CFF3F]" />
      </div>
      
      <h2 className="text-2xl font-serif text-white mb-4">No watchlist items yet</h2>
      <p className="text-white/60 mb-8 max-w-md">
        Add symbols you want to review, track important levels, and link AI reports for context.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <GradientButton onClick={onAdd} className="px-8 flex items-center gap-2">
          <BookmarkPlus className="w-4 h-4" />
          Add Symbol
        </GradientButton>

        <button 
          onClick={() => navigate('/upload')}
          className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl transition-colors font-medium flex items-center gap-2"
        >
          <Activity className="w-4 h-4" />
          Analyze a Chart
        </button>
      </div>
    </GlassCard>
  );
}

interface FilterEmptyStateProps {
  onClear: () => void;
}

export function FilterEmptyState({ onClear }: FilterEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10">
        <SearchX className="w-8 h-8 text-white/40" />
      </div>
      <h3 className="text-lg font-medium text-white mb-2">No watchlist items match your filters</h3>
      <p className="text-white/40 mb-6 max-w-sm">
        Try adjusting your filters or search terms to find what you're looking for.
      </p>
      <button 
        onClick={onClear}
        className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-medium transition-colors"
      >
        Clear Filters
      </button>
    </div>
  );
}
