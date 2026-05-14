import React, { useEffect, useState } from 'react';
import { X, Image as ImageIcon } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

interface Props {
  file: File;
  previewUrl: string;
  onClear: () => void;
  disabled: boolean;
}

export function ChartPreview({ file, previewUrl, onClear, disabled }: Props) {
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setDimensions({ width: img.width, height: img.height });
    img.src = previewUrl;
  }, [previewUrl]);

  return (
    <GlassCard className="relative overflow-hidden group">
      {!disabled && (
        <button 
          onClick={onClear}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-black/80 hover:text-red-400 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
      
      <div className="relative aspect-video w-full bg-black/20 flex items-center justify-center overflow-hidden">
        <img 
          src={previewUrl} 
          alt="Chart Preview" 
          className="w-full h-full object-contain"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
      
      <div className="p-4 border-t border-white/5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 truncate">
          <ImageIcon className="w-4 h-4 text-[#8CFF3F]" />
          <span className="truncate max-w-[200px] text-white/80">{file.name}</span>
        </div>
        <div className="flex items-center gap-4 text-muted shrink-0 text-[10px] font-mono">
          <span>{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
          {dimensions && <span>{dimensions.width}×{dimensions.height}</span>}
        </div>
      </div>
    </GlassCard>
  );
}
