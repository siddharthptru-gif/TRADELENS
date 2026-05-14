import React from 'react';
import { useParams } from 'react-router-dom';
import { DisclaimerBlock } from '../components/ui/DisclaimerBlock';
import { GlassCard } from '../components/ui/GlassCard';
import { ScoreDial } from '../components/ui/ScoreDial';
import { StanceBadge } from '../components/ui/StanceBadge';

export default function Report() {
  const { reportId } = useParams();

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <DisclaimerBlock className="mb-8" />
      
      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <div className="md:col-span-2">
          <h1 className="text-4xl font-serif mb-4">Analysis Report</h1>
          <p className="text-muted text-lg mb-6 leading-relaxed">
            Placeholder for AI-generated quick summary. Price is compressing below resistance...
          </p>
          <div className="flex gap-4">
            <StanceBadge stance="Wait for confirmation" />
            <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-white/60">BTCUSDT • 1D</div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <ScoreDial score={72} label="Trade Quality" />
        </div>
      </div>

      <GlassCard className="p-8 mb-8">
        <h3 className="text-xl font-serif mb-4">If I Were Analyzing This Chart</h3>
        <p className="text-white/60 mb-6 italic border-l-2 border-[--color-tradelens-green] pl-4">
          "My bias would be cautiously bullish because price is forming higher lows near resistance, but the breakout is not confirmed yet."
        </p>
        <p className="text-xs text-white/40 font-mono">This is an educational analysis and personal-style market bias, not financial advice.</p>
      </GlassCard>

      <GlassCard className="p-8 mb-8">
        <h3 className="text-xl font-serif mb-4 flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[--color-tradelens-green]"></span>
          Support & Resistance
        </h3>
        <p className="text-white/60">Placeholder for detailed zones...</p>
      </GlassCard>
      
      <DisclaimerBlock className="mt-12" />
    </div>
  );
}
