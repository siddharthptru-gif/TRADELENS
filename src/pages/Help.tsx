import React from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { DisclaimerBlock } from '../components/ui/DisclaimerBlock';

export default function Help() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-serif mb-8">Help & Safety</h1>
      <DisclaimerBlock className="mb-8" />
      <GlassCard className="p-8">
        <h3 className="text-xl font-serif mb-4">What TradeLens does</h3>
        <p className="text-white/60 mb-6">TradeLens AI reads chart structure, identifies support/resistance, and highlights potential scenarios using standard technical analysis principles.</p>
        <h3 className="text-xl font-serif mb-4">What it does NOT do</h3>
        <p className="text-white/60">It does not predict the future, advise you on investments, or offer guaranteed signals.</p>
      </GlassCard>
    </div>
  );
}
