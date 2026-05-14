import React, { useState } from 'react';
import { Upload, ChevronRight, Activity, ScanLine, FileBarChart, CheckCircle2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export function UploadDemo() {
  const [analyzing, setAnalyzing] = useState(false);
  const [step, setStep] = useState(0);

  const startDemo = () => {
    if (analyzing) return;
    setAnalyzing(true);
    setStep(0);
    
    // Simulate pipeline
    const times = [800, 1600, 2400, 3200];
    times.forEach((time, index) => {
      setTimeout(() => {
        setStep(index + 1);
      }, time);
    });
  };

  return (
    <section className="py-32 bg-[#020403] border-b border-white/5 relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#1C5F24]/10 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        {/* Left: Upload Input */}
        <div>
          <h2 className="text-4xl md:text-5xl font-serif mb-6 tracking-tight">Drop a chart.<br /><span className="text-[#8CFF3F] italic">Get instant structure.</span></h2>
          <p className="text-muted mb-10 max-w-md">See how our AI processes raw candlestick data into actionable educational insights in seconds.</p>
          
          <div className="glass-panel p-8 rounded-3xl border-dashed border-2 border-white/20 text-center relative overflow-hidden group hover:border-[#8CFF3F]/40 transition-colors">
             {analyzing && step < 4 && (
               <div className="absolute inset-0 bg-[#8CFF3F]/5 flex items-center justify-center z-20 backdrop-blur-sm">
                 <div className="flex flex-col items-center">
                   <ScanLine className="w-8 h-8 text-[#8CFF3F] animate-pulse mb-4" />
                   <div className="text-sm font-mono text-[#8CFF3F]">
                     {step === 0 && "Reading candles..."}
                     {step === 1 && "Detecting pattern..."}
                     {step === 2 && "Mapping levels..."}
                     {step === 3 && "Building report..."}
                   </div>
                 </div>
               </div>
             )}

             <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-[#8CFF3F]/10 group-hover:text-[#8CFF3F] transition-colors">
               <Upload className="w-6 h-6" />
             </div>
             <h3 className="text-lg font-medium text-white mb-2">Upload candlestick screenshot</h3>
             <p className="text-xs text-muted mb-8">PNG, JPG, WEBP supported</p>
             
             <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
               <button onClick={startDemo} disabled={analyzing} className="w-full sm:w-auto px-6 py-3 rounded-full bg-white text-black font-medium text-sm hover:scale-105 transition-transform disabled:opacity-50">
                 Try Sample Chart
               </button>
               <button disabled className="w-full sm:w-auto px-6 py-3 rounded-full border border-white/20 text-white font-medium text-sm hover:bg-white/5 transition-colors opacity-50 cursor-not-allowed">
                 Upload Screenshot
               </button>
             </div>
          </div>
        </div>

        {/* Right: Result Panel */}
        <div className="relative h-[500px]">
           <div className={cn("absolute inset-0 glass-panel rounded-3xl p-6 md:p-8 flex flex-col transition-all duration-700", step === 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
             <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
               <div className="flex items-center gap-3">
                 <FileBarChart className="w-5 h-5 text-[#8CFF3F]" />
                 <span className="font-medium text-sm">Analysis Report</span>
               </div>
               <div className="px-3 py-1 bg-[#8CFF3F]/10 rounded-full text-[#8CFF3F] text-[10px] font-mono border border-[#8CFF3F]/20">
                 Score: 82/100
               </div>
             </div>

             <div className="space-y-6 flex-1">
               <div className="grid grid-cols-2 gap-4">
                 <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                   <div className="text-[10px] text-muted uppercase tracking-wider mb-1">Trend</div>
                   <div className="text-sm font-medium text-white">Bullish continuation</div>
                 </div>
                 <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                   <div className="text-[10px] text-muted uppercase tracking-wider mb-1">Pattern</div>
                   <div className="text-sm font-medium text-[#8CFF3F]">Bull Flag</div>
                 </div>
               </div>

               <div>
                 <div className="text-[10px] text-muted uppercase tracking-wider mb-2">Key Levels</div>
                 <div className="flex items-center justify-between text-sm py-2 border-b border-white/5">
                   <span className="text-white/60">Resistance</span>
                   <span className="font-mono">68,200</span>
                 </div>
                 <div className="flex items-center justify-between text-sm py-2">
                   <span className="text-white/60">Support</span>
                   <span className="font-mono">64,320 - 64,850</span>
                 </div>
               </div>

               <div>
                 <div className="text-[10px] text-[#8CFF3F] uppercase tracking-wider mb-2">Verdict</div>
                 <p className="text-sm text-white/80 leading-relaxed bg-[#8CFF3F]/5 p-3 rounded-lg border border-[#8CFF3F]/10">
                   "Potential long setup only if price closes above resistance with strong volume. Invalid below support."
                 </p>
               </div>
             </div>
             
             <div className="mt-4 pt-4 border-t border-white/5 flex items-start gap-2">
               <Activity className="w-4 h-4 text-muted shrink-0 mt-0.5" />
               <p className="text-[10px] text-muted leading-tight">Educational analysis only. Not financial advice. Always verify with your own research.</p>
             </div>
           </div>

           {/* Placeholder before result */}
           <div className={cn("absolute inset-0 border border-white/5 rounded-3xl flex items-center justify-center transition-all duration-700", step === 4 ? "opacity-0 scale-95" : "opacity-100")}>
             <p className="text-muted text-sm font-mono flex items-center gap-2">
               <ChevronRight className="w-4 h-4" /> Ready for analysis
             </p>
           </div>
        </div>
      </div>
    </section>
  );
}
