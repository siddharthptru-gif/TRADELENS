import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface OutcomeEditorProps {
  initialResult?: string;
  initialRMultiple?: number;
  initialEntry?: number;
  initialExit?: number;
  onSave: (result: string, rMultiple?: number, entry?: number, exit?: number) => void;
}

export function OutcomeEditor({ initialResult, initialRMultiple, initialEntry, initialExit, onSave }: OutcomeEditorProps) {
  const [result, setResult] = useState(initialResult || 'open');
  const [rMultiple, setRMultiple] = useState(initialRMultiple?.toString() || '');
  const [entryPrice, setEntryPrice] = useState(initialEntry?.toString() || '');
  const [exitPrice, setExitPrice] = useState(initialExit?.toString() || '');

  const handleSave = () => {
    onSave(
      result, 
      rMultiple ? parseFloat(rMultiple) : undefined,
      entryPrice ? parseFloat(entryPrice) : undefined,
      exitPrice ? parseFloat(exitPrice) : undefined
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {['open', 'win', 'loss', 'breakeven', 'skipped'].map(res => (
          <button
            key={res}
            onClick={() => setResult(res)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border transition-colors ${
              result === res 
                ? 'bg-white/20 border-white text-white' 
                : 'bg-black border-white/10 text-white/50 hover:bg-white/5'
            }`}
          >
            {res}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-[10px] text-white/40 uppercase tracking-widest mb-1">R-Multiple</label>
          <input 
            type="number" 
            step="0.01"
            value={rMultiple}
            onChange={e => setRMultiple(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-[#8CFF3F]/50 outline-none text-white"
            placeholder="e.g. 2.5"
          />
        </div>
        <div>
          <label className="block text-[10px] text-white/40 uppercase tracking-widest mb-1">Entry Price</label>
          <input 
            type="number" 
            step="any"
            value={entryPrice}
            onChange={e => setEntryPrice(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-[#8CFF3F]/50 outline-none text-white"
            placeholder="0.00"
          />
        </div>
        <div>
          <label className="block text-[10px] text-white/40 uppercase tracking-widest mb-1">Exit Price</label>
          <input 
            type="number" 
            step="any"
            value={exitPrice}
            onChange={e => setExitPrice(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-[#8CFF3F]/50 outline-none text-white"
            placeholder="0.00"
          />
        </div>
      </div>
      
      <div className="flex justify-end">
        <button 
          onClick={handleSave}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-bold tracking-wider flex items-center gap-2 transition-colors uppercase"
        >
          <Check className="w-3.5 h-3.5" /> Save Outcome
        </button>
      </div>
    </div>
  );
}
