import React, { useState } from 'react';
import { Download, Trash2, Database, AlertTriangle } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { SettingsDataCounts } from '../../types/settings';

interface DataPrivacyCardProps {
  counts: SettingsDataCounts;
  onExport: () => void;
  onWipe: () => void;
}

export function DataPrivacyCard({ counts, onExport, onWipe }: DataPrivacyCardProps) {
  const [showWipeConfirm, setShowWipeConfirm] = useState(false);
  const [wipeInput, setWipeInput] = useState('');

  const handleWipe = () => {
    if (wipeInput === 'WIPE MY DATA') {
      onWipe();
      setShowWipeConfirm(false);
      setWipeInput('');
    }
  };

  return (
    <GlassCard className="p-8">
      <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
        <Database className="w-5 h-5 text-blue-400" />
        <h2 className="text-xl font-serif text-white">Data & Privacy</h2>
      </div>

      <p className="text-sm text-white/50 mb-6">
        Your TradeLens data is yours. Download a complete copy of your records or wipe your analysis data.
        Storage cleanup will be handled in a later backend maintenance phase.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
         <CountBox label="Chart scans" count={counts.scansCount} />
         <CountBox label="AI reports" count={counts.reportsCount} />
         <CountBox label="Saved reports" count={counts.savedReportsCount} />
         <CountBox label="Journal entries" count={counts.journalEntriesCount} />
         <CountBox label="Watchlist items" count={counts.watchlistItemsCount} />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/5">
         <button 
           onClick={onExport}
           className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-bold transition-colors"
         >
           <Download className="w-4 h-4" /> Export My Data
         </button>
         
         <button 
           onClick={() => setShowWipeConfirm(true)}
           className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-black border border-[#FF5C7A]/30 text-[#FF5C7A] hover:bg-[#FF5C7A]/10 rounded-xl text-sm font-bold transition-colors"
         >
           <Trash2 className="w-4 h-4" /> Wipe App Data
         </button>
      </div>

      {showWipeConfirm && (
        <div className="mt-6 p-6 bg-[#FF5C7A]/10 rounded-xl border border-[#FF5C7A]/20">
          <div className="flex items-start gap-3 mb-4">
            <AlertTriangle className="w-5 h-5 text-[#FF5C7A] shrink-0 mt-0.5" />
            <div>
               <h4 className="font-bold text-[#FF5C7A] mb-1">Are you absolutely sure?</h4>
               <p className="text-sm text-white/70">
                 This action cannot be undone. This will permanently delete all your uploaded scans, AI reports, saved reports, trading journal entries, and watchlist items.
                 Your account and basic profile settings will not be deleted.
               </p>
            </div>
          </div>
          
          <div className="mt-4">
            <label className="block text-xs text-white/50 mb-2">
              Please type <span className="font-mono text-white">WIPE MY DATA</span> to confirm.
            </label>
            <input 
              type="text"
              value={wipeInput}
              onChange={e => setWipeInput(e.target.value)}
              className="w-full bg-black/40 border border-[#FF5C7A]/30 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#FF5C7A]"
            />
            <div className="flex gap-3 justify-end mt-4">
               <button 
                 onClick={() => { setShowWipeConfirm(false); setWipeInput(''); }}
                 className="px-4 py-2 text-sm text-white/50 hover:text-white"
               >
                 Cancel
               </button>
               <button 
                 onClick={handleWipe}
                 disabled={wipeInput !== 'WIPE MY DATA'}
                 className="px-6 py-2 bg-[#FF5C7A] text-black font-bold text-sm rounded-xl disabled:opacity-50 transition-all"
               >
                 Confirm Wipe
               </button>
            </div>
          </div>
        </div>
      )}

    </GlassCard>
  );
}

function CountBox({ label, count }: { label: string; count: number }) {
  return (
    <div className="bg-black/30 border border-white/5 rounded-xl p-4 text-center">
      <span className="block text-2xl font-bold text-white mb-1">{count}</span>
      <span className="block text-[10px] uppercase tracking-widest text-white/40">{label}</span>
    </div>
  );
}
