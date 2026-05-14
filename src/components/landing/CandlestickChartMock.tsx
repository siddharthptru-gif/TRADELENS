import React from 'react';
import { cn } from '../../lib/utils';

export function CandlestickChartMock({ className }: { className?: string }) {
  const candles = [
    { type: 'up', height: 40, y: 50, wickTop: 10, wickBottom: 15 },
    { type: 'up', height: 60, y: 30, wickTop: 20, wickBottom: 10 },
    { type: 'down', height: 30, y: 20, wickTop: 5, wickBottom: 20 },
    { type: 'down', height: 50, y: 50, wickTop: 15, wickBottom: 5 },
    { type: 'up', height: 80, y: 40, wickTop: 10, wickBottom: 30 },
    { type: 'up', height: 45, y: 15, wickTop: 25, wickBottom: 10 },
    { type: 'down', height: 70, y: 10, wickTop: 5, wickBottom: 15 },
    { type: 'up', height: 90, y: 30, wickTop: 15, wickBottom: 25 },
    { type: 'up', height: 55, y: 10, wickTop: 20, wickBottom: 5 },
    { type: 'up', height: 110, y: -20, wickTop: 10, wickBottom: 40 },
  ];

  return (
    <div className={cn("relative w-full h-full flex items-end justify-between px-4 pb-12 pt-8", className)}>
      {/* Grid Lines */}
      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="w-full h-[1px] bg-white border-b border-white/10 border-dashed"></div>
        ))}
      </div>
      
      {/* Support Line */}
      <div className="absolute bottom-[25%] left-0 w-full h-[2px] bg-[#8CFF3F]/40 chart-line-glow z-10 pointer-events-none"></div>
      
      {/* Resistance Line */}
      <div className="absolute top-[30%] left-0 w-full h-[2px] bg-[#FF5C7A]/40 filter drop-shadow-[0_0_8px_rgba(255,92,122,0.5)] z-10 pointer-events-none"></div>

      {candles.map((candle, i) => (
        <div key={i} className="relative flex flex-col items-center justify-end w-6 h-full group">
          {/* Wick */}
          <div 
            className={cn("absolute w-[2px] opacity-70", candle.type === 'up' ? 'bg-[#8CFF3F]' : 'bg-[#FF5C7A]')}
            style={{ 
              bottom: `${Math.max(0, 100 - candle.y - candle.height - candle.wickBottom)}%`, 
              height: `${candle.height + candle.wickTop + candle.wickBottom}%` 
            }}
          ></div>
          {/* Body */}
          <div 
            className={cn("relative w-full rounded-sm z-10 transition-all duration-300 group-hover:scale-110", candle.type === 'up' ? 'bg-[#8CFF3F] shadow-[0_0_12px_rgba(140,255,63,0.4)]' : 'bg-[#FF5C7A] shadow-[0_0_12px_rgba(255,92,122,0.4)]')}
            style={{ 
              height: `${candle.height}%`,
              bottom: `${100 - candle.y - candle.height}%`
            }}
          ></div>
          {/* Volume bars (fake) */}
          <div 
            className={cn("absolute bottom-[-30px] w-full opacity-40 rounded-t-sm", candle.type === 'up' ? 'bg-[#8CFF3F]' : 'bg-[#FF5C7A]')}
            style={{ height: `${Math.random() * 20 + 5}px` }}
          ></div>
        </div>
      ))}
    </div>
  );
}
