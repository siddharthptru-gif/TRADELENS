import React from 'react';
import { cn } from '../../lib/utils';

interface FloatingLabelProps {
  text: string;
  className?: string;
  lineDirection?: 'top' | 'bottom' | 'left' | 'right';
}

export function FloatingLabel({ text, className, lineDirection = 'bottom' }: FloatingLabelProps) {
  return (
    <div className={cn("absolute z-30 flex flex-col items-center", className)}>
      {lineDirection === 'bottom' && <div className="w-[1px] h-12 bg-gradient-to-b from-white/20 to-transparent -mb-2"></div>}
      {lineDirection === 'right' && <div className="absolute left-full top-1/2 w-12 h-[1px] bg-gradient-to-r from-white/20 to-transparent -ml-2"></div>}
      
      <div className="glass-panel px-3 py-1.5 rounded-full text-[10px] md:text-xs font-mono tracking-widest text-white/80 whitespace-nowrap border-white/20 shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
        {text}
      </div>
      
      {lineDirection === 'top' && <div className="w-[1px] h-12 bg-gradient-to-t from-white/20 to-transparent -mt-2"></div>}
      {lineDirection === 'left' && <div className="absolute right-full top-1/2 w-12 h-[1px] bg-gradient-to-l from-white/20 to-transparent -mr-2"></div>}
    </div>
  );
}
