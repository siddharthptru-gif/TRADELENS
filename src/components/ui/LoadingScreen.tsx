import React from 'react';

export function LoadingScreen() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-[#0A0E14]">
      <div className="w-12 h-12 rounded-full border-2 border-[--color-tradelens-green]/20 border-t-[--color-tradelens-green] animate-spin mb-4" />
      <div className="text-sm font-mono text-[--color-tradelens-green] uppercase tracking-widest animate-pulse">Loading System...</div>
    </div>
  );
}
