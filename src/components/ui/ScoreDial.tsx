import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ScoreDialProps {
  score: number;
  label?: string;
  className?: string;
}

export function ScoreDial({ score, label, className }: ScoreDialProps) {
  // Determine color based on score (red -> amber -> green)
  let colorClass = "text-white/20";
  if (score >= 80) colorClass = "text-[--color-tradelens-green]";
  else if (score >= 50) colorClass = "text-[#F5B544]";
  else if (score > 0) colorClass = "text-[#FF5C7A]";

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <div className="relative w-24 h-24 flex items-center justify-center rounded-full border-4 border-white/5">
        <span className={cn("text-3xl font-serif font-bold", colorClass)}>{score}</span>
      </div>
      {label && <span className="mt-2 text-xs text-white/50 uppercase tracking-widest font-mono">{label}</span>}
      <div className="mt-2 text-[10px] text-white/30 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
        Even 100/100 is not a guarantee
      </div>
    </div>
  );
}
