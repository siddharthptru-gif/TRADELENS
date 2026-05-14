import React, { ReactNode, HTMLAttributes } from 'react';
import { cn } from '../lib/utils';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  tilt?: boolean;
}

export default function GlassCard({ children, className, glow = false, tilt = false, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        'glass-panel relative overflow-hidden transition-transform duration-500',
        tilt && 'hover:-translate-y-2 hover:rotate-1 z-10',
        className
      )}
      {...props}
    >
      {glow && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[50%] bg-[--color-tradelens-green]/10 blur-3xl rounded-full pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100"></div>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
