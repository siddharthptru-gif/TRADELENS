import React from 'react';
import { GlassCard } from '../ui/GlassCard';

export function ReportGuide() {
  return (
    <div className="mb-16 space-y-12">
      
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif text-white mb-4">How to Read a Report</h2>
        <p className="text-white/60">Understanding the core sections of TradeLens AI analysis.</p>
      </div>

      <GlassCard className="p-8">
        <h3 className="text-xl font-serif text-white mb-6">Report Sections</h3>
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
          <SectionItem title="Quick Summary" desc="A short, high-level overview of the chart's current state." />
          <SectionItem title="Trend Analysis" desc="Identifies if the market is trending up, down, or moving sideways." />
          <SectionItem title="Market Structure" desc="Details the sequence of higher highs, lower lows, and recent breaks of structure." />
          <SectionItem title="Support & Resistance" desc="Key price levels where buyers or sellers have historically stepped in." />
          <SectionItem title="Smart Money Clues" desc="Highlights areas of liquidity sweeps, fair value gaps, and large institutional momentum." />
          <SectionItem title="Risk & Invalidation" desc="Crucial levels where the current thesis is proven wrong." />
        </div>
      </GlassCard>

      <GlassCard className="p-8">
        <h3 className="text-xl font-serif text-[#8CFF3F] mb-6">Trade Quality Score</h3>
        <p className="text-sm text-white/60 mb-6">A single metric (0-100) combining structural clarity, trend alignment, and risk definition.</p>
        
        <div className="space-y-4">
          <ScoreRow range="0–30" label="Very unclear / avoid" color="text-[#FF5C7A]" />
          <ScoreRow range="31–50" label="Weak / high risk" color="text-[#FF5C7A]/80" />
          <ScoreRow range="51–65" label="Average / needs confirmation" color="text-yellow-400" />
          <ScoreRow range="66–80" label="Good / wait for confirmation" color="text-[#8CFF3F]/80" />
          <ScoreRow range="81–90" label="Strong / still risk-managed" color="text-[#8CFF3F]" />
          <ScoreRow range="91–100" label="Very clean but not guaranteed" color="text-blue-400 font-bold" />
        </div>
        <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-xl text-center">
          <p className="text-sm font-mono text-white/80">"Even 100/100 is not a guarantee."</p>
        </div>
      </GlassCard>

      <GlassCard className="p-8 border-blue-400/20 relative overflow-hidden">
        <h3 className="text-xl font-serif text-blue-400 mb-4">Trader Bias Mode</h3>
        <p className="text-sm text-white/80 mb-6 leading-relaxed">
          The "If I Were Analyzing This Chart" section is a conditional educational opinion, not an instruction. It simulates how an experienced structural trader might approach the chart.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 bg-[#8CFF3F]/5 border border-[#8CFF3F]/20 rounded-xl">
            <h4 className="text-[#8CFF3F] font-bold text-sm mb-3 uppercase tracking-widest">Allowed Wording Examples</h4>
            <ul className="list-disc list-inside space-y-2 text-sm text-white/70">
              <li>"I would wait for confirmation."</li>
              <li>"My bias would be cautiously bullish only if price closes above resistance."</li>
              <li>"I would avoid this setup if invalidation breaks."</li>
            </ul>
          </div>
          <div className="p-4 bg-[#FF5C7A]/5 border border-[#FF5C7A]/20 rounded-xl">
            <h4 className="text-[#FF5C7A] font-bold text-sm mb-3 uppercase tracking-widest">Forbidden Concepts</h4>
            <ul className="list-disc list-inside space-y-2 text-sm text-white/70">
              <li>Direct commands or signals</li>
              <li>Promises of profit</li>
              <li>Guaranteed outcomes</li>
            </ul>
          </div>
        </div>
      </GlassCard>

    </div>
  );
}

function SectionItem({ title, desc }: { title: string, desc: string }) {
  return (
    <div>
      <h4 className="font-bold text-white mb-1">{title}</h4>
      <p className="text-sm text-white/60 leading-relaxed">{desc}</p>
    </div>
  );
}

function ScoreRow({ range, label, color }: { range: string, label: string, color: string }) {
  return (
    <div className="flex items-center justify-between p-3 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors rounded-lg">
      <span className="font-mono font-bold text-white">{range}</span>
      <span className={`text-sm ${color}`}>{label}</span>
    </div>
  );
}
