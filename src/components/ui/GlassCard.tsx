import React from 'react';
import { cn } from '../../lib/utils'; // if exists, but I'll make a local utils.ts or just use clsx and tailwind-merge directly
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glow?: boolean;
}

export function GlassCard({ children, className, glow = false, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-xl overflow-hidden",
        glow && "shadow-[0_0_24px_rgba(16,224,160,0.1)] border-[--color-tradelens-green]/20",
        className
      )}
      {...props}
    >
      {glow && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-1 bg-[--color-tradelens-green] opacity-20 blur-md rounded-full pointer-events-none" />
      )}
      {children}
    </div>
  );
}
