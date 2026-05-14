import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Activity } from 'lucide-react';
import MagneticButton from './MagneticButton';
import AIOrb from './AIOrb';

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.cta-content', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: 'power3.out'
      });

      gsap.to(orbRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        },
        rotate: 360,
        ease: 'none'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 md:py-48 relative overflow-hidden bg-[#020403]">
      {/* Background Visuals */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Glow */}
        <div className="w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[--color-tradelens-green]/10 via-transparent to-transparent blur-3xl rounded-full"></div>
      </div>
      
      {/* Abstract Grid background */}
      <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_60%_80%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none"></div>

      {/* Background Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none [transform-style:preserve-3d]">
        <div ref={orbRef} className="w-[600px] h-[600px] [transform-style:preserve-3d]">
          <AIOrb className="w-full h-full" hideCore />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10 cta-content">
        <h2 className="text-5xl md:text-8xl font-serif text-white mb-6">
          Stop guessing <br/>
          <span className="italic text-gradient-green">the chart.</span>
        </h2>
        <p className="text-white/50 text-lg md:text-xl max-w-xl mx-auto mb-12 font-sans text-balance">
          Upload your first chart and get a structured AI market analysis in seconds.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <MagneticButton className="bg-white text-black px-10 py-5 rounded-2xl font-bold transition-all hover:bg-[--color-tradelens-green] flex items-center justify-center gap-2 w-full sm:w-auto shadow-[0_0_40px_rgba(255,255,255,0.1)]">
            <Activity className="w-5 h-5" />
            Start Free Analysis
          </MagneticButton>
          <MagneticButton className="px-10 py-5 rounded-2xl font-bold text-white transition-all glass-panel hover:bg-white/5 w-full sm:w-auto">
            View Demo Report
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
