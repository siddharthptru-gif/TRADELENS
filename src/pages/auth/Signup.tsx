import React, { useState } from 'react';
import { GlassCard } from '../../components/ui/GlassCard';
import { GradientButton } from '../../components/ui/GradientButton';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { signInWithGoogle } from '../../lib/auth';

export default function Signup() {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState('');

  if (!loading && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleGoogleLogin = async () => {
    try {
      setAuthLoading(true);
      setError('');
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (err: any) {
      console.error(err);
      setError('Failed to sign up with Google. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[90vh] px-4 relative overflow-hidden bg-[#020403]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#8CFF3F] rounded-full blur-[200px] opacity-[0.05] pointer-events-none"></div>

      <GlassCard className="w-full max-w-md p-8 relative z-10 text-center">
        <div className="w-12 h-12 rounded-sm bg-[#8CFF3F] flex mx-auto items-center justify-center [box-shadow:0_0_20px_rgba(140,255,63,0.3)] rotate-45 mb-8"></div>
        <h2 className="text-3xl font-serif text-white mb-2 tracking-tight">Create your TradeLens AI account</h2>
        <p className="text-muted text-sm mb-8">
          Start with Google. No password required.
        </p>

        {error && <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg mb-6">{error}</div>}

        <GradientButton onClick={handleGoogleLogin} className="w-full mb-4" disabled={authLoading}>
          {authLoading ? 'Connecting...' : 'Continue with Google'}
        </GradientButton>

        <div className="text-[10px] text-muted tracking-wider uppercase mb-8">
          Educational analysis only. Not financial advice.
        </div>

        <p className="text-xs text-white/40 leading-relaxed">
          By continuing, you agree that TradeLens AI does not provide buy/sell signals or guaranteed outcomes. Always verify with your own research.
        </p>
      </GlassCard>
    </div>
  );
}
