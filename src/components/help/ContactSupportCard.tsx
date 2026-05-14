import React from 'react';
import { Mail } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

export function ContactSupportCard() {
  return (
    <div className="max-w-2xl mx-auto text-center mb-20">
      <GlassCard className="p-10 border-white/5 bg-white/5">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-full mb-6">
          <Mail className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-2xl font-serif text-white mb-3">Need more help?</h3>
        <p className="text-sm text-white/60 mb-6">
          If you have active issues with your account or analysis limits, please contact us. Use Settings → Data & Privacy / Feedback if available in the app.
        </p>
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-black/40 border border-white/10 rounded-xl text-white font-mono text-sm">
          support@tradelens.ai
        </div>
        <p className="text-[10px] text-white/30 uppercase tracking-widest mt-4">
          (Placeholder email for support)
        </p>
      </GlassCard>
    </div>
  );
}
