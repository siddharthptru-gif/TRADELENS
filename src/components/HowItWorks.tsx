import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { UploadCloud, Cpu, LineChart } from 'lucide-react';
import GlassCard from './GlassCard';

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 3D Stacking scroll effect
      const cards = gsap.utils.toArray('.hw-card');
      
      gsap.fromTo(cards, 
        { 
          y: 150, 
          opacity: 0, 
          rotateX: 45, 
          transformOrigin: "top center" 
        },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "center center",
            scrub: 1,
          },
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.2,
          ease: "back.out(1.7)"
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      icon: UploadCloud,
      title: "Upload Chart",
      desc: "Upload a screenshot from TradingView, broker app, or any charting platform."
    },
    {
      icon: Cpu,
      title: "AI Reads Structure",
      desc: "TradeLens detects candle patterns, trend direction, support, resistance, and volume behavior."
    },
    {
      icon: LineChart,
      title: "Get Insights",
      desc: "Receive a clean educational report with possible setups, invalidation levels, and risk zones."
    }
  ];

  return (
    <section ref={sectionRef} className="py-32 bg-[#020403] relative perspective-scene overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-[--color-tradelens-green]/5 blur-[150px] pointer-events-none rounded-full max-w-4xl opacity-50"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">
            Smarter trading in <br className="md:hidden" /><span className="italic text-[--color-tradelens-green-light]">3 simple steps.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12 lg:gap-8 relative z-10">
          {/* Laser connection line hidden on mobile */}
          <div className="hidden md:block absolute top-[80px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-[--color-tradelens-green]/30 to-transparent z-[-1] pointer-events-none"></div>

          {steps.map((step, i) => (
            <div key={i} className="hw-card relative [transform-style:preserve-3d]">
              <GlassCard glow tilt className="p-8 h-full flex flex-col items-center text-center shadow-[0_30px_60px_rgba(0,0,0,0.4)] group">
                
                {/* Number / Icon */}
                <div className="w-20 h-20 rounded-full bg-[#020403] border border-white/10 flex items-center justify-center mb-8 relative shadow-[inset_0_0_20px_rgba(140,255,63,0.02)] group-hover:shadow-[inset_0_0_20px_rgba(140,255,63,0.1)] transition-all">
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[--color-tradelens-green] text-black font-mono text-sm flex items-center justify-center font-bold">
                    {i+1}
                  </div>
                  <step.icon className="w-8 h-8 text-white/50 group-hover:text-[--color-tradelens-green] transition-colors" />
                </div>

                <h3 className="text-2xl font-serif mb-4 text-white">{step.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed font-sans">{step.desc}</p>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
