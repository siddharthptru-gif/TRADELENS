import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ImagePlus, ChevronRight, RefreshCw, BarChart, FileImage, ShieldCheck } from 'lucide-react';
import GlassCard from './GlassCard';
import AnimatedCounter from './AnimatedCounter';

gsap.registerPlugin(ScrollTrigger);

export default function UploadDemo() {
  const [loadingStep, setLoadingStep] = useState(-1);
  const resultRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const steps = [
    "Reading candles...",
    "Detecting structure...",
    "Mapping support/resistance...",
    "Calculating risk...",
    "Analysis ready."
  ];

  const handleSimulate = () => {
    if(loadingStep > -1 && loadingStep < steps.length) return;
    setLoadingStep(0);
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
       gsap.from('.upload-demo-card', {
         scrollTrigger: {
           trigger: sectionRef.current,
           start: 'top 60%'
         },
         y: 40,
         opacity: 0,
         duration: 0.8,
         stagger: 0.2
       });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (loadingStep >= 0 && loadingStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setLoadingStep(s => s + 1);
      }, 800);
      return () => clearTimeout(timer);
    } else if (loadingStep === steps.length - 1) {
      // Show results
      if (resultRef.current) {
        gsap.fromTo(resultRef.current.children, 
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 }
        );
        
        // Progress ring animation
        gsap.fromTo('.score-ring', 
          { strokeDasharray: '0, 100' },
          { strokeDasharray: '82, 100', duration: 1.5, ease: 'power2.out', delay: 0.5 }
        );
      }
    }
  }, [loadingStep, steps.length]);

  return (
    <section ref={sectionRef} className="py-32 relative bg-[#020403] perspective-scene">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none"></div>
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="mb-20 text-center md:text-left">
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-4">
            Drop a chart. <br className="hidden md:block" /><span className="italic text-white/50">Get instant structure.</span>
          </h2>
          <p className="text-white/40 font-sans max-w-xl">Try the interactive demo to see how TradeLens processes a generic candlestick chart screenshot.</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          
          {/* Left: Upload Zone */}
          <div className="lg:col-span-2">
            <GlassCard 
              className="upload-demo-card border-dashed hover:border-solid hover:border-[--color-tradelens-green]/50 p-12 flex flex-col items-center justify-center text-center transition-all cursor-pointer min-h-[450px] group relative"
              glow
            >
              <div className="absolute inset-0 z-10" onClick={handleSimulate}></div>
              {/* Background scanning effect during load */}
              {loadingStep >= 0 && loadingStep < steps.length - 1 && (
                <div className="absolute top-0 left-0 w-full h-[2px] bg-[--color-tradelens-green] shadow-[0_0_20px_rgba(140,255,63,0.8)] [animation:scan_2s_ease-in-out_infinite_alternate] z-0 pointer-events-none"></div>
              )}

              <style>{`
                @keyframes scan {
                  0% { top: 0; }
                  100% { top: 100%; }
                }
              `}</style>

              {loadingStep === -1 ? (
                <div className="relative z-20 pointer-events-none">
                  <div className="w-20 h-20 bg-black/50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform mx-auto">
                    <ImagePlus className="w-10 h-10 text-white/50 group-hover:text-[--color-tradelens-green] transition-colors" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">Upload candlestick screenshot</h3>
                  <p className="text-sm text-white/40 mb-8">Supported: PNG, JPG, WEBP</p>
                  <button className="bg-white/10 text-white px-6 py-3 rounded-full text-sm font-medium transition-colors flex items-center gap-2 mx-auto">
                    Try Sample Chart <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center relative z-20 pointer-events-none">
                  {loadingStep < steps.length - 1 ? (
                    <RefreshCw className="w-12 h-12 text-[--color-tradelens-green] animate-spin mb-6" />
                  ) : (
                    <FileImage className="w-12 h-12 text-[--color-tradelens-green] mb-6" />
                  )}
                  <h3 className="text-xl font-medium text-white mb-2">{steps[loadingStep]}</h3>
                  <div className="w-48 h-1 bg-white/10 rounded-full mt-4 overflow-hidden">
                    <div 
                      className="h-full bg-[--color-tradelens-green] transition-all duration-300"
                      style={{ width: `${(loadingStep / (steps.length - 1)) * 100}%` }}
                    ></div>
                  </div>
                  
                  {loadingStep === steps.length - 1 && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); setLoadingStep(-1); }} 
                      className="mt-8 text-xs text-white/40 underline underline-offset-4 pointer-events-auto hover:text-white"
                    >
                      Reset Demo
                    </button>
                  )}
                </div>
              )}
            </GlassCard>
          </div>

          {/* Right: Output */}
          <GlassCard className="upload-demo-card lg:col-span-3 p-8 min-h-[450px]">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
               <div className="flex items-center gap-2">
                 <BarChart className="w-5 h-5 text-[--color-tradelens-green]" />
                 <h3 className="font-serif text-xl">Analysis Report</h3>
               </div>
               {loadingStep === steps.length - 1 && (
                 <div className="flex items-center gap-2 text-xs font-mono text-[--color-tradelens-green]">
                    <ShieldCheck className="w-4 h-4" /> Validated
                 </div>
               )}
            </div>

            {loadingStep === steps.length - 1 ? (
              <div ref={resultRef} className="grid md:grid-cols-2 gap-4">
                
                {/* Score panel */}
                <div className="bg-[#020403]/50 border border-white/5 rounded-2xl p-6 flex items-center gap-6">
                   <div className="relative w-20 h-20 shrink-0">
                      <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                        <path className="text-white/5" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                        <path className="text-[--color-tradelens-green] score-ring drop-shadow-[0_0_8px_rgba(140,255,63,0.5)]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="0, 100" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                         <span className="text-xl font-serif text-white leading-none"><AnimatedCounter end={82} duration={1.5} /></span>
                      </div>
                   </div>
                   <div>
                      <div className="text-[10px] uppercase tracking-widest font-mono text-white/40 mb-1">Quality Score</div>
                      <div className="text-sm text-white/70">High-probability setup detected.</div>
                   </div>
                </div>

                <div className="bg-[#020403]/50 border border-white/5 p-5 rounded-2xl flex justify-between items-center">
                  <span className="text-white/50 text-sm">Trend</span>
                  <span className="text-[--color-tradelens-green] font-medium">Bullish continuation</span>
                </div>

                <div className="bg-[#020403]/50 border border-white/5 p-5 rounded-2xl flex justify-between items-center md:col-span-2">
                  <span className="text-white/50 text-sm">Zone Map</span>
                  <div className="text-right flex gap-6">
                    <div>
                        <div className="text-[10px] text-white/30 uppercase font-mono mb-1">Support</div>
                        <div className="text-sm text-[--color-tradelens-green] font-mono">64,320 - 64,850</div>
                    </div>
                    <div>
                        <div className="text-[10px] text-white/30 uppercase font-mono mb-1">Resistance</div>
                        <div className="text-sm text-red-400 font-mono">68,200</div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#020403]/50 border border-white/5 p-5 rounded-2xl flex justify-between items-center md:col-span-2">
                  <span className="text-white/50 text-sm">Pattern</span>
                  <span className="text-white font-medium">Bull Flag (4H)</span>
                </div>
                
                <div className="bg-[--color-tradelens-green]/10 border border-[--color-tradelens-green]/20 p-6 rounded-2xl md:col-span-2">
                  <div className="text-[10px] uppercase font-mono text-[--color-tradelens-green] mb-3 tracking-widest">Educational Verdict</div>
                  <p className="text-[15px] text-white/90 leading-relaxed font-sans font-medium">
                    "Potential long setup only if price closes above resistance with strong volume. Invalid below support. Educational analysis only."
                  </p>
                </div>

              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-white/20 italic pb-10">
                Awaiting chart input...
              </div>
            )}
          </GlassCard>

        </div>
      </div>
    </section>
  );
}
