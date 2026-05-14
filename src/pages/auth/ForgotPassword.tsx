import React from 'react';
import { GlassCard } from '../../components/ui/GlassCard';
import { GradientButton } from '../../components/ui/GradientButton';

export default function ForgotPassword() {
  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <GlassCard className="w-full max-w-md p-8">
        <h2 className="text-3xl font-serif text-white mb-2">Reset Password</h2>
        <p className="text-muted text-sm mb-8">We'll send you a reset link.</p>
        <div className="space-y-4">
          <input type="email" placeholder="Email address" className="w-full p-4 rounded-xl bg-black/20 border border-white/5 focus:border-[--color-tradelens-green]/50 outline-none transition-colors text-white" />
          <GradientButton className="w-full mt-2">Send Link</GradientButton>
        </div>
      </GlassCard>
    </div>
  );
}
