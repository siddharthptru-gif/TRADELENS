import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target } from 'lucide-react';
import { DASHBOARD_STATS } from '../data/mockData';
import GlassCard from './GlassCard';
import AIOrb from './AIOrb';
import AnimatedCounter from './AnimatedCounter';

gsap.registerPlugin(ScrollTrigger);

export default function ProductShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Rotation animation for the orb based on scroll
      gsap.to(orbRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        },
        rotate: 360,
        ease: "none",
      });

      // Scroll trigger for feature cards revealing
      gsap.from('.showcase-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
        },
        z: -100,
        scale: 0.8,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out'
      });

      gsap.from('.showcase-stat', {
        scrollTrigger: {
          trigger: '.stats-row',
          start: 'top 80%',
        },
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    { title: 'AI Chart Analysis', desc: 'Reads trend, candles, volume, and market structure.' },
    { title: 'Smart Entry Zones', desc: 'Highlights possible entry and invalidation zones.' },
    { title: 'Pattern Scanner', desc: 'Detects doji, engulfing, hammer, breakout, rejection, and consolidation patterns.' },
    { title: 'Risk Calculator', desc: 'Calculates RR, stop zone, position risk, and trade quality.' },
    { title: 'Trade Journal', desc: 'Track decisions, mistakes, emotions, and improvement.' },
    { title: 'Multi-Market Support', desc: 'Stocks, crypto, forex, indices, commodities.' },
  ];

  return (
    <section ref={sectionRef} id="features" className="py-32 relative overflow-hidden bg-[#020403] perspective-scene">
      <div className="absolute inset-0 grid-bg opacity-30"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24 relative z-10">
          <h2 className="text-5xl md:text-7xl font-serif mb-6 leading-tight max-w-4xl mx-auto">
            Everything you need <br/>
            <span className="italic text-white/50">to trade smarter.</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto font-sans text-sm md:text-base">
            TradeLens AI turns chart screenshots into structured, risk-aware educational market insights.
          </p>
        </div>

        {/* 3D Core / Orbit Area */}
        <div className="relative min-h-[600px] flex items-center justify-center mb-24 [transform-style:preserve-3d]">
          
          {/* Central Orb */}
          <div ref={orbRef} className="absolute inset-0 m-auto w-[250px] h-[250px] md:w-[350px] md:h-[350px] z-10 [transform-style:preserve-3d]">
             <AIOrb className="w-full h-full" />
          </div>

          {/* Feature Cards Grid */}
          <div className="relative z-20 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => {
              const offsets = [
                'lg:-translate-y-12 lg:translate-x-12', 
                'lg:-translate-y-24', 
                'lg:-translate-y-12 lg:-translate-x-12',
                'lg:translate-y-12 lg:translate-x-12', 
                'lg:translate-y-24', 
                'lg:translate-y-12 lg:-translate-x-12'
              ];
              
              return (
                <GlassCard key={idx} glow tilt className={`showcase-card p-6 ${offsets[idx]} group`}>
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center mb-4 group-hover:border-[--color-tradelens-green]/50 transition-colors bg-[#020403]">
                    <span className="font-mono text-xs text-white/50 group-hover:text-[--color-tradelens-green]">0{idx + 1}</span>
                  </div>
                  <h3 className="font-serif text-2xl mb-2">{feature.title}</h3>
                  <p className="text-white/40 text-sm">{feature.desc}</p>
                </GlassCard>
              );
            })}
          </div>

        </div>

        {/* Stats Row */}
        <div className="stats-row grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 border-t border-white/5 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-[--color-tradelens-green]/30 to-transparent"></div>
          
          <div className="showcase-stat text-center md:text-left">
             <div className="text-3xl md:text-5xl font-serif italic mb-2 text-[--color-tradelens-green-light]">
                <AnimatedCounter end={25} suffix="K+" duration={2.5} />
             </div>
             <div className="text-xs uppercase tracking-widest font-mono text-white/40 text-balance">Chart Scans</div>
          </div>
          <div className="showcase-stat text-center md:text-left">
             <div className="text-3xl md:text-5xl font-serif italic mb-2 text-[--color-tradelens-green-light]">
                <AnimatedCounter end={98.7} decimals={1} suffix="%" duration={2} />
             </div>
             <div className="text-xs uppercase tracking-widest font-mono text-white/40 text-balance">Demo Accuracy</div>
          </div>
          <div className="showcase-stat text-center md:text-left">
             <div className="text-3xl md:text-5xl font-serif italic mb-2 text-[--color-tradelens-green-light]">
                <AnimatedCounter end={100} suffix="M+" duration={3} />
             </div>
             <div className="text-xs uppercase tracking-widest font-mono text-white/40 text-balance">Mock Candles</div>
          </div>
          <div className="showcase-stat text-center md:text-left">
             <div className="text-3xl md:text-5xl font-serif italic mb-2 text-[--color-tradelens-green-light]">
                24/7
             </div>
             <div className="text-xs uppercase tracking-widest font-mono text-white/40 text-balance">Market Interface</div>
          </div>
        </div>

      </div>
    </section>
  );
}
