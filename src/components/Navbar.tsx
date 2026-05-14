import React, { useState, useEffect } from 'react';
import { cn } from '../lib/utils';
import { Target } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 inset-x-0 z-50 flex justify-center pt-6 px-4 transition-all duration-300',
        scrolled ? 'translate-y-[-10px] pt-4' : ''
      )}
    >
      <div
        className={cn(
          'flex items-center justify-between w-full max-w-5xl px-6 py-3 transition-all duration-500 rounded-full',
          scrolled ? 'glass-panel shadow-2xl shadow-[--color-tradelens-green]/5' : 'bg-transparent border border-white/5'
        )}
      >
        <div className="flex items-center gap-2 text-white font-serif italic text-xl">
          <Target className="w-5 h-5 text-[--color-tradelens-green]" />
          <span>TradeLens AI</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
          {['Product', 'Features', 'Markets', 'Safety'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="hover:text-white transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[--color-tradelens-green] transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        <button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-5 py-2 rounded-full text-sm font-semibold transition-all hover:shadow-[0_0_20px_rgba(140,255,63,0.1)] hover:border-[--color-tradelens-green]/30">
          Start Free Analysis
        </button>
      </div>
    </nav>
  );
}
