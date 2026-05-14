import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { JournalEntry } from '../../types/dashboard';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';

interface Props {
  entries: JournalEntry[];
}

export function JournalSummaryCard({ entries }: Props) {
  if (entries.length === 0) {
    return (
      <GlassCard className="p-6 min-h-[200px] flex flex-col justify-center items-center text-center">
        <BookOpen className="w-8 h-8 text-white/20 mb-3" />
        <h3 className="font-medium mb-2">Trade Journal</h3>
        <p className="text-xs text-muted mb-4 max-w-[200px]">Save reports to your journal to track decisions and growth.</p>
        <Link to="/journal" className="text-xs text-[#8CFF3F] hover:underline flex items-center gap-1">Open Journal <ArrowRight className="w-3 h-3"/></Link>
      </GlassCard>
    );
  }

  const wins = entries.filter(e => e.result === 'win').length;
  const losses = entries.filter(e => e.result === 'loss').length;

  return (
    <GlassCard className="p-6 relative group overflow-hidden flex flex-col">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <BookOpen className="w-16 h-16" />
      </div>
      <h3 className="text-xs font-mono text-white/50 mb-4 uppercase tracking-widest">Trade Journal</h3>
      <div className="text-4xl font-light mb-1">{entries.length}</div>
      <div className="text-xs text-muted mb-auto uppercase tracking-wider">Entries</div>

      <div className="flex gap-4 mt-6 text-sm">
        <div><span className="text-[#8CFF3F]">{wins}</span> Wins</div>
        <div><span className="text-[#FF5C7A]">{losses}</span> Losses</div>
      </div>
      
      <Link to="/journal" className="mt-4 pt-4 border-t border-white/5 text-xs text-[#8CFF3F] hover:text-white transition-colors flex items-center justify-between">
        View full journal <ArrowRight className="w-4 h-4" />
      </Link>
    </GlassCard>
  );
}
