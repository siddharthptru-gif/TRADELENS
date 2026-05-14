import React, { useState } from 'react';
import { Target, Sliders } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { SettingsUserProfile } from '../../types/settings';
import { GradientButton } from '../ui/GradientButton';

interface TradingPreferencesCardProps {
  profile: SettingsUserProfile;
  onSave: (experience: string, markets: string[], style: string, risk: string) => void;
}

export function TradingPreferencesCard({ profile, onSave }: TradingPreferencesCardProps) {
  const [experience, setExperience] = useState(profile.experienceLevel || 'unknown');
  const [markets, setMarkets] = useState<string[]>(profile.preferredMarkets || []);
  const [style, setStyle] = useState(profile.tradingStyle || 'unknown');
  const [risk, setRisk] = useState(profile.riskProfile || 'unknown');

  const toggleMarket = (m: string) => {
    setMarkets(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m]);
  };

  return (
    <GlassCard className="p-8 mb-6">
      <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
        <Target className="w-5 h-5 text-purple-400" />
        <h2 className="text-xl font-serif text-white">Trading Preferences</h2>
      </div>

      <div className="space-y-8 mb-8">
        <div>
           <label className="block text-[10px] text-white/40 uppercase tracking-widest mb-3">Experience Level</label>
           <ChipGroup options={['beginner', 'intermediate', 'advanced']} selected={[experience]} onSelect={(val) => setExperience(val)} single />
        </div>

        <div>
           <label className="block text-[10px] text-white/40 uppercase tracking-widest mb-3">Preferred Markets (Multi)</label>
           <ChipGroup options={['crypto', 'stocks', 'forex', 'commodities', 'indices', 'futures']} selected={markets} onSelect={toggleMarket} />
        </div>

        <div>
           <label className="block text-[10px] text-white/40 uppercase tracking-widest mb-3">Trading Style</label>
           <ChipGroup options={['scalping', 'intraday', 'swing', 'positional', 'unknown']} selected={[style]} onSelect={setStyle} single />
        </div>

        <div>
           <label className="block text-[10px] text-white/40 uppercase tracking-widest mb-3">Risk Profile</label>
           <ChipGroup options={['low', 'medium', 'high', 'unknown']} selected={[risk]} onSelect={setRisk} single />
        </div>
      </div>

      <div className="flex justify-end pt-6 border-t border-white/5">
        <GradientButton onClick={() => onSave(experience, markets, style, risk)} className="px-6 py-2">
           Save Preferences
        </GradientButton>
      </div>
    </GlassCard>
  );
}

interface AnalysisDefaultsCardProps {
  profile: SettingsUserProfile;
  onSave: (marketType: string, timeframe: string, preferences: any) => void;
}

export function AnalysisDefaultsCard({ profile, onSave }: AnalysisDefaultsCardProps) {
  const [marketType, setMarketType] = useState(profile.defaultMarketType || 'unknown');
  const [timeframe, setTimeframe] = useState(profile.defaultTimeframe || 'unknown');
  const [showPos, setShowPos] = useState(profile.preferences?.showPositionSizing ?? false);
  const [showSmc, setShowSmc] = useState(profile.preferences?.showSmcConcepts ?? false);

  return (
    <GlassCard className="p-8">
      <div className="flex items-center gap-3 mb-4">
        <Sliders className="w-5 h-5 text-blue-400" />
        <h2 className="text-xl font-serif text-white">Analysis Defaults</h2>
      </div>
      <p className="text-sm text-white/40 mb-8 border-b border-white/5 pb-4">
        These defaults help prefill upload metadata. The AI still analyzes exactly what is visible in your chart.
      </p>

      <div className="space-y-8 mb-8">
        <div>
           <label className="block text-[10px] text-white/40 uppercase tracking-widest mb-3">Default Upload Market</label>
           <ChipGroup options={['stock', 'crypto', 'forex', 'commodity', 'index', 'futures', 'unknown']} selected={[marketType]} onSelect={setMarketType} single />
        </div>

        <div>
           <label className="block text-[10px] text-white/40 uppercase tracking-widest mb-3">Default Upload Timeframe</label>
           <ChipGroup options={['1m', '3m', '5m', '15m', '30m', '1h', '4h', '1D', '1W', '1M', 'unknown']} selected={[timeframe]} onSelect={setTimeframe} single />
        </div>

        <div className="flex flex-col gap-4">
           <label className="block text-[10px] text-white/40 uppercase tracking-widest mb-1">Report Preferences</label>
           <label className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${showPos ? 'bg-[#8CFF3F] border-[#8CFF3F]' : 'bg-black/40 border-white/20 group-hover:border-white/40'}`}>
                 {showPos && <div className="w-2 h-2 bg-black rounded-sm" />}
              </div>
              <span className="text-sm text-white/80 group-hover:text-white transition-colors">Show Position Sizing templates in reports</span>
           </label>
           <label className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${showSmc ? 'bg-[#8CFF3F] border-[#8CFF3F]' : 'bg-black/40 border-white/20 group-hover:border-white/40'}`}>
                 {showSmc && <div className="w-2 h-2 bg-black rounded-sm" />}
              </div>
              <span className="text-sm text-white/80 group-hover:text-white transition-colors">Emphasize Smart Money Concepts (SMC) where applicable</span>
           </label>
        </div>
      </div>

      <div className="flex justify-end pt-6 border-t border-white/5">
        <GradientButton onClick={() => onSave(marketType, timeframe, { showPositionSizing: showPos, showSmcConcepts: showSmc })} className="px-6 py-2">
           Save Defaults
        </GradientButton>
      </div>
    </GlassCard>
  );
}

function ChipGroup({ options, selected, onSelect, single }: { options: string[], selected: string[], onSelect: (v: string) => void, single?: boolean }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => {
        const isSel = selected.includes(opt);
        return (
          <button
            key={opt}
            onClick={() => onSelect(opt)}
            className={`px-4 py-1.5 rounded-lg text-xs font-mono uppercase tracking-widest transition-all ${
              isSel 
                ? 'bg-[#8CFF3F] text-black font-bold' 
                : 'bg-white/5 text-white/50 border border-white/10 hover:bg-white/10 hover:text-white'
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
