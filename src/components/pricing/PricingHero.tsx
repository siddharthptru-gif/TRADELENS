import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { GradientButton } from '../ui/GradientButton';

export function PricingHero() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="text-center max-w-3xl mx-auto mb-16">
      <h1 className="text-4xl md:text-5xl font-serif mb-6 text-white leading-tight">
        Simple plans for structured chart analysis.
      </h1>
      <p className="text-lg text-white/60 mb-8 leading-relaxed">
        Start free, analyze charts, save reports, and build a trading journal. TradeLens AI is educational analysis only — not financial advice.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <GradientButton 
          onClick={() => navigate(user ? '/dashboard' : '/signup')} 
          className="px-8 py-3.5 text-base w-full sm:w-auto"
        >
          Start Free
        </GradientButton>
        <button 
          onClick={() => navigate('/help')}
          className="px-8 py-3.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold transition-all w-full sm:w-auto"
        >
          View Safety Rules
        </button>
      </div>
    </div>
  );
}
