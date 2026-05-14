import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

export function PricingTiers() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.pricing-card', 
        { y: 100, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.1, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const plans = [
    {
      name: 'Starter', price: '19', desc: 'For casual traders learning structure.', 
      features: ['50 chart scans/month', 'Basic indicators', 'Trade quality score', 'Risk calculator']
    },
    {
      name: 'Pro', price: '49', desc: 'For active traders seeking edge.', pop: true,
      features: ['Unlimited chart scans', 'Advanced AI insights', 'Pattern scanner', 'Trade journal', 'Multi-market support']
    },
    {
      name: 'Elite', price: '99', desc: 'For professionals managing risk.', 
      features: ['Everything in Pro', 'Custom watchlists', 'Advanced backtesting', 'Priority analysis', 'Strategy templates']
    }
  ];

  return (
    <section ref={containerRef} className="py-32 bg-[#020403] relative border-b border-white/5">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[300px] bg-[#8CFF3F] rounded-full blur-[150px] opacity-[0.03] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-4">Simple plans.<br /><span className="text-[#8CFF3F] italic">Powerful insights.</span></h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-end">
          {plans.map((p, idx) => (
            <div key={idx} className={cn("pricing-card glass-panel rounded-3xl p-8 relative group hover:-translate-y-2 transition-transform duration-500", p.pop ? "border-[#8CFF3F]/30 bg-white/[0.04] shadow-[0_0_40px_rgba(140,255,63,0.05)]" : "")}>
              {p.pop && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#8CFF3F] text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Most Popular</div>}
              
              <h3 className="text-xl font-medium mb-2">{p.name}</h3>
              <p className="text-xs text-muted mb-6 h-8">{p.desc}</p>
              <div className="mb-8 flex items-end gap-1">
                <span className="text-4xl font-serif leading-none">${p.price}</span>
                <span className="text-sm text-muted mb-1">/month</span>
              </div>
              
              <ul className="space-y-4 mb-8">
                {p.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/80">
                    <Check className="w-4 h-4 text-[#8CFF3F] shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              
              <button className={cn("w-full py-3 rounded-xl font-medium text-sm transition-colors", p.pop ? "bg-[#8CFF3F] hover:bg-[#B8FF7A] text-black" : "bg-white/5 hover:bg-white/10 text-white border border-white/10")}>
                Start Free Trial
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
