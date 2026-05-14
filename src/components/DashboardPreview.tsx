import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LineChart, Search, Bell, Settings, LayoutDashboard, Briefcase, ActivitySquare, AlertTriangle, ChevronRight } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

gsap.registerPlugin(ScrollTrigger);

export default function DashboardPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.dashboard-panel', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        },
        y: 100,
        rotateX: 10,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out'
      });

      gsap.from('.dash-elem', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 50%',
        },
        x: -20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="product" ref={containerRef} className="py-24 relative bg-[#020403] perspective-scene">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        
        <div className="dashboard-panel glass-panel overflow-hidden shadow-2xl flex flex-col md:flex-row h-[800px] [transform-style:preserve-3d] relative">
          
          {/* Sidebar */}
          <div className="w-full md:w-64 border-r border-white/5 bg-[#020403]/50 p-6 flex flex-col gap-8 hidden md:flex">
            <div className="flex items-center gap-2 text-white font-serif italic text-xl dash-elem">
               <LineChart className="w-5 h-5 text-[--color-tradelens-green]" />
               TradeLens
            </div>

            <div className="space-y-1">
              <div className="text-[10px] uppercase font-mono text-white/30 tracking-wider mb-4 dash-elem">Menu</div>
              {[
                { icon: LayoutDashboard, label: 'Dashboard', active: true },
                { icon: ActivitySquare, label: 'AI Scanner', active: false },
                { icon: Briefcase, label: 'Portfolio', active: false },
                { icon: AlertTriangle, label: 'Risk Alerts', active: false },
              ].map((item, i) => (
                <button key={i} className={`dash-elem flex items-center gap-3 w-full p-3 rounded-xl text-sm transition-colors ${item.active ? 'bg-white/10 text-white' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}>
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </div>

            <div className="mt-auto space-y-1">
              <button className="dash-elem flex items-center gap-3 w-full p-3 rounded-xl text-sm text-white/50 hover:bg-white/5 hover:text-white transition-colors">
                <Bell className="w-4 h-4" /> Notifications
              </button>
              <button className="dash-elem flex items-center gap-3 w-full p-3 rounded-xl text-sm text-white/50 hover:bg-white/5 hover:text-white transition-colors">
                <Settings className="w-4 h-4" /> Settings
              </button>
            </div>
          </div>

          {/* Main Content Areas */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Topbar */}
            <div className="h-20 border-b border-white/5 px-8 flex items-center justify-between bg-black/20 backdrop-blur-md relative z-20">
              <div className="dash-elem text-white font-medium flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[--color-tradelens-green] shadow-[0_0_10px_rgba(140,255,63,0.8)]"></div>
                BTC/USD Analysis
              </div>

              <div className="flex items-center gap-4">
                <div className="dash-elem hidden lg:flex items-center gap-2 bg-[#020403] border border-white/10 rounded-full px-4 py-2">
                  <Search className="w-4 h-4 text-white/40" />
                  <input type="text" placeholder="Search markets..." className="bg-transparent border-none outline-none text-sm text-white placeholder-white/30 w-32 focus:w-48 transition-all" readOnly />
                </div>
                <button className="dash-elem bg-[--color-tradelens-green] text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-[--color-tradelens-green-light] transition-colors">
                  New Scan
                </button>
              </div>
            </div>

            {/* Content splits */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
              
              {/* Chart Area Mock */}
              <div className="flex-1 p-8 border-r border-white/5 relative overflow-hidden flex flex-col">
                <div className="flex items-center justify-between mb-8 dash-elem">
                  <div className="flex gap-2">
                    {['1D', '5D', '1M', '3M', '6M', 'YTD'].map((t, i) => (
                      <button key={t} className={`px-3 py-1 rounded-md text-xs font-mono transition-colors ${i === 2 ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'}`}>
                        {t}
                      </button>
                    ))}
                  </div>
                  <div className="text-xs text-[--color-tradelens-green] font-mono border border-[--color-tradelens-green]/30 bg-[--color-tradelens-green]/10 px-2 py-1 rounded">Live</div>
                </div>

                {/* Abstract Chart Representation */}
                <div className="flex-1 relative flex items-end justify-between gap-1 pb-10">
                  {/* Grid */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:2rem_2rem]"></div>
                  
                  {/* Mock Support Lines */}
                  <div className="absolute left-0 right-0 top-[30%] h-[1px] border-b border-dashed border-[#ff4444]/40">
                    <span className="absolute -top-5 right-0 text-[10px] text-[#ff4444] font-mono">Res: 68,200</span>
                  </div>
                  <div className="absolute left-0 right-0 top-[70%] h-[24px] bg-[--color-tradelens-green]/5 border-y border-[--color-tradelens-green]/20">
                    <span className="absolute -top-5 right-0 text-[10px] text-[--color-tradelens-green-light] font-mono">Sup: 64,320</span>
                  </div>

                  {/* Mock Candles */}
                  {Array.from({length: 40}).map((_, i) => {
                    const isUp = Math.random() > 0.4;
                    const height = 20 + Math.random() * 60;
                    return (
                      <div key={i} className="relative w-full flex justify-center items-end dash-elem z-10" style={{ height: '100%' }}>
                        <div 
                          className={`w-[2px] absolute ${isUp ? 'bg-[--color-tradelens-green]' : 'bg-[#ff4444]'}`}
                          style={{ height: `${height + Math.random()*20}%`, bottom: `${Math.random()*20}%` }}
                        ></div>
                        <div 
                          className={`w-full max-w-[12px] absolute rounded-sm ${isUp ? 'bg-[--color-tradelens-green]' : 'bg-[#ff4444]'}`}
                          style={{ height: `${height}%`, bottom: `${Math.random()*15 + 5}%` }}
                        ></div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* AI Analysis Sidebar */}
              <div className="w-full lg:w-80 bg-[#020403]/30 p-6 flex flex-col gap-6 overflow-y-auto">
                <div className="dash-elem bg-[#050705] border border-white/10 rounded-2xl p-5 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[--color-tradelens-green] to-transparent"></div>
                  <div className="text-[10px] font-mono text-white/40 uppercase mb-1">AI Setup Quality</div>
                  <div className="flex items-end gap-2 mb-4">
                    <span className="text-5xl font-serif text-[--color-tradelens-green]"><AnimatedCounter end={82} duration={2} /></span>
                    <span className="text-sm text-white/40 mb-1">/100</span>
                  </div>
                  <p className="text-xs text-white/60 leading-relaxed font-sans">
                    Setup is printing a high-probability bullish continuation flag above structural support. 
                  </p>
                </div>

                <div className="dash-elem space-y-3">
                  <div className="text-[10px] font-mono text-white/40 uppercase">Detected Parameters</div>
                  
                  {[
                    { l: 'Trend', v: 'Bullish', c: 'text-[--color-tradelens-green]' },
                    { l: 'Pattern', v: 'Bull Flag', c: 'text-white' },
                    { l: 'Risk Level', v: 'Medium', c: 'text-yellow-500' },
                    { l: 'Volume', v: 'Decreasing', c: 'text-white/60' }
                  ].map((p, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 text-sm">
                      <span className="text-white/50">{p.l}</span>
                      <span className={`font-medium ${p.c}`}>{p.v}</span>
                    </div>
                  ))}
                </div>

                <div className="dash-elem mt-auto pt-6">
                  <button className="flex items-center justify-center gap-2 w-full p-4 rounded-xl border border-white/10 hover:bg-white/5 transition-colors text-sm text-white">
                    View Full Educational Report <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
