import React from 'react';
import { X, ArrowRight, Unlink, Activity } from 'lucide-react';
import { EnrichedWatchlistItem } from '../../types/watchlist';
import { useNavigate } from 'react-router-dom';
import { StanceBadge } from '../ui/StanceBadge';
import { BrokenImageFallback } from '../ui/BrokenImageFallback';

interface LinkedReportsPanelProps {
  data: EnrichedWatchlistItem;
  onUnlink: (reportId: string) => void;
  onClose: () => void;
}

export function LinkedReportsPanel({ data, onUnlink, onClose }: LinkedReportsPanelProps) {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm sm:items-stretch sm:justify-end">
      <div className="w-full max-w-lg bg-[#020403] border-l border-white/10 shadow-2xl relative flex flex-col h-full rounded-2xl sm:rounded-none sm:h-auto overflow-hidden animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/40">
          <div>
            <h2 className="text-xl font-serif text-white">Linked Reports</h2>
            <p className="text-sm font-bold tracking-widest text-[#8CFF3F] uppercase">{data.item.symbol}</p>
          </div>
          <button onClick={onClose} className="p-2 text-white/40 hover:text-white bg-white/5 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
          
          {data.linkedReports.length === 0 ? (
             <div className="p-8 text-center text-white/40 border-2 border-dashed border-white/10 rounded-2xl bg-white/5">
                <Activity className="w-8 h-8 text-white/20 mx-auto mb-3" />
                No reports linked yet. Add this symbol from a report page or analyze a new chart.
             </div>
          ) : (
            data.linkedReports.map((link) => {
              const r = link.report;
              const s = link.scan;
              const imageUrl = s?.compressedImageUrl || s?.imageUrl || s?.originalImageUrl;

              return (
                <div key={link.reportId} className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-colors">
                  <div className="h-24 w-full bg-black/50 border-b border-white/5">
                    {imageUrl ? (
                       <img src={imageUrl} alt="thumbnail" className="w-full h-full object-cover opacity-60" />
                    ) : (
                       <BrokenImageFallback className="w-full h-full" iconSize="m" />
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                       <span className="text-[10px] text-white/40 font-mono">
                         {new Date(r.createdAt).toLocaleString()}
                       </span>
                       <div className="flex gap-2">
                         <span className="text-[10px] font-mono px-2 py-1 bg-white/5 rounded border border-white/10 uppercase">
                          Score: {r.tradeQualityScore}
                         </span>
                         <StanceBadge stance={r.finalStance as any} />
                       </div>
                    </div>
                    
                    <p className="text-sm text-white/80 line-clamp-2 mb-4 leading-relaxed">
                      {r.quickSummary}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-white/5">
                       <button
                         onClick={() => onUnlink(link.reportId)}
                         className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-[#FF5C7A]/70 hover:text-[#FF5C7A] transition-colors"
                       >
                         <Unlink className="w-3.5 h-3.5" />
                         Unlink
                       </button>

                       <button
                         onClick={() => navigate(`/report/${link.reportId}`)}
                         className="flex items-center gap-1.5 text-xs font-bold text-white/70 hover:text-white transition-colors"
                       >
                         Open Report
                         <ArrowRight className="w-4 h-4" />
                       </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}

        </div>

      </div>
    </div>
  );
}
