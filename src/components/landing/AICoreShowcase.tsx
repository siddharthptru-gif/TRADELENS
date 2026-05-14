import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Activity, Target, ScanSearch, ShieldAlert, BookOpen, Globe2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export function AICoreShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const features = [
    { icon: ScanSearch, title: 'AI Chart Analysis', desc: 'Reads trend, candles, volume, and market structure.' },
    { icon: Target, title: 'Smart Entry Zones', desc: 'Highlights possible entry and invalidation areas.' },
    { icon: Activity, title: 'Pattern Scanner', desc: 'Detects doji, engulfing, breakout, and consolidation.' },
    { icon: ShieldAlert, title: 'Risk Calculator', desc: 'Calculates RR, stop zone, position risk, and score.' },
    { icon: BookOpen, title: 'Trade Journal', desc: 'Track decisions, mistakes, emotions, and growth.' },
    { icon: Globe2, title: 'Multi-Market', desc: 'Stocks, crypto, forex, indices, and commodities.' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=1000',
          scrub: 1,
          pin: true,
        }
      });

      tl.to(orbRef.current, { rotation: 360, ease: 'none' }, 0);
      
      cardsRef.current.forEach((card, index) => {
        tl.fromTo(card,
          { opacity: 0, z: -500, scale: 0.5, y: 100 },
          { opacity: 1, z: 0, scale: 1, y: 0, ease: 'back.out(1.2)', duration: 0.4 },
          index * 0.1
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen flex flex-col justify-center items-center perspective-scene bg-[#020403] overflow-hidden py-24">
      <div className="absolute top-12 left-0 right-0 text-center z-20 px-6">
        <h2 className="text-4xl md:text-5xl font-serif mb-4 tracking-tight">
          Everything you need<br />to trade smarter.
        </h2>
        <p className="text-muted text-sm md:text-base max-w-xl mx-auto">
          TradeLens AI turns chart screenshots into structured, risk-aware educational market insights.
        </p>
      </div>

      {/* Central Orb */}
      <div className="relative mt-20 flex justify-center items-center h-[500px] w-full max-w-4xl">
        <div ref={orbRef} className="absolute z-10 flex items-center justify-center w-64 h-64 [transform-style:preserve-3d]">
          {/* Inner Core */}
          <div className="absolute w-32 h-32 bg-[#8CFF3F] rounded-full blur-[40px] opacity-20"></div>
          {/* Multiple Rings */}
          <div className="absolute w-64 h-64 border border-[#8CFF3F]/30 rounded-full [transform:rotateX(70deg)] shadow-[0_0_20px_rgba(140,255,63,0.1)]"></div>
          <div className="absolute w-48 h-48 border border-[#1C5F24]/50 rounded-full [transform:rotateY(70deg)]"></div>
          <div className="absolute w-56 h-56 border border-white/10 rounded-full [transform:rotateX(45deg)_rotateY(45deg)]"></div>
          {/* Core Symbol */}
          <div className="absolute w-12 h-12 rounded-full border-2 border-[#8CFF3F] flex items-center justify-center bg-black/50 backdrop-blur-md z-20">
             <Target className="w-5 h-5 text-[#8CFF3F]" />
          </div>
        </div>

        {/* Feature Cards Grid (positioned absolutely in a circle or around) */}
        <div className="absolute inset-0 z-20 [transform-style:preserve-3d]">
           {features.map((feat, idx) => {
             // Calculate positions in an ellipse around center
             const angle = (idx / features.length) * Math.PI * 2;
             const radiusX = typeof window !== 'undefined' && window.innerWidth < 768 ? 140 : 380;
             const radiusY = typeof window !== 'undefined' && window.innerWidth < 768 ? 200 : 220;
             const x = Math.cos(angle) * radiusX;
             const y = Math.sin(angle) * radiusY;
             
             return (
               <div 
                 key={idx}
                 ref={(el) => (cardsRef.current[idx] = el)}
                 className="absolute left-1/2 top-1/2 glass-panel p-5 rounded-2xl w-44 md:w-64 -ml-22 md:-ml-32 -mt-16 group hover:border-[#8CFF3F]/40 hover:shadow-[0_0_20px_rgba(140,255,63,0.15)] transition-colors duration-300"
                 style={{ 
                   transform: `translate(${x}px, ${y}px) translateZ(${Math.sin(angle) * 50}px)`
                 }}
               >
                 <div className="w-8 h-8 rounded-full bg-[#8CFF3F]/10 flex items-center justify-center mb-3 group-hover:bg-[#8CFF3F]/20 transition-colors">
                   <feat.icon className="w-4 h-4 text-[#8CFF3F]" />
                 </div>
                 <h3 className="text-white font-medium text-sm md:text-base mb-1">{feat.title}</h3>
                 <p className="text-muted text-[10px] md:text-xs leading-relaxed">{feat.desc}</p>
               </div>
             );
           })}
        </div>
      </div>

      {/* Stats Row */}
      <div className="absolute bottom-12 w-full max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center z-20">
         <div>
           <div className="text-2xl md:text-3xl font-mono text-white mb-1">25K+</div>
           <div className="text-[10px] md:text-xs text-muted uppercase tracking-wider">Chart Scans</div>
         </div>
         <div>
           <div className="text-2xl md:text-3xl font-mono text-[#8CFF3F] mb-1">98.7%</div>
           <div className="text-[10px] md:text-xs text-muted uppercase tracking-wider">Pattern Accuracy</div>
         </div>
         <div>
           <div className="text-2xl md:text-3xl font-mono text-white mb-1">100M+</div>
           <div className="text-[10px] md:text-xs text-muted uppercase tracking-wider">Mock Candles</div>
         </div>
         <div>
           <div className="text-2xl md:text-3xl font-mono text-white mb-1">24/7</div>
           <div className="text-[10px] md:text-xs text-muted uppercase tracking-wider">Market Interface</div>
         </div>
      </div>
    </section>
  );
}
