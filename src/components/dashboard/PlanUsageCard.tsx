import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { UsageLimits } from '../../types/dashboard';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';

interface Props {
  limits: UsageLimits | null;
}

export function PlanUsageCard({ limits }: Props) {
  const plan = limits?.plan || 'Free';
  const planCapitalized = plan.charAt(0).toUpperCase() + plan.slice(1);

  return (
    <GlassCard className="p-6 h-full flex flex-col relative overflow-hidden group">
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#8CFF3F] rounded-full blur-[60px] opacity-[0.05] pointer-events-none group-hover:opacity-[0.1] transition-opacity"></div>
      
      <h3 className="text-xs font-mono text-white/50 mb-4 uppercase tracking-widest">Subscription</h3>
      
      <div className="flex items-end gap-3 mb-6">
        <span className="text-4xl font-light text-[#8CFF3F] leading-none">{planCapitalized}</span>
        <span className="text-xs text-muted mb-1">Plan</span>
      </div>
      
      <div className="space-y-3 mb-auto">
        <div className="flex justify-between items-center text-xs">
          <span className="text-muted">Daily Limit</span>
          <span className="font-mono text-white/80">{limits?.dailyLimit || 3}</span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="text-muted">Monthly Limit</span>
          <span className="font-mono text-white/80">{limits?.monthlyLimit || 90}</span>
        </div>
      </div>
      
      <Link to="/pricing" className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm hover:bg-white/10 transition-colors">
        <Zap className="w-4 h-4 text-[#F5B544]" />
        Upgrade Plan
      </Link>
    </GlassCard>
  );
}
