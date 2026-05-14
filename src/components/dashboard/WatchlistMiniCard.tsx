import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { WatchlistItem } from '../../types/dashboard';
import { Link } from 'react-router-dom';
import { ArrowRight, Eye } from 'lucide-react';

interface Props {
  items: WatchlistItem[];
}

export function WatchlistMiniCard({ items }: Props) {
  if (items.length === 0) {
    return (
      <GlassCard className="p-6 min-h-[200px] flex flex-col justify-center items-center text-center">
        <Eye className="w-8 h-8 text-white/20 mb-3" />
        <h3 className="font-medium mb-2">Watchlist</h3>
        <p className="text-xs text-muted mb-4 max-w-[200px]">Add symbols you are watching to prepare setups.</p>
        <Link to="/watchlist" className="text-xs text-[#8CFF3F] hover:underline flex items-center gap-1">Open Watchlist <ArrowRight className="w-3 h-3"/></Link>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-mono text-white/50 uppercase tracking-widest">Watchlist</h3>
      </div>
      
      <div className="space-y-3 mb-auto">
        {items.slice(0, 4).map(item => (
          <div key={item.id} className="flex justify-between items-center text-sm border-b border-white/5 pb-2 last:border-0 last:pb-0">
            <div>
              <span className="font-medium">{item.symbol}</span>
              <span className="text-[10px] text-muted ml-2">{item.timeframe}</span>
            </div>
            <div className="text-[10px] font-mono text-white/60">
              {item.importantResistance}
            </div>
          </div>
        ))}
      </div>

      <Link to="/watchlist" className="mt-4 pt-4 border-t border-white/5 text-xs text-[#8CFF3F] hover:text-white transition-colors flex items-center justify-between">
        View all {items.length} symbols <ArrowRight className="w-4 h-4" />
      </Link>
    </GlassCard>
  );
}
