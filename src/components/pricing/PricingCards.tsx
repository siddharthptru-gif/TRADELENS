import React from 'react';
import { Check, X } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

export function PricingCards() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
      
      {/* 1. Free */}
      <GlassCard className="p-8 flex flex-col relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-white/20" />
        <h3 className="text-2xl font-serif text-white mb-2">Free</h3>
        <div className="flex items-baseline gap-1 mb-6">
          <span className="text-3xl font-bold text-white">₹0</span>
          <span className="text-white/40 text-sm">/ month</span>
        </div>
        <ul className="space-y-4 mb-8 flex-1">
          <Feature text="3 scans/day" />
          <Feature text="Basic AI report" />
          <Feature text="Saved reports" />
          <Feature text="Trading journal" />
          <Feature text="Watchlist" />
          <Feature text="Educational safety disclaimer" />
        </ul>
        <button className="w-full py-3 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold transition-all">
          Start Free
        </button>
      </GlassCard>

      {/* 2. Starter */}
      <GlassCard className="p-8 flex flex-col relative overflow-hidden" glow>
        <div className="absolute top-0 left-0 w-full h-1 bg-[#8CFF3F]" />
        <div className="absolute top-4 right-4 bg-[#8CFF3F]/10 border border-[#8CFF3F]/30 text-[#8CFF3F] text-[10px] uppercase font-bold tracking-widest px-2 py-1 rounded">
          Popular
        </div>
        <h3 className="text-2xl font-serif text-[#8CFF3F] mb-2">Starter</h3>
        <div className="flex items-baseline gap-1 mb-6">
          <span className="text-3xl font-bold text-white">TBD</span>
          <span className="text-white/40 text-sm">/ month</span>
        </div>
        <ul className="space-y-4 mb-8 flex-1">
          <Feature text="50 scans/month" />
          <Feature text="Full AI report" />
          <Feature text="Basic journal" />
          <Feature text="Watchlist" />
          <Feature text="Saved reports" />
          <Feature text="Better usage limits" />
        </ul>
        <button disabled className="w-full py-3 rounded-xl border border-white/10 bg-white/5 text-white/30 font-bold cursor-not-allowed">
          Coming Soon
        </button>
      </GlassCard>

      {/* 3. Pro */}
      <GlassCard className="p-8 flex flex-col relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-purple-400" />
        <h3 className="text-2xl font-serif text-purple-400 mb-2">Pro</h3>
        <div className="flex items-baseline gap-1 mb-6">
          <span className="text-3xl font-bold text-white">TBD</span>
          <span className="text-white/40 text-sm">/ month</span>
        </div>
        <ul className="space-y-4 mb-8 flex-1">
          <Feature text="High scan limit" />
          <Feature text="Advanced report" />
          <Feature text="PDF export placeholder" />
          <Feature text="Priority queue placeholder" />
          <Feature text="Journal + Watchlist" />
          <Feature text="Report comparison placeholder" />
        </ul>
        <button disabled className="w-full py-3 rounded-xl border border-white/10 bg-white/5 text-white/30 font-bold cursor-not-allowed">
          Coming Soon
        </button>
      </GlassCard>

      {/* 4. Elite */}
      <GlassCard className="p-8 flex flex-col relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-blue-400" />
        <h3 className="text-2xl font-serif text-blue-400 mb-2">Elite</h3>
        <div className="flex items-baseline gap-1 mb-6">
          <span className="text-3xl font-bold text-white">TBD</span>
          <span className="text-white/40 text-sm">/ month</span>
        </div>
        <ul className="space-y-4 mb-8 flex-1">
          <Feature text="Deeper reports placeholder" />
          <Feature text="Strategy templates placeholder" />
          <Feature text="Advanced journal insights placeholder" />
          <Feature text="Priority analysis placeholder" />
          <Feature text="Full learning workflow" />
        </ul>
        <button disabled className="w-full py-3 rounded-xl border border-white/10 bg-white/5 text-white/30 font-bold cursor-not-allowed">
          Coming Soon
        </button>
      </GlassCard>

    </div>
  );
}

function Feature({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <Check className="w-5 h-5 text-[#8CFF3F] shrink-0" />
      <span className="text-sm text-white/80">{text}</span>
    </li>
  );
}
