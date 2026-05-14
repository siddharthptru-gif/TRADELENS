import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { FormField, MetadataSelect } from './FormElements';
import { UploadMetadata } from '../../hooks/useChartUpload';

interface Props {
  metadata: UploadMetadata;
  onChange: (key: keyof UploadMetadata, value: any) => void;
  disabled: boolean;
}

export function MetadataForm({ metadata, onChange, disabled }: Props) {
  const marketOptions = [
    { label: 'Market Type (Optional)', value: 'unknown' },
    { label: 'Crypto', value: 'crypto' },
    { label: 'Stock', value: 'stock' },
    { label: 'Forex', value: 'forex' },
    { label: 'Commodity', value: 'commodity' },
    { label: 'Index', value: 'index' },
    { label: 'Futures', value: 'futures' }
  ];

  const timeframeOptions = [
    { label: 'Timeframe (Optional)', value: 'unknown' },
    { label: '1 Minute', value: '1m' },
    { label: '3 Minutes', value: '3m' },
    { label: '5 Minutes', value: '5m' },
    { label: '15 Minutes', value: '15m' },
    { label: '30 Minutes', value: '30m' },
    { label: '1 Hour', value: '1h' },
    { label: '4 Hours', value: '4h' },
    { label: 'Daily', value: '1D' },
    { label: 'Weekly', value: '1W' },
    { label: 'Monthly', value: '1M' }
  ];

  const styleOptions = [
    { label: 'Unknown Style', value: 'unknown' },
    { label: 'Scalping', value: 'scalping' },
    { label: 'Intraday', value: 'intraday' },
    { label: 'Swing Trading', value: 'swing' },
    { label: 'Positional', value: 'positional' }
  ];

  const riskOptions = [
    { label: 'Unknown Risk', value: 'unknown' },
    { label: 'Low Risk', value: 'low' },
    { label: 'Medium Risk', value: 'medium' },
    { label: 'High Risk', value: 'high' }
  ];

  return (
    <GlassCard className="p-6">
      <h3 className="text-lg font-serif mb-6">Chart Context</h3>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <MetadataSelect 
          label="Market" 
          options={marketOptions} 
          value={metadata.marketType}
          onChange={e => onChange('marketType', e.target.value)}
          disabled={disabled}
        />
        <MetadataSelect 
          label="Timeframe" 
          options={timeframeOptions} 
          value={metadata.timeframe}
          onChange={e => onChange('timeframe', e.target.value)}
          disabled={disabled}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <FormField 
          label="Symbol (Optional)" 
          placeholder="e.g. BTCUSDT" 
          value={metadata.symbol}
          onChange={e => onChange('symbol', e.target.value.toUpperCase())}
          disabled={disabled}
        />
        <FormField 
          label="Current Price (Optional)" 
          placeholder="e.g. 64320.5" 
          type="number"
          step="any"
          value={metadata.currentPrice}
          onChange={e => onChange('currentPrice', e.target.value)}
          disabled={disabled}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6 pt-4 border-t border-white/5">
        <MetadataSelect 
          label="Trading Style" 
          options={styleOptions} 
          value={metadata.tradingStyle}
          onChange={e => onChange('tradingStyle', e.target.value)}
          disabled={disabled}
        />
        <MetadataSelect 
          label="Risk Profile" 
          options={riskOptions} 
          value={metadata.riskProfile}
          onChange={e => onChange('riskProfile', e.target.value)}
          disabled={disabled}
        />
      </div>

      <div className="mb-6">
        <label className="text-xs font-mono text-white/50 uppercase tracking-widest mb-1.5 block">Trade Idea / Notes (Optional)</label>
        <textarea 
          className="w-full h-24 bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#8CFF3F]/50 transition-colors resize-none disabled:opacity-50"
          placeholder="What are you seeing? E.g., watching for a liquidity sweep below recent support..."
          value={metadata.notes}
          onChange={e => onChange('notes', e.target.value)}
          disabled={disabled}
          maxLength={2000}
        />
        <div className="text-[10px] text-right text-muted mt-1">{metadata.notes.length}/2000</div>
      </div>

      {/* Advanced toggle could go here, but for now we show them directly if requested */}
      <details className="group">
        <summary className="text-xs text-[#8CFF3F] cursor-pointer hover:underline outline-none list-none mb-4 flex items-center gap-1">
          <svg className="w-3 h-3 group-open:rotate-90 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          Advanced Settings
        </summary>
        <div className="grid grid-cols-2 gap-4 pl-4 border-l border-white/10 mt-2">
          <FormField 
            label="Account Size ($)" 
            type="number" 
            placeholder="e.g. 10000"
            value={metadata.accountSize}
            onChange={e => onChange('accountSize', e.target.value)}
            disabled={disabled}
          />
          <FormField 
            label="Risk per Trade (%)" 
            type="number" 
            step="0.1"
            min="0.1"
            max="10"
            placeholder="e.g. 1.5"
            value={metadata.riskPercent}
            onChange={e => onChange('riskPercent', e.target.value)}
            disabled={disabled}
          />
        </div>
      </details>
    </GlassCard>
  );
}
