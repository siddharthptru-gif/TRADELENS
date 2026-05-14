import React, { useState } from 'react';
import { User, Activity, Calendar } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { SettingsUserRecord, SettingsSubscription, SettingsUsageLimits } from '../../types/settings';
import { GradientButton } from '../ui/GradientButton';
import { useNavigate } from 'react-router-dom';

interface ProfileSettingsCardProps {
  userRecord: SettingsUserRecord;
  onSave: (displayName: string) => void;
}

export function ProfileSettingsCard({ userRecord, onSave }: ProfileSettingsCardProps) {
  const [name, setName] = useState(userRecord.displayName || '');

  return (
    <GlassCard className="p-8">
      <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
        <User className="w-5 h-5 text-[#8CFF3F]" />
        <h2 className="text-xl font-serif text-white">Profile Information</h2>
      </div>

      <div className="flex flex-col sm:flex-row gap-8 items-start mb-8">
        <div className="w-24 h-24 rounded-full bg-black/40 border border-white/10 overflow-hidden shrink-0 flex items-center justify-center">
          {userRecord.photoURL ? (
            <img src={userRecord.photoURL} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <User className="w-10 h-10 text-white/20" />
          )}
        </div>
        
        <div className="flex-1 space-y-4 w-full">
           <div>
             <label className="block text-[10px] text-white/40 uppercase tracking-widest mb-1">Email (Read Only)</label>
             <input type="email" value={userRecord.email} disabled className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-2 text-sm text-white/50 cursor-not-allowed" />
           </div>
           <div>
             <label className="block text-[10px] text-white/40 uppercase tracking-widest mb-1">Display Name</label>
             <input 
               type="text" 
               value={name} 
               onChange={e => setName(e.target.value)} 
               className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#8CFF3F]/50 transition-colors" 
             />
           </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-white/5 gap-4">
         <div className="flex gap-4">
            <div className="text-xs text-white/40 font-mono">
              <span className="block mb-1 text-[10px] uppercase tracking-widest text-white/20">Member Since</span>
              {new Date(userRecord.createdAt).toLocaleDateString()}
            </div>
            <div className="text-xs text-white/40 font-mono">
              <span className="block mb-1 text-[10px] uppercase tracking-widest text-white/20">Current Plan</span>
              <span className="text-[#8CFF3F] uppercase tracking-wider">{userRecord.plan}</span>
            </div>
         </div>
         <GradientButton onClick={() => onSave(name)} className="px-6 py-2">
            Save Profile
         </GradientButton>
      </div>
    </GlassCard>
  );
}

interface SubscriptionUsageCardProps {
  subscription: SettingsSubscription | null;
  usageLimits: SettingsUsageLimits | null;
}

export function SubscriptionUsageCard({ subscription, usageLimits }: SubscriptionUsageCardProps) {
  const navigate = useNavigate();

  if (!usageLimits) {
    return (
      <GlassCard className="p-8">
        <h2 className="text-xl font-serif text-white mb-4">Subscription & Usage</h2>
        <p className="text-sm text-white/50">Usage data is being prepared.</p>
      </GlassCard>
    );
  }

  const dailyPct = Math.min(100, Math.round((usageLimits.dailyUsed / usageLimits.dailyLimit) * 100)) || 0;
  const monthlyPct = Math.min(100, Math.round((usageLimits.monthlyUsed / usageLimits.monthlyLimit) * 100)) || 0;

  return (
    <GlassCard className="p-8">
      <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
         <div className="flex items-center gap-3">
           <Activity className="w-5 h-5 text-[#8CFF3F]" />
           <h2 className="text-xl font-serif text-white">Subscription & Usage</h2>
         </div>
         <span className="px-3 py-1 bg-[#8CFF3F]/10 border border-[#8CFF3F]/20 text-[#8CFF3F] rounded uppercase text-[10px] tracking-widest font-bold">
           {usageLimits.plan}
         </span>
      </div>

      <div className="grid sm:grid-cols-2 gap-8 mb-8">
         <div className="bg-black/20 p-5 rounded-2xl border border-white/5">
            <div className="flex justify-between items-end mb-4">
               <div>
                  <span className="block text-[10px] text-white/40 uppercase tracking-widest mb-1">Daily Scans</span>
                  <span className="text-2xl font-bold text-white">{usageLimits.dailyUsed} <span className="text-sm text-white/30 font-normal">/ {usageLimits.dailyLimit}</span></span>
               </div>
               <span className="text-xs font-mono text-white/40 text-right">
                 Resets in {Math.max(0, Math.ceil((usageLimits.dailyResetAt - Date.now()) / 3600000))}h
               </span>
            </div>
            <div className="h-2 w-full bg-black rounded-full overflow-hidden">
               <div className="h-full bg-[#8CFF3F] rounded-full" style={{ width: `${dailyPct}%` }} />
            </div>
         </div>

         <div className="bg-black/20 p-5 rounded-2xl border border-white/5">
            <div className="flex justify-between items-end mb-4">
               <div>
                  <span className="block text-[10px] text-white/40 uppercase tracking-widest mb-1">Monthly Scans</span>
                  <span className="text-2xl font-bold text-white">{usageLimits.monthlyUsed} <span className="text-sm text-white/30 font-normal">/ {usageLimits.monthlyLimit}</span></span>
               </div>
               <span className="text-xs font-mono text-white/40 text-right flex items-center gap-1">
                 <Calendar className="w-3 h-3" />
                 {new Date(usageLimits.monthlyResetAt).toLocaleDateString()}
               </span>
            </div>
            <div className="h-2 w-full bg-black rounded-full overflow-hidden">
               <div className="h-full bg-blue-400 rounded-full" style={{ width: `${monthlyPct}%` }} />
            </div>
         </div>
      </div>

      <div className="flex justify-end pt-6 border-t border-white/5">
         <button onClick={() => navigate('/pricing')} className="px-6 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-medium transition-colors border border-white/10">
           View Upgrade Options
         </button>
      </div>

    </GlassCard>
  );
}
