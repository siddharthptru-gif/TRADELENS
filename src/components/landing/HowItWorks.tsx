import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { UploadCloud, Cpu, FileText } from 'lucide-react';

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only apply horizontal scroll on desktop
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const ctx = gsap.context(() => {
        const sections = gsap.utils.toArray('.how-step');
        
        gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            scrub: 1,
            snap: 1 / (sections.length - 1),
            end: () => "+=" + trackRef.current?.offsetWidth
          }
        });
      }, containerRef);
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  const steps = [
    {
      num: '01',
      icon: UploadCloud,
      title: 'Upload Chart',
      desc: 'Upload a screenshot from TradingView, broker app, or any charting platform.'
    },
    {
      num: '02',
      icon: Cpu,
      title: 'AI Reads Structure',
      desc: 'TradeLens detects candles, trend direction, support, resistance, and volume behavior.'
    },
    {
      num: '03',
      icon: FileText,
      title: 'Get Risk-Aware Insights',
      desc: 'Receive a clean educational report with possible setups, invalidation levels, and risk zones.'
    }
  ];

  return (
    <section ref={containerRef} className="bg-[#020403] relative overflow-hidden md:h-screen flex items-center py-20 md:py-0 border-y border-white/5">
      <div className="absolute inset-0 noise-overlay"></div>
      
      {/* Track container */}
      <div className="w-full max-w-7xl mx-auto px-6 relative z-10 flex flex-col justify-center h-full">
        
        <div className="mb-12 md:mb-20 md:absolute md:top-24 md:left-6 lg:left-[calc(50%-600px)]">
          <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight">Smarter trading<br />in 3 simple steps.</h2>
        </div>

        <div ref={trackRef} className="flex flex-col md:flex-row gap-8 md:gap-0 md:w-[300vw] h-auto md:h-[60vh] items-center">
          {steps.map((step, idx) => (
            <div key={idx} className="how-step w-full md:w-[100vw] flex justify-center md:justify-start md:px-[10vw]">
               <div className="glass-panel p-8 md:p-12 rounded-3xl w-full max-w-lg relative group overflow-hidden border-t border-white/20">
                 {/* Hover glow */}
                 <div className="absolute inset-0 bg-gradient-to-br from-[#8CFF3F]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                 
                 <div className="flex items-center justify-between mb-8">
                   <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#8CFF3F]/40 transition-colors">
                     <step.icon className="w-6 h-6 text-white group-hover:text-[#8CFF3F] transition-colors" />
                   </div>
                   <div className="text-5xl font-serif text-white/10">{step.num}</div>
                 </div>
                 
                 <h3 className="text-2xl md:text-3xl font-medium text-white mb-4 relative z-10">{step.title}</h3>
                 <p className="text-muted text-sm md:text-base leading-relaxed relative z-10">{step.desc}</p>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
