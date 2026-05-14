import React from 'react';
import { Search, Filter } from 'lucide-react';
import { WatchlistFilters, WatchlistSortOption } from '../../types/watchlist';
import { GlassCard } from '../ui/GlassCard';

interface WatchlistFilterBarProps {
  filters: WatchlistFilters;
  setFilters: (filters: WatchlistFilters) => void;
  sort: WatchlistSortOption;
  setSort: (sort: WatchlistSortOption) => void;
}

export function WatchlistFilterBar({ filters, setFilters, sort, setSort }: WatchlistFilterBarProps) {
  
  const updateFilter = (k: keyof WatchlistFilters, v: string) => {
    setFilters({ ...filters, [k]: v });
  };

  return (
    <GlassCard className="p-4 mb-8 flex flex-col xl:flex-row gap-4 items-center justify-between">
      <div className="relative w-full xl:w-64 shrink-0">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
        <input 
          type="text" 
          placeholder="Search symbol, notes..." 
          value={filters.search}
          onChange={(e) => updateFilter('search', e.target.value)}
          className="w-full bg-black/20 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#8CFF3F]/50 transition-colors"
        />
      </div>

      <div className="w-full xl:w-auto flex flex-wrap items-center gap-2 overflow-x-auto no-scrollbar">
        
        <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-xl border border-white/10 shrink-0">
          <Filter className="w-3.5 h-3.5 text-white/50" />
          <select 
            className="bg-transparent text-sm text-white/90 focus:outline-none cursor-pointer"
            value={filters.market}
            onChange={(e) => updateFilter('market', e.target.value)}
          >
            <option className="bg-black" value="all">Market: All</option>
            <option className="bg-black" value="stock">Stock</option>
            <option className="bg-black" value="crypto">Crypto</option>
            <option className="bg-black" value="forex">Forex</option>
            <option className="bg-black" value="commodity">Commodity</option>
            <option className="bg-black" value="index">Index</option>
            <option className="bg-black" value="futures">Futures</option>
            <option className="bg-black" value="unknown">Unknown</option>
          </select>
        </div>

        <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-xl border border-white/10 shrink-0">
          <select 
            className="bg-transparent text-sm text-white/90 focus:outline-none cursor-pointer"
            value={filters.timeframe}
            onChange={(e) => updateFilter('timeframe', e.target.value)}
          >
            <option className="bg-black" value="all">Timeframe: All</option>
            <option className="bg-black" value="1m">1m</option>
            <option className="bg-black" value="3m">3m</option>
            <option className="bg-black" value="5m">5m</option>
            <option className="bg-black" value="15m">15m</option>
            <option className="bg-black" value="30m">30m</option>
            <option className="bg-black" value="1h">1h</option>
            <option className="bg-black" value="4h">4h</option>
            <option className="bg-black" value="1D">1D</option>
            <option className="bg-black" value="1W">1W</option>
            <option className="bg-black" value="1M">1M</option>
            <option className="bg-black" value="unknown">Unknown</option>
          </select>
        </div>
        
        <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-xl border border-white/10 shrink-0">
          <select 
            className="bg-transparent text-sm text-white/90 focus:outline-none cursor-pointer"
            value={filters.linkedReports}
            onChange={(e) => updateFilter('linkedReports', e.target.value)}
          >
            <option className="bg-black" value="all">Linked Reports: All</option>
            <option className="bg-black" value="has-reports">Has Reports</option>
            <option className="bg-black" value="no-reports">No Reports</option>
          </select>
        </div>

        <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-xl border border-white/10 shrink-0">
          <select 
            className="bg-transparent text-sm text-white/90 focus:outline-none cursor-pointer"
            value={filters.levelStatus}
            onChange={(e) => updateFilter('levelStatus', e.target.value)}
          >
            <option className="bg-black" value="all">Levels: All</option>
            <option className="bg-black" value="has-support">Has Support</option>
            <option className="bg-black" value="has-resistance">Has Resistance</option>
            <option className="bg-black" value="missing-levels">Missing Levels</option>
          </select>
        </div>

        <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-xl border border-white/10 shrink-0 xl:ml-auto">
          <span className="text-xs text-white/40">Sort:</span>
          <select 
            className="bg-transparent text-sm text-white/90 focus:outline-none cursor-pointer"
            value={sort}
            onChange={(e) => setSort(e.target.value as WatchlistSortOption)}
          >
            <option className="bg-black" value="recently-updated">Recently Updated</option>
            <option className="bg-black" value="newest">Newest</option>
            <option className="bg-black" value="oldest">Oldest</option>
            <option className="bg-black" value="symbol-asc">Symbol A-Z</option>
            <option className="bg-black" value="most-linked">Most Linked Reports</option>
            <option className="bg-black" value="highest-score">Highest Score</option>
            <option className="bg-black" value="lowest-score">Lowest Score</option>
          </select>
        </div>
      </div>
    </GlassCard>
  );
}
