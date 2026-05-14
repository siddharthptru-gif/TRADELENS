import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { UsageLimits } from '../../types/dashboard';
import { cn } from '../../lib/utils';

interface Props {
  limits: UsageLimits | null;
}

export function ScansRemainingRing({ limits }: Props) {
  if (!limits) {
    return (
      <GlassCard className="p-6 h-full flex flex-col items-center justify-center text-center">
        <p className="text-sm text-muted">Usage data is being prepared.</p>
      </GlassCard>
    );
  }

  const { dailyUsed, dailyLimit } = limits;
  const remaining = Math.max(0, dailyLimit - dailyUsed);
  const percent = Math.min(100, Math.max(0, (remaining / dailyLimit) * 100));

  let colorClass = "text-[#8CFF3F]"; // Green
  let strokeClass = "stroke-[#8CFF3F]";
  if (percent <= 20) {
    colorClass = "text-[#FF5C7A]"; // Red
    strokeClass = "stroke-[#FF5C7A]";
  } else if (percent <= 50) {
    colorClass = "text-[#F5B544]"; // Amber
    strokeClass = "stroke-[#F5B544]";
  }

  const strokeDasharray = `${percent}, 100`;

  return (
    <GlassCard className="p-6 h-full flex flex-col items-center relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl pointer-events-none group-hover:bg-white/10 transition-colors"></div>
      
      <h3 className="text-xs font-mono text-white/50 mb-6 uppercase tracking-widest w-full text-left">Daily Scans</h3>
      
      <div className="relative w-32 h-32 flex items-center justify-center">
        <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
          <path
            className="stroke-white/10"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            strokeWidth="3"
          />
          <path
            className={cn("transition-all duration-1000 ease-out drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]", strokeClass)}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            strokeWidth="3"
            strokeDasharray={strokeDasharray}
          />
        </svg>
        
        <div className="absolute flex flex-col items-center justify-center">
          <span className={cn("text-4xl font-light leading-none", colorClass)}>{remaining}</span>
          <span className="text-[10px] text-muted tracking-wide mt-1">REMAINING</span>
        </div>
      </div>
      
      <div className="mt-auto pt-6 w-full flex justify-between text-xs text-muted border-t border-white/5">
        <span>Monthly: {limits.monthlyUsed}/{limits.monthlyLimit}</span>
        <span>Resets in {Math.round((limits.dailyResetAt - Date.now()) / 3600000)}h</span>
      </div>
    </GlassCard>
  );
}
