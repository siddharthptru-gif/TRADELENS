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
         </div>
         <GradientButton onClick={() => onSave(name)} className="px-6 py-2">
            Save Profile
         </GradientButton>
      </div>
    </GlassCard>
  );
}
