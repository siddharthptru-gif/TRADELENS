import React from 'react';
import { Bookmark, FilePlus, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GlassCard } from '../ui/GlassCard';

export function ReportsEmptyState() {
  const navigate = useNavigate();
  
  return (
    <GlassCard className="max-w-2xl mx-auto p-12 text-center flex flex-col items-center">
      <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6">
        <Bookmark className="w-8 h-8 text-white/30" />
      </div>
      
      <h2 className="text-2xl font-serif mb-4 text-[#8CFF3F]">No saved reports yet</h2>
      <p className="text-white/60 mb-8 max-w-sm leading-relaxed">
        When you save an AI analysis report, it will appear here for review and future journal work.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button 
          onClick={() => navigate('/upload')}
          className="flex items-center gap-2 px-6 py-3 bg-[#8CFF3F] text-black rounded-xl font-medium hover:bg-[#7AE636] transition-colors"
        >
          <FilePlus className="w-5 h-5" />
          Analyze a Chart
        </button>
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 px-6 py-3 bg-white/5 text-white hover:bg-white/10 rounded-xl font-medium transition-colors"
        >
          Go to Dashboard
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </GlassCard>
  );
}

export function FilterEmptyState({ onClear }: { onClear: () => void }) {
  return (
    <GlassCard className="max-w-xl mx-auto p-12 text-center flex flex-col items-center">
      <h3 className="text-xl font-serif mb-4 text-white/80">No reports match your filters</h3>
      <button 
        onClick={onClear}
        className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-colors"
      >
        Clear filters
      </button>
    </GlassCard>
  );
}
