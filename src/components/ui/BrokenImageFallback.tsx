import React from 'react';
import { AreaChart, ImageOff } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function BrokenImageFallback({ className, iconSize = 24 }: { className?: string, iconSize?: number | "s" | "m" | "l" | "xl" }) {
  const sizeMap: Record<string, number> = {
    "s": 16,
    "m": 24,
    "l": 36,
    "xl": 48
  };
  const size = typeof iconSize === 'string' ? sizeMap[iconSize] : iconSize;

  return (
    <div className={twMerge("flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-xl p-4 text-center", className)}>
      <div className="w-12 h-12 bg-black/40 rounded-full flex items-center justify-center mb-3">
        <ImageOff className="text-white/20" size={size} />
      </div>
      <span className="text-xs text-white/40 font-mono uppercase tracking-widest">Image Unavailable</span>
    </div>
  );
}
