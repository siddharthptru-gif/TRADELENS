import React from 'react';
import { cn } from '../../lib/utils';
import { GlassCard } from './Shared';

const sections = [
  { id: 'summary', name: 'Quick Summary' },
  { id: 'visible-info', name: 'Visible Information' },
  { id: 'quality', name: 'Screenshot Quality' },
  { id: 'trend', name: 'Trend Analysis' },
  { id: 'structure', name: 'Market Structure' },
  { id: 'candlestick', name: 'Candlestick Analysis' },
  { id: 'price-action', name: 'Price Action Reading' },
  { id: 'sr-zones', name: 'Support & Resistance' },
  { id: 'supply-demand', name: 'Supply & Demand' },
  { id: 'smart-money', name: 'Smart Money Clues' },
  { id: 'patterns', name: 'Pattern Detection' },
  { id: 'volume', name: 'Volume / Indicators' },
  { id: 'mtf', name: 'Multi-Timeframe Context' },
  { id: 'scen-bull', name: 'Bullish Scenario' },
  { id: 'scen-bear', name: 'Bearish Scenario' },
  { id: 'scen-neu', name: 'Neutral Scenario' },
  { id: 'risk', name: 'Risk & Invalidation' },
  { id: 'score', name: 'Trade Quality Score' },
  { id: 'checklist', name: 'Confirmation Checklist' },
  { id: 'avoid', name: 'Avoid Conditions' },
  { id: 'bias', name: 'If I Were Analyzing' },
  { id: 'verdict', name: 'Final Verdict' },
  { id: 'disclaimer', name: 'Disclaimer' }
];

export function ReportTOC({ activeId = '' }: { activeId?: string }) {
  const scrollTo = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto hidden lg:block w-64 shrink-0 no-scrollbar pr-4">
      <h3 className="text-xs font-mono text-white/50 uppercase tracking-widest mb-6 px-3">Table of Contents</h3>
      <nav className="space-y-1 border-l border-white/10 pl-3">
        {sections.map(s => {
          const isActive = activeId === s.id;
          return (
            <a 
              key={s.id} 
              href={`#${s.id}`} 
              onClick={(e) => scrollTo(s.id, e)}
              className={cn(
                "block text-xs py-1.5 px-3 rounded-lg transition-colors",
                isActive ? "text-[#8CFF3F] bg-[#8CFF3F]/10 font-medium" : "text-white/40 hover:text-white hover:bg-white/5"
              )}
            >
              {s.name}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
