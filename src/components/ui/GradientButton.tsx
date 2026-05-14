import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export function GradientButton({ children, className, variant = 'primary', ...props }: GradientButtonProps) {
  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center px-8 py-4 rounded-full font-bold transition-all active:scale-95 text-sm md:text-base",
        variant === 'primary' && "bg-[#8CFF3F] text-black shadow-[0_0_15px_rgba(140,255,63,0.2)] hover:shadow-[0_0_25px_rgba(140,255,63,0.4)] hover:bg-[#B6FF72]",
        variant === 'secondary' && "glass-panel text-white hover:bg-white/10 border border-white/10",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
