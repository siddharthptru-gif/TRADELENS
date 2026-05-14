import React from 'react';
import { GlassCard } from '../ui/GlassCard';

export function UploadProgress({ progress }: { progress: number }) {
  if (progress === 0) return null;
  
  return (
    <GlassCard className="p-4 mt-4 overflow-hidden relative">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-mono text-white/50 uppercase">Uploading...</span>
        <span className="text-xs font-mono text-[#8CFF3F]">{Math.round(progress)}%</span>
      </div>
      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#8CFF3F] transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </GlassCard>
  );
}
