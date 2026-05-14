import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  if (!items || items.length === 0) return null;

  return (
    <nav className="flex items-center text-xs font-mono uppercase tracking-widest text-white/40 mb-4 whitespace-nowrap overflow-x-auto pb-2 -mb-2">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <div key={index} className="flex items-center shrink-0">
            {item.to && !isLast ? (
              <Link to={item.to} className="hover:text-white transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? 'text-white/80' : ''}>
                {item.label}
              </span>
            )}
            
            {!isLast && <ChevronRight className="w-3 h-3 mx-2 opacity-50 shrink-0" />}
          </div>
        );
      })}
    </nav>
  );
}
