import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GradientButton } from '../ui/GradientButton';

export function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 ${scrolled ? 'py-4' : 'py-6'}`}>
      <div className={`max-w-5xl mx-auto flex items-center justify-between transition-all duration-300 ${scrolled ? 'glass-pill px-6 py-3 shadow-lg' : 'bg-transparent'}`}>
        <Link to="/" className="text-xl font-serif tracking-tight flex items-center gap-2">
          <span className="w-5 h-5 rounded-full border-2 border-[--color-tradelens-green] flex items-center justify-center [box-shadow:0_0_8px_rgba(140,255,63,0.4)]">
            <span className="w-1.5 h-1.5 bg-[--color-tradelens-green] rounded-full"></span>
          </span>
          TradeLens AI
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted">
          <a href="#product" className="hover:text-white transition-colors">Product</a>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
          <a href="#safety" className="hover:text-white transition-colors">Safety</a>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="hidden md:block text-sm font-medium text-muted hover:text-white transition-colors">Login</Link>
          <GradientButton onClick={() => window.location.href='/signup'} className="px-5 py-2 md:px-6 md:py-2 text-xs md:text-sm">
            Start Free Analysis
          </GradientButton>
        </div>
      </div>
    </nav>
  );
}
