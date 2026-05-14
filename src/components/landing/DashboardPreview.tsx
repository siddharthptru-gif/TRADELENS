import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { LayoutDashboard, LineChart, ShieldAlert, BookOpen, Settings } from 'lucide-react';
import { CandlestickChartMock } from './CandlestickChartMock';

export function DashboardPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const scoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
        }
      });

      tl.fromTo(dashboardRef.current,
        { rotateX: 18, scale: 0.85, y: 150, opacity: 0 },
        { rotateX: 0, scale: 1, y: 0, opacity: 1, ease: 'power2.out' }
      );

      // Simple score counter
      const scoreObj = { value: 0 };
      tl.to(scoreObj, {
        value: 82,
        ease: 'none',
        onUpdate: () => {
          if (scoreRef.current) {
            scoreRef.current.innerText = Math.round(scoreObj.value).toString() + '%';
          }
        }
      }, 0);

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 bg-[#020403] relative perspective-scene overflow-hidden">
      {/* Background glow behind dashboard */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#8CFF3F] rounded-full blur-[200px] opacity-[0.07] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 mb-20 text-center relative z-20">
        <h2 className="text-4xl md:text-6xl font-serif mb-6 tracking-tight">
          A trading cockpit<br />
          <span className="text-[#8CFF3F] italic">built for clarity.</span>
        </h2>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-20 [transform-style:preserve-3d]">
        <div 
          ref={dashboardRef} 
          className="relative w-full aspect-[4/3] md:aspect-[16/9] glass-panel rounded-xl md:rounded-3xl border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
        >
          {/* Top Bar */}
          <div className="h-12 border-b border-white/5 flex items-center justify-between px-6 bg-white/[0.02]">
             <div className="text-xs text-muted font-mono">Welcome back, Trader</div>
             <div className="flex items-center gap-4">
               <div className="h-6 w-48 bg-black/40 rounded-full border border-white/10 flex items-center px-3">
                 <span className="text-[10px] text-muted">Search symbol...</span>
               </div>
               <div className="h-6 px-3 bg-[#8CFF3F]/10 border border-[#8CFF3F]/20 rounded-full text-[#8CFF3F] text-[10px] font-medium flex items-center">
                 AI Scan Active
               </div>
             </div>
          </div>

          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <div className="hidden md:flex w-48 border-r border-white/5 flex-col py-6 px-4 gap-2 bg-white/[0.01]">
              {[ 
                { i: LayoutDashboard, t: 'Dashboard' }, 
                { i: LineChart, t: 'Chart Analysis' }, 
                { i: ShieldAlert, t: 'Alerts' }, 
                { i: BookOpen, t: 'Trade Journal' },
                { i: Settings, t: 'Settings' } 
              ].map((item, idx) => (
                <div key={idx} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs ${idx === 1 ? 'bg-white/10 text-white' : 'text-muted hover:bg-white/5'}`}>
                  <item.i className="w-4 h-4" />
                  {item.t}
                </div>
              ))}
            </div>

            {/* Main Area */}
            <div className="flex-1 flex flex-col md:flex-row p-4 gap-4 bg-gradient-to-br from-transparent to-black/40">
              
              {/* Chart Panel */}
              <div className="flex-1 border border-white/10 rounded-xl bg-[#020403] relative overflow-hidden flex flex-col">
                <div className="h-10 border-b border-white/10 flex items-center px-4 gap-4">
                  <span className="text-sm font-bold">BTC/USD</span>
                  <span className="text-xs text-[#8CFF3F]">+4.2%</span>
                  <span className="text-xs text-muted">1H</span>
                </div>
                <div className="flex-1 relative">
                  <CandlestickChartMock />
                </div>
              </div>

              {/* AI Right Panel */}
              <div className="w-full md:w-72 flex flex-col gap-4">
                {/* Score Panel */}
                <div className="glass-panel p-4 rounded-xl border-t border-white/20 relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-24 h-24 bg-[#8CFF3F]/20 blur-[30px]"></div>
                   <h4 className="text-xs text-muted uppercase tracking-wider mb-4 border-b border-white/10 pb-2">Analysis Result</h4>
                   <div className="flex justify-between items-end mb-4">
                     <div>
                       <div className="text-[10px] text-muted mb-1">Setup Mode</div>
                       <div className="text-sm font-medium text-white">Bullish Breakout</div>
                     </div>
                     <div className="text-right">
                       <div className="text-[10px] text-[#8CFF3F] mb-1">Confidence</div>
                       <div ref={scoreRef} className="text-2xl font-mono text-white">0%</div>
                     </div>
                   </div>
                   <div className="text-xs text-muted leading-relaxed bg-black/40 p-3 rounded-lg border border-white/5">
                     "Price is compressing near resistance. Wait for candle close confirmation before action."
                   </div>
                </div>

                {/* Risk Panel */}
                <div className="glass-panel p-4 rounded-xl flex-1 border-t border-white/10">
                   <h4 className="text-xs text-muted uppercase tracking-wider mb-4 border-b border-white/10 pb-2">Risk Calculator</h4>
                   <div className="space-y-3">
                     <div className="flex justify-between items-center text-xs">
                       <span className="text-muted">Account Risk</span>
                       <span className="font-mono text-white">$100</span>
                     </div>
                     <div className="flex justify-between items-center text-xs">
                       <span className="text-muted">Suggested SL</span>
                       <span className="font-mono text-[#FF5C7A]">1.5%</span>
                     </div>
                     <div className="flex justify-between items-center text-xs">
                       <span className="text-muted">Est. Reward</span>
                       <span className="font-mono text-[#8CFF3F]">4.2%</span>
                     </div>
                     <div className="mt-4 w-full h-1 bg-white/10 rounded-full overflow-hidden flex">
                       <div className="w-1/4 bg-[#FF5C7A]"></div>
                       <div className="w-3/4 bg-[#8CFF3F]"></div>
                     </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
