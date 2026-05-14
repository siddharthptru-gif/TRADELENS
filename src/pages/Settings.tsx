import React from 'react';
import { GlassCard } from '../components/ui/GlassCard';

export default function Settings() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-serif mb-8">Settings</h1>
      <GlassCard className="p-8 mb-6">
        <h3 className="text-xl font-serif mb-4">Profile</h3>
        <p className="text-white/40 text-sm">Account details will appear here.</p>
      </GlassCard>
      <GlassCard className="p-8 border-red-500/20">
        <h3 className="text-xl font-serif text-red-400 mb-4">Danger Zone</h3>
      </GlassCard>
    </div>
  );
}
