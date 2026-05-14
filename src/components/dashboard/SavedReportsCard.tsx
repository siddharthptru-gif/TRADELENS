import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { SavedReport } from '../../types/dashboard';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText } from 'lucide-react';

interface Props {
  saved: SavedReport[];
}

export function SavedReportsCard({ saved }: Props) {
  if (saved.length === 0) {
    return (
      <GlassCard className="p-6 min-h-[200px] flex flex-col justify-center items-center text-center">
        <FileText className="w-8 h-8 text-white/20 mb-3" />
        <h3 className="font-medium mb-2">Saved Reports</h3>
        <p className="text-xs text-muted mb-4 max-w-[200px]">Save analysis reports to reference them later.</p>
        <Link to="/reports" className="text-xs text-[#8CFF3F] hover:underline flex items-center gap-1">Open Reports <ArrowRight className="w-3 h-3"/></Link>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-6 relative group overflow-hidden flex flex-col h-full">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <FileText className="w-16 h-16" />
      </div>
      <h3 className="text-xs font-mono text-white/50 mb-4 uppercase tracking-widest">Saved Reports</h3>
      <div className="text-4xl font-light mb-1">{saved.length}</div>
      <div className="text-xs text-muted mb-auto uppercase tracking-wider">Saved Analyses</div>
      
      <Link to="/reports" className="mt-8 pt-4 border-t border-white/5 text-xs text-[#8CFF3F] hover:text-white transition-colors flex items-center justify-between">
        Browse Reports <ArrowRight className="w-4 h-4" />
      </Link>
    </GlassCard>
  );
}
