import React from 'react';
import { GlassCard } from '../../components/ui/GlassCard';
import { GradientButton } from '../../components/ui/GradientButton';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-[90vh] px-4 relative overflow-hidden bg-[#020403]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#8CFF3F] rounded-full blur-[200px] opacity-[0.05] pointer-events-none"></div>

      <GlassCard className="w-full max-w-md p-8 relative z-10 text-center">
        <h2 className="text-2xl font-serif text-white mb-4 tracking-tight">Password login is not enabled</h2>
        <p className="text-muted text-sm mb-8 leading-relaxed">
          TradeLens AI currently uses Google Sign-In only. Please continue with Google from the login page.
        </p>
        <div className="space-y-4">
          <GradientButton onClick={() => navigate('/login')} className="w-full">
            Go to Login
          </GradientButton>
        </div>
      </GlassCard>
    </div>
  );
}
