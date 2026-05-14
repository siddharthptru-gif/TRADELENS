import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ref, onValue, off } from 'firebase/database';
import { db } from '../lib/rtdb';
import { ChartScan } from '../types/dashboard';
import { GlassCard } from '../components/ui/GlassCard';
import { GradientButton } from '../components/ui/GradientButton';
import { Loader2, CheckCircle2, ChevronRight, XCircle, ArrowLeft } from 'lucide-react';
import { cn } from '../lib/utils';

export default function ScanLoading() {
  const { scanId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [scan, setScan] = useState<ChartScan | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user || !scanId) return;

    const scanRef = ref(db, `chartScans/${user.uid}/${scanId}`);
    
    const listener = onValue(scanRef, (snapshot) => {
      const data = snapshot.val() as ChartScan | null;
      if (data) {
        setScan(data);
      } else {
        setError("Scan not found.");
      }
    }, (err) => {
      console.error(err);
      setError("Failed to monitor analysis progress.");
    });

    return () => off(scanRef, 'value', listener);
  }, [user, scanId]);

  if (!user) return null; // protected route

  if (error) {
    return (
      <div className="min-h-screen bg-[#020403] text-white flex items-center justify-center p-6">
        <GlassCard className="p-8 max-w-md w-full text-center">
          <XCircle className="w-12 h-12 text-[#FF5C7A] mx-auto mb-4" />
          <h2 className="text-xl font-serif mb-2">Error</h2>
          <p className="text-muted text-sm mb-8">{error}</p>
          <GradientButton onClick={() => navigate('/dashboard')} className="w-full">Back to Dashboard</GradientButton>
        </GlassCard>
      </div>
    );
  }

  if (!scan) {
    return (
      <div className="min-h-screen bg-[#020403] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#8CFF3F] animate-spin" />
      </div>
    );
  }

  const { status, imageUrl, compressedImageUrl, symbol, marketType, timeframe, reportId } = scan;
  
  const displayImage = compressedImageUrl || imageUrl;
  
  const stages = [
    { id: 'uploading', label: 'Uploading Chart', msg: 'Chart image uploaded successfully.' },
    { id: 'queued', label: 'Queued', msg: 'AI analysis backend will be connected in Phase 6.' },
    { id: 'analyzing', label: 'Analyzing Structure', msg: 'Reading candles, structure, and visible context...' },
    { id: 'validating', label: 'Validating Report', msg: 'Validating risk-aware report format...' },
    { id: 'completed', label: 'Analysis Complete', msg: 'Your educational report is ready.' }
  ];

  const currentStageIndex = stages.findIndex(s => s.id === status);
  const activeStageIndex = Math.max(0, currentStageIndex);
  
  const isFailed = status === 'failed';
  
  return (
    <div className="min-h-screen bg-[#020403] text-white py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-sm text-muted hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-serif">Analysis Progress</h1>
            
            <GlassCard className="p-6">
              <div className="aspect-video w-full bg-black/50 rounded-lg overflow-hidden border border-white/5 mb-4">
                {displayImage ? (
                  <img src={displayImage} alt="Chart" className="w-full h-full object-cover opacity-50" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Loader2 className="w-6 h-6 text-white/20 animate-spin" />
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div>
                  <div className="font-medium">{symbol || 'Unknown Symbol'}</div>
                  <div className="text-[10px] text-muted uppercase tracking-wider">{marketType} • {timeframe}</div>
                </div>
                <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest text-[#8CFF3F]">
                  {status}
                </div>
              </div>
            </GlassCard>

            {(status === 'completed' && reportId) && (
              <GradientButton onClick={() => navigate(`/report/${reportId}`)} className="w-full py-4 text-lg mt-4">
                Open Report
              </GradientButton>
            )}

            {isFailed && (
              <div className="p-4 bg-[--color-tradelens-red]/10 border border-[--color-tradelens-red]/20 rounded-xl text-center">
                <XCircle className="w-8 h-8 text-[--color-tradelens-red] mx-auto mb-2" />
                <h3 className="text-[--color-tradelens-red] font-medium mb-1">Analysis Failed</h3>
                <p className="text-sm text-[--color-tradelens-red]/80">{scan.errorCode || "An unexpected error occurred during analysis."}</p>
              </div>
            )}
            
            <div className="flex gap-4">
               {status === 'completed' && (
                 <button onClick={() => navigate('/upload')} className="flex-1 py-3 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm font-medium">
                   Upload Another
                 </button>
               )}
            </div>
          </div>

          <div className="md:pt-16">
            <div className="relative pl-6 border-l border-white/10 space-y-8">
              {stages.map((stage, i) => {
                // If it failed, don't light up stages past the current one
                const isActive = i === activeStageIndex && !isFailed;
                const isPast = i < activeStageIndex || (isFailed && i < activeStageIndex);
                
                return (
                  <div key={stage.id} className={cn(
                    "relative transition-all duration-500",
                    (isActive || isPast) ? "opacity-100" : "opacity-30"
                  )}>
                    <div className={cn(
                      "absolute -left-[33px] p-1 rounded-full bg-[#020403] top-0",
                      isActive ? "text-[#8CFF3F]" : isPast ? "text-[#8CFF3F]" : "text-white/20"
                    )}>
                      {isPast ? <CheckCircle2 className="w-5 h-5" /> : isActive ? <Loader2 className="w-5 h-5 animate-spin" /> : <div className="w-5 h-5 rounded-full border-2 border-currentColor" />}
                    </div>
                    
                    <h3 className={cn(
                      "text-sm font-medium mb-1",
                      isActive && "text-[#8CFF3F]"
                    )}>{stage.label}</h3>
                    
                    {(isActive || isPast) && (
                      <p className="text-xs text-muted mb-0 leading-relaxed max-w-[280px]">
                        {stage.msg}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
            
            <div className="mt-12 p-4 bg-white/[0.02] border border-white/5 rounded-xl">
              <p className="text-[10px] text-muted leading-relaxed">
                TradeLens AI uses advanced vision models to analyze market structure. This process takes 10-20 seconds. 
                Please do not close this window.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
