import React from 'react';
import { GradientButton } from '../components/ui/GradientButton';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
      <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight mb-6">
        Upload any chart. <br />
        <span className="text-[--color-tradelens-green]">Get structured market analysis in seconds.</span>
      </h1>
      <p className="text-xl text-muted max-w-2xl mb-12">
        TradeLens AI is an educational chart-reading mentor. See structure, risk, and invalidation before you trade.
      </p>
      <GradientButton onClick={() => navigate('/upload')}>
        Analyze a Chart Free
      </GradientButton>
      <div className="mt-8 text-xs text-white/40 uppercase tracking-widest font-mono">
        Educational analysis. Not financial advice.
      </div>
    </div>
  );
}
