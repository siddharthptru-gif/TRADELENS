import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { WatchlistItem } from '../../types/watchlist';

interface WatchlistEditorModalProps {
  initialData?: Partial<WatchlistItem>;
  onSave: (data: Pick<WatchlistItem, 'symbol' | 'market' | 'timeframe' | 'importantSupport' | 'importantResistance' | 'notes'>) => void;
  onClose: () => void;
}

export function WatchlistEditorModal({ initialData, onSave, onClose }: WatchlistEditorModalProps) {
  const [symbol, setSymbol] = useState(initialData?.symbol || '');
  const [market, setMarket] = useState(initialData?.market || 'stock');
  const [timeframe, setTimeframe] = useState(initialData?.timeframe || '1D');
  const [importantSupport, setImportantSupport] = useState(initialData?.importantSupport || '');
  const [importantResistance, setImportantResistance] = useState(initialData?.importantResistance || '');
  const [notes, setNotes] = useState(initialData?.notes || '');
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!symbol.trim()) {
      setError('Symbol is required');
      return;
    }
    if (symbol.length > 24) {
       setError('Symbol max length is 24');
       return;
    }
    if (importantSupport.length > 40) {
      setError('Support level max length is 40');
      return;
    }
    if (importantResistance.length > 40) {
      setError('Resistance level max length is 40');
      return;
    }
    if (notes.length > 1000) {
      setError('Notes max length is 1000');
      return;
    }
    
    setError('');
    onSave({
      symbol: symbol.trim(),
      market,
      timeframe,
      importantSupport: importantSupport.trim(),
      importantResistance: importantResistance.trim(),
      notes: notes.trim()
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm sm:items-stretch sm:justify-end">
      <div className="w-full max-w-md bg-[#020403] border-l border-white/10 shadow-2xl relative flex flex-col h-full rounded-2xl sm:rounded-none sm:h-auto overflow-hidden animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/40">
          <h2 className="text-xl font-serif text-white">{initialData?.watchlistId ? 'Edit' : 'Add to'} Watchlist</h2>
          <button onClick={onClose} className="p-2 text-white/40 hover:text-white bg-white/5 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
          
          {error && (
            <div className="p-3 rounded-xl bg-[#FF5C7A]/10 border border-[#FF5C7A]/20 text-[#FF5C7A] text-xs font-mono">
               {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] text-white/40 uppercase tracking-widest mb-1">Symbol *</label>
              <input 
                type="text" 
                value={symbol}
                onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                placeholder="e.g. BTCUSDT"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8CFF3F]/50 transition-colors text-white font-bold tracking-wider"
                maxLength={24}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] text-white/40 uppercase tracking-widest mb-1">Market *</label>
                <select 
                  value={market}
                  onChange={(e) => setMarket(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8CFF3F]/50 transition-colors text-white/90"
                >
                  <option value="stock">Stock</option>
                  <option value="crypto">Crypto</option>
                  <option value="forex">Forex</option>
                  <option value="commodity">Commodity</option>
                  <option value="index">Index</option>
                  <option value="futures">Futures</option>
                  <option value="unknown">Unknown</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] text-white/40 uppercase tracking-widest mb-1">Timeframe *</label>
                <select 
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8CFF3F]/50 transition-colors text-white/90"
                >
                  <option value="1m">1m</option>
                  <option value="3m">3m</option>
                  <option value="5m">5m</option>
                  <option value="15m">15m</option>
                  <option value="30m">30m</option>
                  <option value="1h">1h</option>
                  <option value="4h">4h</option>
                  <option value="1D">1D</option>
                  <option value="1W">1W</option>
                  <option value="1M">1M</option>
                  <option value="unknown">Unknown</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-[10px] text-[#8CFF3F] uppercase tracking-widest mb-1">Important Support</label>
                <input 
                  type="text" 
                  value={importantSupport}
                  onChange={(e) => setImportantSupport(e.target.value)}
                  placeholder="e.g. 150.25 (Daily S1)"
                  className="w-full bg-[#8CFF3F]/5 border border-[#8CFF3F]/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8CFF3F]/50 transition-colors text-white font-mono"
                  maxLength={40}
                />
              </div>
              <div>
                <label className="block text-[10px] text-[#FF5C7A] uppercase tracking-widest mb-1">Important Resistance</label>
                <input 
                  type="text" 
                  value={importantResistance}
                  onChange={(e) => setImportantResistance(e.target.value)}
                  placeholder="e.g. 165.00 (Weekly Top)"
                  className="w-full bg-[#FF5C7A]/5 border border-[#FF5C7A]/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF5C7A]/50 transition-colors text-white font-mono"
                  maxLength={40}
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] text-white/40 uppercase tracking-widest mb-1 mt-4">Notes</label>
              <textarea 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Key setup criteria, catalyst, or reminders..."
                className="w-full h-32 bg-black/40 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-[#8CFF3F]/50 transition-colors text-white resize-none"
                maxLength={1000}
              />
              <div className="text-right mt-1">
                <span className="text-[10px] text-white/30 font-mono">{notes.length}/1000</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-black/40 flex justify-end gap-3 mt-auto">
          <button onClick={onClose} className="px-6 py-2 rounded-xl text-sm font-bold text-white/50 hover:text-white transition-colors">
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2 bg-[#8CFF3F] text-black rounded-xl text-sm font-bold hover:bg-[#7AE636] transition-colors"
          >
             Save Watchlist Item
          </button>
        </div>

      </div>
    </div>
  );
}
