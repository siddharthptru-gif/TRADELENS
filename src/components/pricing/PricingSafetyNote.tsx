import React from 'react';
import { ShieldAlert } from 'lucide-react';

export function PricingSafetyNote() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#FF5C7A]/5 border border-[#FF5C7A]/20 rounded-2xl flex items-start gap-4">
      <div className="p-3 bg-[#FF5C7A]/10 rounded-xl shrink-0">
        <ShieldAlert className="w-6 h-6 text-[#FF5C7A]" />
      </div>
      <div>
        <h4 className="text-[#FF5C7A] font-bold mb-2">Important Safety Notice</h4>
        <p className="text-sm font-mono text-[#FF5C7A]/80 leading-relaxed">
          TradeLens AI provides educational technical analysis only. It is not financial advice, investment advice, or a recommendation to buy or sell any asset. Always do your own research and consult a registered financial adviser where required.
        </p>
      </div>
    </div>
  );
}
