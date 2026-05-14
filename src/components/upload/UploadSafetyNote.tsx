import React from 'react';
import { ShieldAlert } from 'lucide-react';

export function UploadSafetyNote() {
  return (
    <div className="mt-8 p-4 bg-white/[0.02] border border-white/5 rounded-xl flex items-start gap-4 text-xs text-muted leading-relaxed">
      <ShieldAlert className="w-5 h-5 text-white/30 shrink-0 mt-0.5" />
      <div>
        <p className="mb-2">TradeLens AI reads visible chart structure only. If timeframe, symbol, volume, or price axis are missing, the analysis confidence may be lower.</p>
        <p>Reports are strictly educational and risk-aware. They are not financial advice or trading signals.</p>
      </div>
    </div>
  );
}
