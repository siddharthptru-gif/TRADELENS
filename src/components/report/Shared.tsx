import React from 'react';
import { cn } from '../../lib/utils';

export function GlassCard({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-6 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-md", className)} {...props}>
      {children}
    </div>
  );
}

export function ReportSection({ id, title, icon, className, children, glowing }: { id: string, title: string, icon?: React.ReactNode, className?: string, children: React.ReactNode, glowing?: boolean }) {
  return (
    <section id={id} className={cn("scroll-mt-24", className)}>
      <GlassCard className={cn(
        "relative overflow-hidden transition-all duration-300",
        glowing && "border-[#8CFF3F]/30 shadow-[0_0_30px_rgba(140,255,63,0.05)]"
      )}>
        {glowing && <div className="absolute top-0 right-0 w-32 h-32 bg-[#8CFF3F]/10 blur-[50px] rounded-full pointer-events-none" />}
        <h3 className="text-sm font-mono text-white/50 uppercase tracking-widest flex items-center gap-2 mb-6">
          {icon && <span className="text-white/30">{icon}</span>}
          {title}
        </h3>
        <div className="relative z-10">
          {children}
        </div>
      </GlassCard>
    </section>
  );
}
