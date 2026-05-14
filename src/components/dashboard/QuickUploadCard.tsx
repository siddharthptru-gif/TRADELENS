import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { UploadCloud, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export function QuickUploadCard() {
  return (
    <GlassCard className="p-6 h-full flex flex-col justify-center items-center text-center relative overflow-hidden group border-dashed hover:border-solid hover:border-[#8CFF3F]/30 transition-all duration-300 cursor-pointer">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(140,255,63,0.05)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:bg-[#8CFF3F]/10 group-hover:text-[#8CFF3F] transition-colors">
        <UploadCloud className="w-8 h-8" />
      </div>
      
      <h3 className="text-lg font-serif mb-2 text-white group-hover:text-[#8CFF3F] transition-colors">Analyze a Chart</h3>
      <p className="text-xs text-muted max-w-[200px] mb-6">Upload a chart screenshot and get a structured educational report.</p>
      
      <Link to="/upload" className="px-6 py-2 rounded-full bg-white text-black font-medium text-sm hover:scale-105 transition-transform z-10 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
        Start Upload
      </Link>
      
      <div className="absolute bottom-4 flex items-center gap-2 text-[10px] text-muted">
        <AlertCircle className="w-3 h-3" />
        AI backend connected in next phase.
      </div>
    </GlassCard>
  );
}
