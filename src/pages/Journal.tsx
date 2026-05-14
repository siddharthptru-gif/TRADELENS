import React from 'react';
import { GlassCard } from '../components/ui/GlassCard';

export default function Journal() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-serif mb-8">Trading Journal</h1>
      <GlassCard className="p-12 flex items-center justify-center text-center">
        <p className="text-white/40">Your journal is empty.</p>
      </GlassCard>
    </div>
  );
}
