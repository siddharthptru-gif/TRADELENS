import React from 'react';

export function WatchlistSkeleton() {
  return (
    <div className="animate-pulse space-y-8">
      {/* Stats Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-24 bg-white/5 rounded-2xl border border-white/5" />
        ))}
      </div>

      {/* Filter Bar Skeleton */}
      <div className="h-20 bg-white/5 rounded-2xl border border-white/5 flex items-center px-6 gap-4">
        <div className="h-10 w-64 bg-white/10 rounded-xl" />
        <div className="h-10 w-32 bg-white/10 rounded-xl" />
        <div className="h-10 w-32 bg-white/10 rounded-xl" />
        <div className="h-10 w-32 bg-white/10 rounded-xl" />
      </div>

      {/* Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-80 bg-white/5 rounded-2xl border border-white/5" />
        ))}
      </div>
    </div>
  );
}
