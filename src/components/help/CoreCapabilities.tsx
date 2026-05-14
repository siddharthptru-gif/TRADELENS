import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { CheckCircle2, XCircle } from 'lucide-react';

export function CoreCapabilities() {
  return (
    <div className="grid md:grid-cols-2 gap-8 mb-16">
      <GlassCard className="p-8 border-[#8CFF3F]/20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#8CFF3F]" />
        <h3 className="text-xl font-serif text-white mb-6">What TradeLens AI Does</h3>
        <ul className="space-y-4">
          <ListItem icon={<CheckCircle2 className="w-5 h-5 text-[#8CFF3F]" />} text="Explains visible chart structure and patterns" />
          <ListItem icon={<CheckCircle2 className="w-5 h-5 text-[#8CFF3F]" />} text="Identifies trend, support, and resistance levels" />
          <ListItem icon={<CheckCircle2 className="w-5 h-5 text-[#8CFF3F]" />} text="Shows possible bullish, bearish, or neutral scenarios" />
          <ListItem icon={<CheckCircle2 className="w-5 h-5 text-[#8CFF3F]" />} text="Highlights risk levels and invalidation points" />
          <ListItem icon={<CheckCircle2 className="w-5 h-5 text-[#8CFF3F]" />} text="Helps users journal and systematically review decisions" />
          <ListItem icon={<CheckCircle2 className="w-5 h-5 text-[#8CFF3F]" />} text="Points out missing data honestly when charts are unclear" />
        </ul>
      </GlassCard>

      <GlassCard className="p-8 border-[#FF5C7A]/20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#FF5C7A]" />
        <h3 className="text-xl font-serif text-[#FF5C7A] mb-6">What TradeLens AI Does NOT Do</h3>
        <ul className="space-y-4">
          <ListItem icon={<XCircle className="w-5 h-5 text-[#FF5C7A]" />} text="Does not provide financial advice" />
          <ListItem icon={<XCircle className="w-5 h-5 text-[#FF5C7A]" />} text="Does not give direct trading commands or signals" />
          <ListItem icon={<XCircle className="w-5 h-5 text-[#FF5C7A]" />} text="Does not guarantee any profits or outcomes" />
          <ListItem icon={<XCircle className="w-5 h-5 text-[#FF5C7A]" />} text="Does not replace a registered financial adviser" />
          <ListItem icon={<XCircle className="w-5 h-5 text-[#FF5C7A]" />} text="Does not know future market movements" />
          <ListItem icon={<XCircle className="w-5 h-5 text-[#FF5C7A]" />} text="Does not remove or minimize financial risk" />
        </ul>
      </GlassCard>
    </div>
  );
}

function ListItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <li className="flex items-start gap-4">
      <div className="shrink-0 mt-0.5">{icon}</div>
      <span className="text-sm text-white/80 leading-relaxed">{text}</span>
    </li>
  );
}
