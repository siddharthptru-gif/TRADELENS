import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
  disclaimer?: boolean;
}

export function PageHeader({ title, subtitle, badge, actions, disclaimer }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-serif text-white">{title}</h1>
            {badge}
          </div>
          {subtitle && <p className="text-sm text-white/60">{subtitle}</p>}
        </div>
        {actions && (
          <div className="flex items-center gap-3 shrink-0">
            {actions}
          </div>
        )}
      </div>
      
      {disclaimer && (
        <div className="mt-6 p-4 rounded-xl border border-white/10 bg-white/5 flex items-start gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-1.5 shrink-0" />
          <p className="text-xs text-white/70 font-mono">
            Educational analysis only. Not financial advice. Always verify with your own research.
          </p>
        </div>
      )}
    </div>
  );
}
