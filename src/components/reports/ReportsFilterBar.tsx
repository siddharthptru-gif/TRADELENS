import React from 'react';
import { Search, Filter } from 'lucide-react';
import { ReportFilters, ReportSortOption } from '../../types/savedReport';
import { GlassCard } from '../ui/GlassCard';

interface ReportsFilterBarProps {
  filters: ReportFilters;
  setFilters: (filters: ReportFilters) => void;
  sort: ReportSortOption;
  setSort: (sort: ReportSortOption) => void;
}

export function ReportsFilterBar({ filters, setFilters, sort, setSort }: ReportsFilterBarProps) {
  
  const updateFilter = (k: keyof ReportFilters, v: string) => {
    setFilters({ ...filters, [k]: v });
  };

  return (
    <GlassCard className="p-4 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
      <div className="relative w-full md:w-64 shrink-0">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
        <input 
          type="text" 
          placeholder="Search symbols, tags, notes..." 
          value={filters.search}
          onChange={(e) => updateFilter('search', e.target.value)}
          className="w-full bg-black/20 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#8CFF3F]/50 transition-colors"
        />
      </div>

      <div className="w-full md:w-auto flex flex-wrap items-center gap-2 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-xl border border-white/10 shrink-0">
          <Filter className="w-3.5 h-3.5 text-white/50" />
          <select 
            className="bg-transparent text-sm text-white/90 focus:outline-none cursor-pointer"
            value={filters.market}
            onChange={(e) => updateFilter('market', e.target.value)}
          >
            <option className="bg-black" value="all">All Markets</option>
            <option className="bg-black" value="stock">Stock</option>
            <option className="bg-black" value="crypto">Crypto</option>
            <option className="bg-black" value="forex">Forex</option>
            <option className="bg-black" value="commodity">Commodity</option>
            <option className="bg-black" value="index">Index</option>
            <option className="bg-black" value="futures">Futures</option>
          </select>
        </div>

        <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-xl border border-white/10 shrink-0">
          <select 
            className="bg-transparent text-sm text-white/90 focus:outline-none cursor-pointer max-w-[120px]"
            value={filters.stance}
            onChange={(e) => updateFilter('stance', e.target.value)}
          >
            <option className="bg-black" value="all">All Stances</option>
            <option className="bg-black" value="Possible bullish setup">Bullish Setup</option>
            <option className="bg-black" value="Possible bearish setup">Bearish Setup</option>
            <option className="bg-black" value="Wait for confirmation">Needs Confirmation</option>
            <option className="bg-black" value="Watchlist only">Watchlist Only</option>
            <option className="bg-black" value="Avoid for now">Avoid</option>
            <option className="bg-black" value="High-risk setup">High Risk</option>
            <option className="bg-black" value="No clear trade setup">No Setup</option>
          </select>
        </div>

        <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-xl border border-white/10 shrink-0">
          <select 
            className="bg-transparent text-sm text-white/90 focus:outline-none cursor-pointer"
            value={filters.scoreRange}
            onChange={(e) => updateFilter('scoreRange', e.target.value)}
          >
            <option className="bg-black" value="all">Score: All</option>
            <option className="bg-black" value="0-30">0-30</option>
            <option className="bg-black" value="31-50">31-50</option>
            <option className="bg-black" value="51-65">51-65</option>
            <option className="bg-black" value="66-80">66-80</option>
            <option className="bg-black" value="81-90">81-90</option>
            <option className="bg-black" value="91-100">91-100</option>
          </select>
        </div>

        <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-xl border border-white/10 shrink-0 ml-auto md:ml-4">
          <span className="text-xs text-white/40">Sort:</span>
          <select 
            className="bg-transparent text-sm text-white/90 focus:outline-none cursor-pointer"
            value={sort}
            onChange={(e) => setSort(e.target.value as ReportSortOption)}
          >
            <option className="bg-black" value="newest">Newest Saved</option>
            <option className="bg-black" value="oldest">Oldest Saved</option>
            <option className="bg-black" value="highest-score">Highest Score</option>
            <option className="bg-black" value="lowest-score">Lowest Score</option>
            <option className="bg-black" value="highest-confidence">Highest Confidence</option>
            <option className="bg-black" value="symbol-asc">Symbol A-Z</option>
          </select>
        </div>
      </div>
    </GlassCard>
  );
}
