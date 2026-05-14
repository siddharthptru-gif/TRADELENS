import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, EyeOff, AlertOctagon, BookOpen } from 'lucide-react';
import GlassCard from './GlassCard';

gsap.registerPlugin(ScrollTrigger);

export default function SafetySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.safety-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        y: 30,
        opacity: 0,
        rotateY: 10,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out'
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-[#020403] relative border-y border-white/5 perspective-scene">
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-[--color-tradelens-green]/10 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">
            Built for better decisions, <br className="md:hidden" />
            <span className="italic text-white/50">not blind signals.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { icon: ShieldCheck, title: "Risk-First Insights", desc: "We map invalidation zones before entry points." },
            { icon: EyeOff, title: "No Fake Guarantees", desc: "We don't sell '100% accurate' magic bullets." },
            { icon: AlertOctagon, title: "Confirmation Based", desc: "Never blind buys. Always wait for structure breaks." },
            { icon: BookOpen, title: "Educational Design", desc: "Learn chart reading through guided AI reports." }
          ].map((item, i) => (
            <div key={i} className="safety-card relative [transform-style:preserve-3d]">
              <GlassCard glow tilt className="p-8 flex flex-col items-center text-center group h-full">
                 <item.icon className="w-8 h-8 text-white/30 group-hover:text-[--color-tradelens-green] transition-colors mb-4" />
                 <h3 className="font-serif text-xl mb-2 text-white/90">{item.title}</h3>
                 <p className="text-sm text-white/40 leading-relaxed font-sans">{item.desc}</p>
              </GlassCard>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto safety-card">
          <GlassCard className="p-6 md:p-8 flex gap-6 items-start">
            <div className="hidden md:flex w-12 h-12 rounded-full bg-white/5 border border-white/10 items-center justify-center shrink-0">
               <span className="text-[24px]">⚠️</span>
            </div>
            <div>
              <h4 className="text-sm font-mono text-[--color-tradelens-green] uppercase tracking-wider mb-2">Important Disclaimer</h4>
              <p className="text-sm text-white/50 leading-relaxed font-sans">
                TradeLens AI provides educational technical analysis only. It is not a registered investment adviser, research analyst, or financial planner. Do not rely on it as financial advice. Always perform your own research or consult a registered professional before taking market action.
              </p>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
