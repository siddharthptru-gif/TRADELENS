import React from 'react';
import { GlassCard } from '../components/ui/GlassCard';

export default function Pricing() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 text-center">
      <h1 className="text-4xl font-serif mb-4">Pricing</h1>
      <p className="text-muted mb-12">Choose your analyzer plan.</p>
      <div className="grid md:grid-cols-4 gap-6">
        <GlassCard className="p-8"><h3 className="text-xl">Free</h3></GlassCard>
        <GlassCard className="p-8" glow><h3 className="text-xl">Starter</h3></GlassCard>
        <GlassCard className="p-8"><h3 className="text-xl">Pro</h3></GlassCard>
        <GlassCard className="p-8"><h3 className="text-xl">Elite</h3></GlassCard>
      </div>
    </div>
  );
}
