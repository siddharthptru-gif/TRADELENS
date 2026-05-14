import React from 'react';
import { GlassCard } from '../ui/GlassCard';

export function TradingGlossary() {
  const terms = [
    { term: "Candlestick", def: "A chart element showing open, high, low, and close prices for a specific time period." },
    { term: "Wick", def: "The thin line above or below a candlestick body showing the high and low price pushed during that period." },
    { term: "Support", def: "A price level where a downtrend tends to pause due to a concentration of demand (buying interest)." },
    { term: "Resistance", def: "A price level where an uptrend tends to pause due to a concentration of supply (selling interest)." },
    { term: "Trend", def: "The general direction of the market (uptrend or downtrend)." },
    { term: "Market Structure", def: "The sequence of highs and lows that define the trend." },
    { term: "HH / HL / LH / LL", def: "Higher High, Higher Low (Uptrend) / Lower High, Lower Low (Downtrend)." },
    { term: "BOS (Break of Structure)", def: "When price breaks past a previous high (in an uptrend) or low (in a downtrend), continuing the trend." },
    { term: "CHoCH (Change of Character)", def: "The first sign of a potential trend reversal." },
    { term: "Supply Zone", def: "An area where strong selling previously occurred." },
    { term: "Demand Zone", def: "An area where strong buying previously occurred." },
    { term: "Liquidity Sweep", def: "When price temporarily breaks a key level to trigger stop-losses before reversing." },
    { term: "FVG (Fair Value Gap)", def: "An imbalance in price action leaving a 'gap' where only buying or selling occurred." },
    { term: "Order Block", def: "The last candle before a strong structural move, often defended later by institutions." },
    { term: "Breakout", def: "Price moving outside a defined support/resistance level with increased volume." },
    { term: "Retest", def: "Price returning to a broken level to confirm it has flipped (e.g., resistance becoming support)." },
    { term: "Fakeout", def: "A false breakout where price fails to sustain the move and reverses." },
    { term: "Invalidation", def: "The exact price level where your trade idea is proven structurally wrong." },
    { term: "Risk/Reward", def: "The ratio of potential loss to potential gain." },
    { term: "Confirmation", def: "Waiting for a candle close, pattern, or volume to validate a setup before entering." },
    { term: "Volume", def: "The number of shares/contracts traded during a given timeframe." },
    { term: "Multi-timeframe Analysis", def: "Looking at higher timeframes for trend and lower timeframes for precise entries." }
  ];

  return (
    <div className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif text-white mb-4">Trading Glossary</h2>
        <p className="text-white/60 text-sm max-w-2xl mx-auto">
          Common terminology used by TradeLens AI in its reports. These definitions are simplified for educational purposes.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {terms.map((item, i) => (
          <GlassCard key={i} className="p-5 hover:bg-white/5 transition-colors">
            <h4 className="text-[#8CFF3F] font-mono font-bold text-sm mb-2 uppercase tracking-widest">{item.term}</h4>
            <p className="text-sm text-white/70 leading-relaxed">{item.def}</p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
