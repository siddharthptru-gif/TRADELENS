import React from 'react';
import { EnrichedJournalEntry, JournalResult } from '../../types/journal';
import { GlassCard } from '../ui/GlassCard';
import { Activity, Clock, Shield, AlertTriangle, Edit3, Trash2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BrokenImageFallback } from '../ui/BrokenImageFallback';

interface JournalEntryCardProps {
  data: EnrichedJournalEntry;
  onEdit: () => void;
  onRemove: () => void;
}

export function JournalEntryCard({ data, onEdit, onRemove }: JournalEntryCardProps) {
  const navigate = useNavigate();
  
  const j = data.journal;
  const scan = data.scan;
  
  const symbol = j.symbol || "Unknown";
  const market = j.market || "unknown";
  const timeframe = j.timeframe || "unknown";
  const stance = j.aiStance || "Unknown";
  const result = j.result || "open";

  const imageUrl = scan?.compressedImageUrl || scan?.imageUrl || scan?.originalImageUrl;

  const getResultColor = (res: string) => {
    switch (res) {
      case 'win': return 'text-[#8CFF3F] bg-[#8CFF3F]/10 border-[#8CFF3F]/20';
      case 'loss': return 'text-[#FF5C7A] bg-[#FF5C7A]/10 border-[#FF5C7A]/20';
      case 'breakeven': return 'text-white/80 bg-white/10 border-white/20';
      case 'skipped': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      default: return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
    }
  };

  const getResultLabel = (res: string) => {
    switch (res) {
      case 'win': return 'Win';
      case 'loss': return 'Loss';
      case 'breakeven': return 'Breakeven';
      case 'skipped': return 'Skipped';
      default: return 'Open';
    }
  };

  const now = Date.now();
  const needsReview = (result === 'open') && (now - j.createdAt > 24 * 60 * 60 * 1000);

  return (
    <GlassCard className="flex flex-col overflow-hidden h-full group p-0 transition-all hover:shadow-[0_8px_30px_rgba(140,255,63,0.05)] hover:-translate-y-1 border border-white/5 relative">
      
      {needsReview && (
        <div className="absolute top-4 right-4 z-10 px-2 py-1 bg-[#FF5C7A] text-black text-[10px] font-bold uppercase tracking-wider rounded border border-[#FF5C7A]/50 shadow-lg animate-pulse">
          Needs Review
        </div>
      )}

      {/* Header Image */}
      <div className="relative h-32 w-full bg-black/50 border-b border-white/5 overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt="thumbnail" className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity" />
        ) : (
          <BrokenImageFallback className="w-full h-full" iconSize="m" />
        )}
        
        <div className="absolute bottom-4 left-4 flex gap-2">
          <span className="px-2 py-1 bg-black/80 backdrop-blur-md rounded border border-white/10 text-sm font-bold text-white tracking-wider flex items-center gap-2">
            {symbol}
            <span className={`text-[10px] px-1.5 py-0.5 rounded border uppercase ${getResultColor(result)}`}>
              {getResultLabel(result)} {j.rMultiple !== undefined && j.rMultiple !== 0 ? `(${j.rMultiple > 0 ? '+' : ''}${j.rMultiple}R)` : ''}
            </span>
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-[10px] font-mono px-2 py-1 bg-white/5 rounded text-white/70 border border-white/10 uppercase">
            {market} • {timeframe}
          </span>
          <span className="text-[10px] font-mono px-2 py-1 bg-white/5 rounded text-white/70 border border-white/10 flex items-center gap-1">
            <Shield className="w-3 h-3 text-[#FF5C7A]" />
            AI: {stance}
          </span>
          {j.userDecision && (
            <span className="text-[10px] font-mono px-2 py-1 bg-white/5 rounded text-white/70 border border-white/10 flex items-center gap-1">
              User: <span className="capitalize">{j.userDecision.replace('_', ' ')}</span>
            </span>
          )}
        </div>

        <div className="mb-4 text-sm text-white/80 line-clamp-2 leading-relaxed flex-1">
          {j.lessonsLearned || j.mistakeNotes || j.followUpNotes || <span className="text-white/30 italic">No notes added. Click 'Edit Journal' to reflect.</span>}
        </div>

        {/* Tags */}
        {(j.mistakeTags && j.mistakeTags.length > 0) && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {j.mistakeTags.map((t, idx) => (
              <span key={idx} className="text-[9px] uppercase font-mono px-1.5 py-0.5 bg-[#FF5C7A]/10 text-[#FF5C7A] border border-[#FF5C7A]/20 rounded">
                ! {t}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
          <span className="text-[10px] text-white/40 uppercase tracking-widest">
            {new Date(j.createdAt).toLocaleDateString()}
          </span>
          
          <div className="flex gap-2">
            <button 
              onClick={onRemove}
              className="p-2 bg-white/5 border border-white/10 rounded-lg text-white/50 hover:text-[#FF5C7A] hover:border-[#FF5C7A]/30 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button 
              onClick={() => navigate(`/report/${j.reportId}`)}
              className="p-2 bg-white/5 border border-white/10 rounded-lg text-white/50 hover:text-white transition-colors"
              title="Open Original Report"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={onEdit}
              className="px-4 py-2 bg-[#8CFF3F]/10 border border-[#8CFF3F]/20 text-[#8CFF3F] hover:bg-[#8CFF3F]/20 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2"
            >
              <Edit3 className="w-3.5 h-3.5" />
              Edit
            </button>
          </div>
        </div>

      </div>
    </GlassCard>
  );
}
