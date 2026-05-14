import React, { useRef, useEffect } from 'react';
import { cn } from '../lib/utils';
import gsap from 'gsap';

export default function CandlestickChartMock({ className }: { className?: string }) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.candle-draw', 
        { scaleY: 0, opacity: 0 }, 
        { scaleY: 1, opacity: 1, duration: 0.5, stagger: 0.05, ease: "back.out(1.2)" }
      );
      gsap.fromTo('.mock-line',
        { scaleX: 0 },
        { scaleX: 1, duration: 1.5, ease: "power2.indc", delay: 0.5 }
      );
    }, chartRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={chartRef} className={cn("relative w-full h-[300px] flex items-end justify-between px-4 pb-12 pt-6 border-b border-l border-white/10", className)}>
      {/* Grid */}
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 opacity-10 pointer-events-none">
        {[...Array(24)].map((_, i) => <div key={i} className="border-r border-t border-white/20"></div>)}
      </div>

      {/* Candlesticks */}
      {[...Array(16)].map((_, i) => {
        const height = Math.random() * 60 + 20;
        const isGreen = Math.random() > 0.4;
        const offset = Math.random() * 40;
        return (
          <div key={i} className="candle-draw relative flex flex-col items-center justify-end" style={{ height: `${height + offset}%`, width: '12px' }}>
             <div className={cn("absolute w-[1px] h-[120%] top-[-10%]", isGreen ? "bg-[--color-tradelens-green]" : "bg-red-500")} />
             <div className={cn("relative w-full rounded-sm z-10", isGreen ? "bg-[--color-tradelens-green]" : "bg-red-500")} style={{ height: `${height}%` }} />
             {/* Volume bar */}
             <div className={cn("absolute -bottom-10 w-full rounded-t-sm opacity-40", isGreen ? "bg-[--color-tradelens-green]" : "bg-red-500")} style={{ height: `${Math.random() * 30 + 10}px` }}></div>
          </div>
        );
      })}

      {/* Support / Resistance Lines */}
      <div className="mock-line absolute bottom-[40%] left-0 w-full h-[1px] bg-[--color-tradelens-green]/50 chart-line-glow origin-left stroke-dasharray-4"></div>
      <div className="mock-line absolute bottom-[70%] left-0 w-full h-[1px] bg-red-500/50 chart-line-glow origin-left stroke-dasharray-4"></div>
      
      {/* Fake UI Overlay */}
      <div className="absolute right-2 top-2 text-[10px] font-mono text-white/50 flex flex-col gap-1 items-end">
         <span>R: 68,200</span>
         <span>S: 64,320</span>
      </div>
    </div>
  );
}
