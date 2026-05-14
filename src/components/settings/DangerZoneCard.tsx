import React, { useState } from 'react';
import { AlertCircle, LogOut } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

interface DangerZoneCardProps {
  onSignOut: () => void;
  onDeleteAccount: () => void;
}

export function DangerZoneCard({ onSignOut, onDeleteAccount }: DangerZoneCardProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteInput, setDeleteInput] = useState('');

  const handleDelete = () => {
    if (deleteInput === 'DELETE MY ACCOUNT') {
      onDeleteAccount();
      setShowDeleteConfirm(false);
    }
  };

  return (
    <GlassCard className="p-8 border-red-500/20 bg-red-500/5">
      <div className="flex items-center gap-3 mb-6 border-b border-red-500/20 pb-4">
        <AlertCircle className="w-5 h-5 text-red-500" />
        <h2 className="text-xl font-serif text-red-500">Danger Zone</h2>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-black/40 rounded-xl border border-white/5">
          <div>
            <h4 className="text-white font-bold mb-1">Sign Out</h4>
            <p className="text-xs text-white/50">Securely end your current session.</p>
          </div>
          <button 
            onClick={onSignOut}
            className="flex items-center justify-center gap-2 px-6 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 p-4 bg-red-500/10 rounded-xl border border-red-500/20">
          <div className="flex-1">
            <h4 className="text-red-400 font-bold mb-1">Delete Account</h4>
            <p className="text-xs text-red-400/70 mb-4 max-w-sm leading-relaxed">
              Permanently delete your account, active subscription, profile, and all generated app data. This action is irreversible.
            </p>

            {showDeleteConfirm ? (
              <div className="mt-4 border-t border-red-500/20 pt-4">
                <label className="block text-xs text-red-400/70 mb-2">
                  Please type <span className="font-mono text-red-400 font-bold">DELETE MY ACCOUNT</span> to confirm.
                </label>
                <input 
                  type="text"
                  value={deleteInput}
                  onChange={e => setDeleteInput(e.target.value)}
                  className="w-full bg-black/40 border border-red-500/30 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-red-500 mb-4"
                />
                <div className="flex gap-3">
                   <button 
                     onClick={() => { setShowDeleteConfirm(false); setDeleteInput(''); }}
                     className="px-4 py-2 text-sm text-white/50 hover:text-white"
                   >
                     Cancel
                   </button>
                   <button 
                     onClick={handleDelete}
                     disabled={deleteInput !== 'DELETE MY ACCOUNT'}
                     className="px-6 py-2 bg-red-500 text-white font-bold text-sm rounded-xl disabled:opacity-50 transition-all hover:bg-red-600"
                   >
                     Confirm Deletion
                   </button>
                </div>
              </div>
            ) : (
                <button 
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-6 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-500 rounded-lg text-sm font-bold transition-colors border border-red-500/30"
                >
                  Delete Account
                </button>
            )}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
