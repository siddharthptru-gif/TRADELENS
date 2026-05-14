import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { StanceLabel } from '../../types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function StanceBadge({ stance, className }: { stance: StanceLabel; className?: string }) {
  let colorClass = "bg-white/10 text-white/70 border-white/20";
  
  switch (stance) {
    case 'Wait for confirmation':
    case 'Clean setup but needs confirmation':
      colorClass = "bg-[#F5B544]/10 text-[#F5B544] border-[#F5B544]/20";
      break;
    case 'Possible bullish setup':
      colorClass = "bg-[--color-tradelens-green]/10 text-[--color-tradelens-green] border-[--color-tradelens-green]/20";
      break;
    case 'Possible bearish setup':
    case 'Avoid for now':
    case 'High-risk setup':
      colorClass = "bg-[#FF5C7A]/10 text-[#FF5C7A] border-[#FF5C7A]/20";
      break;
    case 'Watchlist only':
    case 'No clear trade setup':
    default:
      break;
  }

  return (
    <span className={cn("inline-flex items-center px-3 py-1 rounded-full text-xs font-mono border", colorClass, className)}>
      {stance}
    </span>
  );
}
