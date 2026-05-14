import React from 'react';
import { ShieldCheck, AlertTriangle, Eye, Navigation } from 'lucide-react';
import { DisclaimerBlock } from '../ui/DisclaimerBlock';

export function SafetyTrust() {
  const points = [
    { icon: ShieldCheck, title: "Risk-first insights", desc: "Every report highlights invalidation levels and risk zones before rewards." },
    { icon: AlertTriangle, title: "No fake guarantees", desc: "We never say 'buy now' or 'guaranteed profit'. Only educational scenarios." },
    { icon: Eye, title: "Confirmation-based", desc: "Analysis assumes you will wait for candle closes and volume confirmation." },
    { icon: Navigation, title: "Educational by design", desc: "Built to teach you how to read market structure, not to blindly follow signals." },
  ];

  return (
    <section className="py-24 bg-[#020403] relative border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-serif mb-6">Built for better decisions,<br /><span className="text-muted italic">not blind signals.</span></h2>
          <p className="text-muted text-sm md:text-base">TradeLens AI is designed for educational technical analysis and risk awareness.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {points.map((pt, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-2xl hover:-translate-y-1 transition-transform duration-300">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                <pt.icon className="w-5 h-5 text-white/80" />
              </div>
              <h3 className="font-medium text-white mb-2">{pt.title}</h3>
              <p className="text-xs text-muted leading-relaxed">{pt.desc}</p>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <DisclaimerBlock className="bg-[#1C5F24]/10 border-[#1C5F24]/30" />
        </div>
      </div>
    </section>
  );
}
