import React from 'react';
import { GlassCard } from '../ui/GlassCard';

export function ReportsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
      {[1, 2, 3, 4, 5, 6].map(i => (
        <GlassCard key={i} className="p-0 overflow-hidden h-96 flex flex-col border border-white/5">
          <div className="h-48 bg-white/5" />
          <div className="p-5 flex-1 flex flex-col gap-4">
            <div className="h-4 w-1/3 bg-white/10 rounded" />
            <div className="h-4 w-full bg-white/5 rounded" />
            <div className="h-4 w-5/6 bg-white/5 rounded" />
            <div className="mt-auto h-8 w-24 bg-white/10 rounded-lg" />
          </div>
        </GlassCard>
      ))}
    </div>
  );
}
