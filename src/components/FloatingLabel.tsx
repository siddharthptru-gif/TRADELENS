import React from 'react';
import { cn } from '../lib/utils';

export default function FloatingLabel({ text, className, lineDirection = 'bottom' }: { text: string; className?: string; lineDirection?: 'top' | 'bottom' | 'left' | 'right' }) {
  return (
    <div className={cn("absolute px-3 py-1.5 glass-panel text-[10px] font-mono text-white/80 whitespace-nowrap z-20", className)}>
      <div className={cn(
        "absolute bg-current/20",
        lineDirection === 'bottom' ? "w-[1px] h-12 -bottom-12 left-1/2" :
        lineDirection === 'top' ? "w-[1px] h-12 -top-12 left-1/2" :
        lineDirection === 'left' ? "w-12 h-[1px] -left-12 top-1/2" :
        "w-12 h-[1px] -right-12 top-1/2"
      )}></div>
      <div className={cn(
        "absolute w-1 h-1 bg-current rounded-full",
         lineDirection === 'bottom' ? "-bottom-12 left-[calc(50%-2px)]" :
         lineDirection === 'top' ? "-top-12 left-[calc(50%-2px)]" :
         lineDirection === 'left' ? "-left-12 top-[calc(50%-2px)]" :
         "-right-12 top-[calc(50%-2px)]"
      )}></div>
      {text}
    </div>
  );
}
