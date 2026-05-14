import React from 'react';
import { Search, Filter } from 'lucide-react';
import { JournalFilters, JournalSortOption } from '../../types/journal';
import { GlassCard } from '../ui/GlassCard';

interface JournalFilterBarProps {
  filters: JournalFilters;
  setFilters: (filters: JournalFilters) => void;
  sort: JournalSortOption;
  setSort: (sort: JournalSortOption) => void;
}

export function JournalFilterBar({ filters, setFilters, sort, setSort }: JournalFilterBarProps) {
  
  const updateFilter = (k: keyof JournalFilters, v: string) => {
    setFilters({ ...filters, [k]: v });
  };

  return (
    <GlassCard className="p-4 mb-8 flex flex-col xl:flex-row gap-4 items-center justify-between">
      <div className="relative w-full xl:w-64 shrink-0">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
        <input 
          type="text" 
          placeholder="Search symbols, tags, notes..." 
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
            value={filters.result}
            onChange={(e) => updateFilter('result', e.target.value)}
          >
            <option className="bg-black" value="all">Result: All</option>
            <option className="bg-black" value="open">Open / No Result</option>
            <option className="bg-black" value="win">Win</option>
            <option className="bg-black" value="loss">Loss</option>
            <option className="bg-black" value="breakeven">Breakeven</option>
            <option className="bg-black" value="skipped">Skipped</option>
          </select>
        </div>

        <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-xl border border-white/10 shrink-0">
          <select 
            className="bg-transparent text-sm text-white/90 focus:outline-none cursor-pointer"
            value={filters.market}
            onChange={(e) => updateFilter('market', e.target.value)}
          >
            <option className="bg-black" value="all">Markets</option>
            <option className="bg-black" value="stock">Stock</option>
            <option className="bg-black" value="crypto">Crypto</option>
            <option className="bg-black" value="forex">Forex</option>
            <option className="bg-black" value="commodity">Commodity</option>
            <option className="bg-black" value="index">Index</option>
          </select>
        </div>
        
        <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-xl border border-white/10 shrink-0">
          <select 
            className="bg-transparent text-sm text-white/90 focus:outline-none cursor-pointer"
            value={filters.aiStance}
            onChange={(e) => updateFilter('aiStance', e.target.value)}
          >
            <option className="bg-black" value="all">AI Stances</option>
            <option className="bg-black" value="Possible bullish setup">Bullish</option>
            <option className="bg-black" value="Possible bearish setup">Bearish</option>
            <option className="bg-black" value="Wait for confirmation">Need Confirmation</option>
            <option className="bg-black" value="Avoid for now">Avoid</option>
          </select>
        </div>

        <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-xl border border-white/10 shrink-0">
          <select 
            className="bg-transparent text-sm text-white/90 focus:outline-none cursor-pointer"
            value={filters.emotionalState}
            onChange={(e) => updateFilter('emotionalState', e.target.value)}
          >
            <option className="bg-black" value="all">Emotions</option>
            <option className="bg-black" value="calm">Calm</option>
            <option className="bg-black" value="confident">Confident</option>
            <option className="bg-black" value="fearful">Fearful</option>
            <option className="bg-black" value="greedy">Greedy</option>
            <option className="bg-black" value="rushed">Rushed</option>
            <option className="bg-black" value="frustrated">Frustrated</option>
            <option className="bg-black" value="neutral">Neutral</option>
          </select>
        </div>

        <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-xl border border-white/10 shrink-0 xl:ml-auto">
          <span className="text-xs text-white/40">Sort:</span>
          <select 
            className="bg-transparent text-sm text-white/90 focus:outline-none cursor-pointer"
            value={sort}
            onChange={(e) => setSort(e.target.value as JournalSortOption)}
          >
            <option className="bg-black" value="newest">Newest</option>
            <option className="bg-black" value="oldest">Oldest</option>
            <option className="bg-black" value="open-first">Open First</option>
            <option className="bg-black" value="best-r">Best R-Multiple</option>
            <option className="bg-black" value="worst-r">Worst R-Multiple</option>
            <option className="bg-black" value="symbol-asc">Symbol A-Z</option>
          </select>
        </div>
      </div>
    </GlassCard>
  );
}
