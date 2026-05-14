import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function EmptyState({ title, description, icon: Icon, action, className }: { title: string; description: string; icon: React.ElementType; action?: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-12 text-center rounded-3xl border border-white/5 bg-white/[0.02]", className)}>
      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
        <Icon className="w-8 h-8 text-white/20" />
      </div>
      <h3 className="text-xl font-serif text-white mb-2">{title}</h3>
      <p className="text-sm text-white/40 max-w-md mx-auto mb-8">{description}</p>
      {action}
    </div>
  );
}
