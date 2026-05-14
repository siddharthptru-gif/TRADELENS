import React from 'react';
import { BookOpen } from 'lucide-react';

export function HelpHero() {
  return (
    <div className="text-center max-w-3xl mx-auto mb-16">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#8CFF3F]/10 mb-6">
        <BookOpen className="w-8 h-8 text-[#8CFF3F]" />
      </div>
      <h1 className="text-4xl md:text-5xl font-serif mb-6 text-white leading-tight">
        Help, Safety & Trading Terms
      </h1>
      <p className="text-lg text-white/60 leading-relaxed">
        Learn how to use TradeLens AI reports responsibly and understand the chart-reading language used by the analyzer.
      </p>
    </div>
  );
}
