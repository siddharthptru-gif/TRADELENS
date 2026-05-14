import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { Check, Minus } from 'lucide-react';

export function FeatureMatrix() {
  const rows = [
    { name: 'Daily scans', free: '3', starter: 'Unlimited', pro: 'Unlimited', elite: 'Unlimited' },
    { name: 'Monthly scans', free: '30 (avg)', starter: '50', pro: '500', elite: '2000' },
    { name: 'AI report depth', free: 'Basic', starter: 'Full', pro: 'Advanced', elite: 'Deep' },
    { name: 'Saved reports', free: true, starter: true, pro: true, elite: true },
    { name: 'Trading journal', free: true, starter: true, pro: true, elite: true },
    { name: 'Watchlist', free: true, starter: true, pro: true, elite: true },
    { name: 'PDF export', free: false, starter: false, pro: true, elite: true },
    { name: 'Priority queue', free: false, starter: false, pro: true, elite: true },
    { name: 'Strategy templates', free: false, starter: false, pro: false, elite: true },
    { name: 'Advanced journal analytics', free: false, starter: false, pro: false, elite: true },
  ];

  return (
    <div className="mb-20">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-serif text-white mb-4">Compare Plans</h2>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#8CFF3F]/10 border border-[#8CFF3F]/20 text-[#8CFF3F] rounded-lg text-[10px] uppercase font-mono tracking-widest">
          Payment is NOT implemented. Paid plans are placeholders.
        </div>
      </div>

      <GlassCard className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-white/10 bg-black/40">
                <th className="py-4 px-6 text-sm font-serif text-white w-1/3">Features</th>
                <th className="py-4 px-6 text-sm font-serif text-white w-1/6 text-center">Free</th>
                <th className="py-4 px-6 text-sm font-serif text-[#8CFF3F] w-1/6 text-center">Starter</th>
                <th className="py-4 px-6 text-sm font-serif text-purple-400 w-1/6 text-center">Pro</th>
                <th className="py-4 px-6 text-sm font-serif text-blue-400 w-1/6 text-center">Elite</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {rows.map((row, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors">
                  <td className="py-4 px-6 text-sm text-white/80">{row.name}</td>
                  <td className="py-4 px-6 text-center"><TdValue val={row.free} /></td>
                  <td className="py-4 px-6 text-center"><TdValue val={row.starter} /></td>
                  <td className="py-4 px-6 text-center"><TdValue val={row.pro} /></td>
                  <td className="py-4 px-6 text-center"><TdValue val={row.elite} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-black/60 border-t border-white/5 text-center text-xs text-white/40">
          Paid plans are placeholders for future release. Current app uses Free plan limits unless backend subscription logic is connected.
        </div>
      </GlassCard>
    </div>
  );
}

function TdValue({ val }: { val: string | boolean }) {
  if (typeof val === 'boolean') {
    return val 
      ? <Check className="w-5 h-5 text-white/80 mx-auto" /> 
      : <Minus className="w-5 h-5 text-white/20 mx-auto" />;
  }
  return <span className="text-sm font-mono text-white/80">{val}</span>;
}
