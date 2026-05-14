import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { ChartScan } from '../../types/dashboard';
import { Link } from 'react-router-dom';
import { Image, Clock, ArrowRight, XCircle } from 'lucide-react';
import { StatusPill } from '../ui/StatusPill';
import { BrokenImageFallback } from '../ui/BrokenImageFallback';

interface Props {
  scans: ChartScan[];
}

export function RecentScansGrid({ scans }: Props) {
  const recent = scans.slice(0, 6);

  if (recent.length === 0) {
    return (
      <GlassCard className="p-8 h-[300px] flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
          <Image className="w-6 h-6 text-white/30" />
        </div>
        <p className="text-white/60 mb-2 font-medium">No scans yet.</p>
        <p className="text-sm text-muted mb-6">Upload your first chart to see it here.</p>
        <Link to="/upload" className="text-sm text-[#8CFF3F] hover:underline flex items-center gap-1">
          Upload Chart <ArrowRight className="w-4 h-4" />
        </Link>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xs font-mono text-white/50 uppercase tracking-widest">Recent Activity</h3>
        <Link to="/reports" className="text-[10px] text-muted hover:text-white uppercase tracking-wider transition-colors">View All</Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recent.map(scan => {
          const isCompleted = scan.status === 'completed';
          const targetUrl = isCompleted && scan.reportId ? `/report/${scan.reportId}` : 
                            scan.status === 'failed' ? '#' : `/scan/${scan.id}/loading`;
          
          const img = scan.compressedImageUrl || scan.imageUrl || scan.originalImageUrl;

          return (
            <Link key={scan.id} to={targetUrl} className="block group">
              <div className="bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 flex flex-col h-full">
                
                {/* Image Header */}
                <div className="h-24 w-full bg-black/50 border-b border-white/5 relative">
                   {img ? (
                      <img src={img} alt={scan.symbol} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
                   ) : (
                      <BrokenImageFallback className="w-full h-full" iconSize="m" />
                   )}
                   
                   <div className="absolute top-2 right-2">
                       {scan.status === 'completed' && <StatusPill status="Complete" className="bg-[#8CFF3F]/10 text-[#8CFF3F] border-[#8CFF3F]/20 text-[9px] px-1.5 py-0.5" />}
                       {(scan.status === 'analyzing' || scan.status === 'queued') && <StatusPill status="Analyzing" className="text-[9px] px-1.5 py-0.5" />}
                       {scan.status === 'failed' && <StatusPill status="Failed" className="text-[9px] px-1.5 py-0.5 bg-[#FF5C7A]/10 text-[#FF5C7A]" />}
                   </div>
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium text-sm text-white group-hover:text-[#8CFF3F] transition-colors">{scan.symbol || 'Unknown'}</div>
                      <div className="text-[10px] text-muted uppercase tracking-wider">{scan.marketType || 'market'} • {scan.timeframe || '1D'}</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-end mt-auto pt-2">
                     <div className="flex items-center gap-1.5 text-[10px] text-muted font-mono">
                        <Clock className="w-3 h-3" />
                        {new Date(scan.createdAt).toLocaleDateString()}
                     </div>
                     <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white/70 transition-colors" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </GlassCard>
  );
}
