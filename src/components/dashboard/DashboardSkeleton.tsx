import React from 'react';
import { GlassCard } from '../ui/GlassCard';

export function DashboardSkeleton() {
  const PulseBlock = ({ className }: { className: string }) => (
    <div className={`bg-white/5 animate-pulse rounded-lg ${className}`}></div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in duration-1000">
      <div className="flex justify-between items-end mb-8">
        <div className="flex items-center gap-4">
          <PulseBlock className="w-14 h-14 rounded-full" />
          <div>
            <PulseBlock className="w-64 h-8 mb-2" />
            <PulseBlock className="w-32 h-4" />
          </div>
        </div>
        <PulseBlock className="w-20 h-8" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <GlassCard className="p-6 md:col-span-1 border-white/5 bg-white/[0.01]">
          <PulseBlock className="w-24 h-4 mb-6" />
          <PulseBlock className="w-16 h-12 mb-auto" />
          <PulseBlock className="w-full h-8 mt-6" />
        </GlassCard>
        
        <GlassCard className="p-6 md:col-span-1 border-white/5 bg-white/[0.01]">
          <PulseBlock className="w-24 h-4 mb-6" />
          <div className="w-32 h-32 mx-auto rounded-full border-4 border-white/5 animate-pulse mb-auto"></div>
          <PulseBlock className="w-full h-4 mt-6" />
        </GlassCard>
        
        <GlassCard className="p-6 md:col-span-2 border-white/5 bg-white/[0.01]">
          <PulseBlock className="w-32 h-4 mb-6" />
          <PulseBlock className="w-full h-32 mt-4" />
        </GlassCard>
      </div>
    </div>
  );
}
