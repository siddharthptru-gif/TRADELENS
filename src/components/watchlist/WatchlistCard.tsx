import React from 'react';
import { EnrichedWatchlistItem } from '../../types/watchlist';
import { GlassCard } from '../ui/GlassCard';
import { Activity, Shield, AlertTriangle, Edit3, Trash2, ArrowRight, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { StanceBadge } from '../ui/StanceBadge';
import { BrokenImageFallback } from '../ui/BrokenImageFallback';

interface WatchlistCardProps {
  data: EnrichedWatchlistItem;
  onEdit: () => void;
  onRemove: () => void;
  onViewReports: () => void;
}

export function WatchlistCard({ data, onEdit, onRemove, onViewReports }: WatchlistCardProps) {
  const navigate = useNavigate();
  
  const w = data.item;
  const symbol = w.symbol || "Unknown";
  const market = w.market || "unknown";
  const timeframe = w.timeframe || "unknown";

  const reportCount = data.linkedReports.length;
  const imageUrl = data.latestScan?.compressedImageUrl || data.latestScan?.imageUrl || data.latestScan?.originalImageUrl;

  return (
    <GlassCard className="flex flex-col overflow-hidden h-full group p-0 transition-all hover:shadow-[0_8px_30px_rgba(140,255,63,0.05)] hover:-translate-y-1 border border-white/5 relative">
      
      {/* Header Image */}
      <div className="relative h-32 w-full bg-black/50 border-b border-white/5 overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt="thumbnail" className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity" />
        ) : (
          <BrokenImageFallback className="w-full h-full" iconSize="m" />
        )}
        
        <div className="absolute bottom-4 left-4 flex gap-2 items-center">
          <span className="px-3 py-1 bg-black/80 backdrop-blur-md rounded border border-white/10 text-sm font-bold text-white tracking-wider">
            {symbol}
          </span>
          <span className="text-[10px] font-mono px-2 py-1 bg-black/80 backdrop-blur-md rounded text-white/70 border border-white/10 uppercase">
            {market} • {timeframe}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col">
        
        {/* Important Levels */}
        <div className="space-y-2 mb-4">
          <div className="flex gap-2 items-start">
             <div className="w-1.5 h-1.5 rounded-full bg-[#8CFF3F] mt-1.5 shrink-0 shadow-[0_0_8px_rgba(140,255,63,0.5)]" />
             <div className="flex-1">
               <span className="text-[10px] text-white/40 uppercase tracking-widest block font-mono">Support</span>
               <span className="text-sm font-mono text-[#8CFF3F]/90 truncate block">{w.importantSupport || 'Not set'}</span>
             </div>
          </div>
          <div className="flex gap-2 items-start">
             <div className="w-1.5 h-1.5 rounded-full bg-[#FF5C7A] mt-1.5 shrink-0 shadow-[0_0_8px_rgba(255,92,122,0.5)]" />
             <div className="flex-1">
               <span className="text-[10px] text-white/40 uppercase tracking-widest block font-mono">Resistance</span>
               <span className="text-sm font-mono text-[#FF5C7A]/90 truncate block">{w.importantResistance || 'Not set'}</span>
             </div>
          </div>
        </div>

        {/* Latest AI Context */}
        {data.latestReport && (
          <div className="mb-4 bg-white/5 p-3 rounded-xl border border-white/10">
             <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] text-white/40 uppercase tracking-widest flex items-center gap-1">
                  <Shield className="w-3 h-3" /> Latest AI Context
                </span>
                <span className="text-[10px] font-mono text-white/40">
                  {new Date(data.latestReport.createdAt).toLocaleDateString()}
                </span>
             </div>
             <div className="flex gap-2 items-center flex-wrap">
               <StanceBadge stance={data.latestReport.finalStance as any} />
               <span className={`text-[10px] font-mono px-2 py-1 rounded border uppercase ${
                  data.latestReport.tradeQualityScore >= 70 ? 'text-[#8CFF3F] bg-[#8CFF3F]/10 border-[#8CFF3F]/20' :
                  data.latestReport.tradeQualityScore >= 40 ? 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20' :
                  'text-[#FF5C7A] bg-[#FF5C7A]/10 border-[#FF5C7A]/20'
                }`}>
                  Score: {data.latestReport.tradeQualityScore}
               </span>
             </div>
          </div>
        )}

        {/* Notes */}
        <div className="mb-4 text-sm text-white/70 line-clamp-2 leading-relaxed flex-1">
          {w.notes || <span className="text-white/30 italic">No notes added.</span>}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
          <button 
             onClick={onViewReports}
             className={`text-[10px] uppercase font-bold tracking-widest flex items-center gap-1.5 transition-colors ${
               reportCount > 0 ? 'text-[#8CFF3F] hover:text-white' : 'text-white/30 hover:text-white/50'
             }`}
          >
            <FileText className="w-3.5 h-3.5" />
            {reportCount} Linked {reportCount === 1 ? 'Report' : 'Reports'}
          </button>
          
          <div className="flex gap-1.5">
            <button 
              onClick={onRemove}
              className="p-1.5 bg-white/5 border border-white/10 rounded-lg text-white/50 hover:text-[#FF5C7A] hover:border-[#FF5C7A]/30 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
            {data.latestReport && (
              <button 
                onClick={() => navigate(`/report/${data.latestReport?.reportId}`)}
                className="p-1.5 bg-white/5 border border-white/10 rounded-lg text-white/50 hover:text-white transition-colors"
                title="Open Latest Report"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
            <button 
              onClick={onEdit}
              className="p-1.5 bg-[#8CFF3F]/10 border border-[#8CFF3F]/20 text-[#8CFF3F] hover:bg-[#8CFF3F]/20 rounded-lg transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </GlassCard>
  );
}
