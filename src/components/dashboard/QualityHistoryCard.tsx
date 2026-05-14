import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { DashboardStats } from '../../types/dashboard';

interface Props {
  stats: DashboardStats;
}

export function QualityHistoryCard({ stats }: Props) {
  const { averageTradeQualityScore, recentScores } = stats;

  if (recentScores.length === 0) {
    return (
      <GlassCard className="p-6 h-full flex flex-col items-center justify-center text-center">
        <h3 className="text-xs font-mono text-white/50 mb-2 uppercase tracking-widest text-center w-full">Trade Quality</h3>
        <p className="text-sm text-muted">No reports to calculate quality.</p>
      </GlassCard>
    );
  }

  // Draw simple SVG sparkline
  const max = Math.max(...recentScores, 100);
  const min = 0;
  const width = 200;
  const height = 40;
  
  const points = recentScores.map((score, i) => {
    const x = (i / (recentScores.length - 1 || 1)) * width;
    const y = height - ((score - min) / (max - min)) * height;
    return `${x},${y}`;
  }).join(' ');

  let colorClass = "text-[#8CFF3F]";
  if (averageTradeQualityScore < 50) colorClass = "text-[#FF5C7A]";
  else if (averageTradeQualityScore < 70) colorClass = "text-[#F5B544]";

  return (
    <GlassCard className="p-6 h-full flex flex-col justify-between">
      <div>
        <h3 className="text-xs font-mono text-white/50 mb-2 uppercase tracking-widest">Avg Quality Score</h3>
        <div className="flex items-end gap-2 mb-4">
          <span className={`text-4xl font-light leading-none ${colorClass}`}>{averageTradeQualityScore}</span>
          <span className="text-xs text-muted mb-1">/ 100</span>
        </div>
      </div>
      
      <div className="w-full relative h-[40px] mt-4 opacity-50">
         <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
           <polyline 
             points={points} 
             fill="none" 
             stroke="currentColor" 
             strokeWidth="2" 
             className="text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]" 
           />
           {recentScores.map((score, i) => {
             const x = (i / (recentScores.length - 1 || 1)) * width;
             const y = height - ((score - min) / (max - min)) * height;
             return <circle key={i} cx={x} cy={y} r="2" className="fill-white" />;
           })}
         </svg>
      </div>

      <p className="text-[10px] text-muted tracking-wider mt-6">Even high scores are not guarantees.</p>
    </GlassCard>
  );
}
