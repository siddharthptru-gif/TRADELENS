import React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function FormField({ label, className, ...props }: Props) {
  return (
    <div className={`flex flex-col gap-1.5 ${className || ''}`}>
      <label className="text-xs font-mono text-white/50 uppercase tracking-widest">{label}</label>
      <input 
        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#8CFF3F]/50 transition-colors placeholder:text-white/20 disabled:opacity-50"
        {...props} 
      />
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { label: string; value: string }[];
}

export function MetadataSelect({ label, options, className, ...props }: SelectProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className || ''}`}>
      <label className="text-xs font-mono text-white/50 uppercase tracking-widest">{label}</label>
      <div className="relative">
        <select 
          className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#8CFF3F]/50 transition-colors appearance-none disabled:opacity-50"
          {...props}
        >
          {options.map(o => (
            <option key={o.value} value={o.value} className="bg-[#020403] text-white py-1">{o.label}</option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/30">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </div>
      </div>
    </div>
  );
}
