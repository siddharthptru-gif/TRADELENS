import React from 'react';
import { ChartScan } from '../../types/dashboard';
import { GlassCard } from './Shared';
import { Maximize2, Activity } from 'lucide-react';
import { BrokenImageFallback } from '../ui/BrokenImageFallback';

export function ChartPreviewPanel({ scan }: { scan: ChartScan | null }) {
  if (!scan) return null;
  const imageUrl = scan.compressedImageUrl || scan.imageUrl || scan.originalImageUrl;

  return (
    <div className="lg:w-[400px] xl:w-[500px] shrink-0 space-y-6">
      <div className="sticky top-24">
        <GlassCard className="p-4 relative group">
          {imageUrl ? (
             <img src={imageUrl} alt="Chart preview" className="w-full h-auto rounded-lg object-contain bg-black/50" />
          ) : (
             <BrokenImageFallback className="w-full aspect-video rounded-lg" iconSize="l" />
          )}
          {imageUrl && (
            <a href={imageUrl} target="_blank" rel="noopener noreferrer" className="absolute top-6 right-6 p-2 bg-black/50 hover:bg-black/80 rounded-lg text-white/50 hover:text-white transition-opacity opacity-0 group-hover:opacity-100 backdrop-blur-sm">
              <Maximize2 className="w-4 h-4" />
            </a>
          )}
        </GlassCard>
        
        <div className="mt-4 p-4 border border-white/5 rounded-2xl bg-white/[0.02]">
          <h4 className="text-xs text-white/50 uppercase tracking-widest mb-3">Scan Details</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="block text-white/40 text-xs mb-1">Status</span>
              <span className="text-[#8CFF3F] capitalize">{scan.status}</span>
            </div>
            <div>
              <span className="block text-white/40 text-xs mb-1">Timeframe</span>
              <span className="text-white/90 capitalize">{scan.timeframe}</span>
            </div>
            <div>
              <span className="block text-white/40 text-xs mb-1">Trading Style</span>
              <span className="text-white/90 capitalize">{scan.tradingStyle}</span>
            </div>
            <div>
              <span className="block text-white/40 text-xs mb-1">Risk Profile</span>
              <span className="text-white/90 capitalize">{scan.riskProfile}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
