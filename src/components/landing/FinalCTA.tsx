import React from 'react';
import { GradientButton } from '../ui/GradientButton';

export function FinalCTA() {
  return (
    <section className="relative py-32 overflow-hidden bg-[#020403] flex items-center justify-center min-h-[60vh] perspective-scene">
      {/* Background radial soft light */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(28,95,36,0.2),transparent_60%)] pointer-events-none"></div>
      
      {/* Faint Candlestick Grid BG */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none [transform:rotateX(60deg)_scale(3)_translateY(10%)]"></div>

      <div className="relative z-20 max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-5xl md:text-7xl font-serif mb-8 tracking-tight">Stop guessing <br /><span className="text-[#8CFF3F] italic">the chart.</span></h2>
        <p className="text-muted text-lg mb-10 max-w-xl mx-auto font-light">
          Upload your first chart and get a structured AI market analysis in seconds.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <GradientButton onClick={() => window.location.href='/signup'} className="px-8 py-4 text-base w-full sm:w-auto">
            Start Free Analysis
          </GradientButton>
          <button className="px-8 py-4 rounded-full border border-white/20 text-white font-medium text-sm hover:bg-white/5 transition-colors w-full sm:w-auto">
            View Demo Report
          </button>
        </div>
      </div>
    </section>
  );
}
