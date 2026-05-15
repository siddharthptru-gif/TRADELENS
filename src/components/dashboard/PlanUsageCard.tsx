import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { UsageLimits } from '../../types/dashboard';
import { ShieldCheck } from 'lucide-react';

interface Props {
  limits: UsageLimits | null;
}

export function PlanUsageCard({ limits }: Props) {
  return (
    <GlassCard className="p-6 h-full flex flex-col relative overflow-hidden group">
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#8CFF3F] rounded-full blur-[60px] opacity-[0.05] pointer-events-none group-hover:opacity-[0.1] transition-opacity"></div>
      
      <h3 className="text-xs font-mono text-white/50 mb-4 uppercase tracking-widest">Access Level</h3>
      
      <div className="flex items-end gap-3 mb-6 flex-1">
        <span className="text-4xl font-light text-[#8CFF3F] leading-none">Free</span>
      </div>
      
      <p className="text-xs text-muted mb-6">
        All core TradeLens AI tools are currently available for free. Usage tracking is used only to keep the system stable.
      </p>

      <div className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#8CFF3F]/10 border border-[#8CFF3F]/20 text-[#8CFF3F] text-sm font-medium">
        <ShieldCheck className="w-4 h-4" />
        Full Access
      </div>
    </GlassCard>
  );
}
