import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function DisclaimerBlock({ className }: { className?: string }) {
  return (
    <div className={cn("p-4 md:p-6 bg-[#FF5C7A]/5 border border-[#FF5C7A]/10 rounded-2xl flex gap-4 items-start", className)}>
      <div className="shrink-0 w-8 h-8 rounded-full bg-[#FF5C7A]/10 flex items-center justify-center">
        <ShieldAlert className="w-4 h-4 text-[#FF5C7A]" />
      </div>
      <div>
        <h4 className="text-sm font-mono text-[#FF5C7A] uppercase tracking-wider mb-2">Important Disclaimer</h4>
        <p className="text-sm text-white/60 leading-relaxed font-sans">
          TradeLens AI provides educational technical analysis only. It is not financial advice, investment advice, or a recommendation to buy or sell any asset. Always do your own research and consult a registered financial adviser where required.
        </p>
      </div>
    </div>
  );
}
