import React from 'react';
import { GlassCard } from '../ui/GlassCard';

export function JournalSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-pulse">
      {[1, 2, 3, 4].map(i => (
        <GlassCard key={i} className="p-6 h-64 border border-white/5 flex flex-col justify-between">
          <div className="flex gap-4">
            <div className="w-16 h-16 bg-white/5 rounded-lg shrink-0" />
            <div className="flex-1 space-y-3">
              <div className="h-5 w-1/3 bg-white/10 rounded" />
              <div className="h-4 w-1/4 bg-white/5 rounded" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-8 w-full bg-white/5 rounded-lg" />
            <div className="flex justify-between">
              <div className="h-4 w-1/4 bg-white/5 rounded" />
              <div className="h-4 w-1/4 bg-white/5 rounded" />
            </div>
          </div>
        </GlassCard>
      ))}
    </div>
  );
}
