import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { GradientButton } from '../ui/GradientButton';

interface SafetyDisclaimerCardProps {
  disclaimerAcceptedAt?: number;
  onAccept: () => void;
}

export function SafetyDisclaimerCard({ disclaimerAcceptedAt, onAccept }: SafetyDisclaimerCardProps) {
  return (
    <GlassCard className="p-8 border-[#FF5C7A]/20 bg-[#FF5C7A]/5 relative overflow-hidden">
      
      <div className="absolute top-0 left-0 w-1 h-full bg-[#FF5C7A]" />
      
      <div className="flex items-start gap-4">
        <div className="p-3 bg-[#FF5C7A]/10 rounded-full shrink-0">
          <ShieldAlert className="w-6 h-6 text-[#FF5C7A]" />
        </div>
        
        <div className="flex-1">
          <h2 className="text-xl font-serif text-white mb-2">Safety Disclaimer</h2>
          
          <div className="bg-black/40 border border-white/5 rounded-xl p-4 text-sm text-white/80 leading-relaxed mb-6 font-mono">
            "TradeLens AI provides educational technical analysis only. It is not financial advice, investment advice, or a recommendation to buy or sell any asset. Always do your own research and consult a registered financial adviser where required."
          </div>

          <p className="text-sm text-[#FF5C7A]/80 mb-6 font-medium">
            TradeLens AI does not provide trading signals, guaranteed outcomes, or direct instructions.
          </p>

          {disclaimerAcceptedAt ? (
            <div className="flex items-center gap-2 text-xs text-[#8CFF3F] font-mono uppercase tracking-widest pl-2 border-l-2 border-[#8CFF3F]">
              Accepted on {new Date(disclaimerAcceptedAt).toLocaleDateString()}
            </div>
          ) : (
            <GradientButton onClick={onAccept} className="px-6 py-2.5">
              Acknowledge Safety Disclaimer
            </GradientButton>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
