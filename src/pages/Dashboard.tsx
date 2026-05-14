import React from 'react';
import { GlassCard } from '../components/ui/GlassCard';

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-serif mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-6">
          <h3 className="text-sm font-mono text-white/50 mb-2 uppercase">Usage Remaining</h3>
          <p className="text-4xl font-light">3 / 3</p>
        </GlassCard>
        <GlassCard className="p-6">
          <h3 className="text-sm font-mono text-white/50 mb-2 uppercase">Avg Quality Score</h3>
          <p className="text-4xl font-light text-[#F5B544]">--</p>
        </GlassCard>
        <GlassCard className="p-6">
          <h3 className="text-sm font-mono text-white/50 mb-2 uppercase">Current Plan</h3>
          <p className="text-4xl font-light text-[--color-tradelens-green]">Free</p>
        </GlassCard>
      </div>
      
      <h2 className="text-xl font-serif mt-12 mb-6">Recent Scans</h2>
      <GlassCard className="p-12 flex items-center justify-center text-center">
        <p className="text-white/40">You haven't analyzed any charts yet.</p>
      </GlassCard>
    </div>
  );
}
