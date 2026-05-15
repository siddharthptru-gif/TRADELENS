import React from 'react';
import { UploadCloud, FolderOpen, BookOpen, Bookmark, Settings, ShieldCheck } from 'lucide-react';

export default function Pricing() {
  const features = [
    { name: 'Chart Uploads', icon: UploadCloud, desc: 'Analyze unlimited charts for free.' },
    { name: 'AI Reports', icon: ShieldCheck, desc: 'Get detailed technical analysis instantly.' },
    { name: 'Saved Reports', icon: FolderOpen, desc: 'Store past analysis to review later.' },
    { name: 'Trading Journal', icon: BookOpen, desc: 'Keep track of trades and lessons.' },
    { name: 'Watchlist', icon: Bookmark, desc: 'Monitor your favorite symbols.' },
    { name: 'Settings', icon: Settings, desc: 'Customize your analysis preferences.' },
  ];

  return (
    <div className="min-h-screen bg-[#020403] text-white pt-32 pb-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-serif mb-6 tracking-tight">TradeLens AI is <span className="text-[#8CFF3F]">free to use</span></h1>
        <p className="text-lg md:text-xl text-white/50 mb-16 max-w-2xl mx-auto">
          Analyze charts, save reports, use the trading journal, and manage your watchlist without paid plans.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {features.map((f, i) => (
            <div key={i} className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <f.icon className="w-8 h-8 text-[#8CFF3F] mb-4" />
              <h3 className="text-xl font-bold mb-2">{f.name}</h3>
              <p className="text-sm text-white/50">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

