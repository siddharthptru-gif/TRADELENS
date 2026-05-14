import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function StatusPill({ status, className }: { status: string; className?: string }) {
  return (
    <div className={cn("inline-flex items-center px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase font-mono tracking-widest text-white/50", className)}>
      {status}
    </div>
  );
}
