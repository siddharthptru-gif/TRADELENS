import React from 'react';
import { GlassCard } from '../../components/ui/GlassCard';
import { GradientButton } from '../../components/ui/GradientButton';
import { Link } from 'react-router-dom';

export default function Signup() {
  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <GlassCard className="w-full max-w-md p-8">
        <h2 className="text-3xl font-serif text-white mb-2">Join TradeLens</h2>
        <p className="text-muted text-sm mb-8">Create your free account.</p>
        <div className="space-y-4">
          <input type="email" placeholder="Email" className="w-full p-4 rounded-xl bg-black/20 border border-white/5 focus:border-[--color-tradelens-green]/50 outline-none transition-colors text-white" />
          <input type="password" placeholder="Password" className="w-full p-4 rounded-xl bg-black/20 border border-white/5 focus:border-[--color-tradelens-green]/50 outline-none transition-colors text-white" />
          <GradientButton className="w-full mt-2">Create Account</GradientButton>
        </div>
        <p className="mt-6 text-center text-sm text-white/40">
          Already have an account? <Link to="/login" className="text-white hover:text-[--color-tradelens-green] transition-colors">Log in</Link>
        </p>
      </GlassCard>
    </div>
  );
}
