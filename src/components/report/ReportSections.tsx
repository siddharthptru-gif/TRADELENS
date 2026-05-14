import React from 'react';
import { ReportSection } from './Shared';
import { 
  AnalysisFullReport, 
  RiskManagement, 
  SupportResistance, 
  TradeQualityScore 
} from '../../types/report';
import { Activity, LayoutGrid, AlertCircle, TrendingUp, Network, CandlestickChart, Activity as PriceActionIcon, Layers, PackageMinus, LocateFixed, GitMerge, BarChart2, Clock, AlertTriangle, ShieldAlert, CheckSquare, XOctagon, UserCircle2, Gavel } from 'lucide-react';
import { cn } from '../../lib/utils';

// --- Small Reusables ---
function KeyValueRow({ label, value, valueClass }: { label: string, value: React.ReactNode, valueClass?: string }) {
  return (
    <div className="flex justify-between items-start py-3 border-b border-white/5 last:border-0 last:pb-0">
      <span className="text-sm text-white/50">{label}</span>
      <span className={cn("text-sm font-medium text-right max-w-[60%]", valueClass || "text-white/90")}>{value || "Not available"}</span>
    </div>
  );
}

// --- Specific Cards ---
export function QuickSummaryCard({ data }: { data: string }) {
  return (
    <ReportSection id="summary" title="Quick Summary" icon={<Activity className="w-4 h-4" />}>
      <p className="text-sm leading-relaxed text-white/90">{data || "No summary available."}</p>
    </ReportSection>
  );
}

export function VisibleInfoCard({ data }: { data: any }) {
  if (!data) return null;
  return (
    <ReportSection id="visible-info" title="Visible Information" icon={<LayoutGrid className="w-4 h-4" />}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <KeyValueRow label="Symbol Visible" value={data.symbolVisible ? "Yes" : "No"} valueClass={data.symbolVisible ? "text-[#8CFF3F]" : "text-white/50"} />
        <KeyValueRow label="Timeframe Visible" value={data.timeframeVisible ? "Yes" : "No"} valueClass={data.timeframeVisible ? "text-[#8CFF3F]" : "text-white/50"} />
        <KeyValueRow label="Volume Visible" value={data.volumeVisible ? "Yes" : "No"} valueClass={data.volumeVisible ? "text-[#8CFF3F]" : "text-white/50"} />
        <KeyValueRow label="Price Axis Visible" value={data.priceAxisVisible ? "Yes" : "No"} valueClass={data.priceAxisVisible ? "text-[#8CFF3F]" : "text-white/50"} />
      </div>
    </ReportSection>
  );
}

export function ScreenshotQualityCard({ quality, missing }: { quality: any, missing: string[] }) {
  if (!quality) return null;
  const isPoor = quality.quality === 'poor';
  return (
    <ReportSection id="quality" title="Screenshot Quality" icon={<AlertCircle className="w-4 h-4" />}>
      <KeyValueRow 
        label="Overall Quality" 
        value={<span className="capitalize">{quality.quality}</span>} 
        valueClass={isPoor ? "text-[#FF5C7A]" : "text-[#8CFF3F]"} 
      />
      {quality.issues?.length > 0 && (
        <div className="mt-4">
          <h4 className="text-xs text-white/50 uppercase tracking-widest mb-2">Issues</h4>
          <ul className="list-disc pl-4 space-y-1">
            {quality.issues.map((i: string, idx: number) => (
              <li key={idx} className="text-sm text-[#FF5C7A]/80">{i}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="mt-4 pt-4 border-t border-white/5">
        <h4 className="text-xs text-white/50 uppercase tracking-widest mb-2">Missing Data</h4>
        {missing && missing.length > 0 ? (
          <ul className="list-disc pl-4 space-y-1">
            {missing.map((m, i) => <li key={i} className="text-sm text-white/70">{m}</li>)}
          </ul>
        ) : (
          <p className="text-sm text-white/50">No major missing fields detected.</p>
        )}
      </div>
    </ReportSection>
  );
}

export function TrendAnalysisCard({ data }: { data: any }) {
  if (!data) return null;
  return (
    <ReportSection id="trend" title="Trend Analysis" icon={<TrendingUp className="w-4 h-4" />}>
      <div className="flex justify-between items-center pb-4 border-b border-white/5 mb-4">
        <span className="text-sm text-white/70">Direction</span>
        <span className={cn("text-sm font-medium capitalize", 
          data.direction === 'bullish' ? "text-[#8CFF3F]" : 
          data.direction === 'bearish' ? "text-[#FF5C7A]" : "text-yellow-400"
        )}>
          {data.direction || "Unknown"}
        </span>
      </div>
      <div className="flex justify-between items-center pb-4 border-b border-white/5 mb-4">
        <span className="text-sm text-white/70">Strength</span>
        <span className="text-sm font-medium capitalize text-white/90">{data.strength || "Unknown"}</span>
      </div>
      <p className="text-sm text-white/80 leading-relaxed">{data.details || "Not available"}</p>
    </ReportSection>
  );
}

export function MarketStructureCard({ data }: { data: string }) {
  return (
    <ReportSection id="structure" title="Market Structure" icon={<Network className="w-4 h-4" />}>
      <p className="text-sm leading-relaxed text-white/90 whitespace-pre-line">{data || "Not available"}</p>
    </ReportSection>
  );
}

export function CandlestickAnalysisCard({ data }: { data: string }) {
  return (
    <ReportSection id="candlestick" title="Candlestick Analysis" icon={<CandlestickChart className="w-4 h-4" />}>
      <p className="text-sm leading-relaxed text-white/90 whitespace-pre-line">{data || "Not available"}</p>
    </ReportSection>
  );
}

export function PriceActionCard({ data }: { data: string }) {
  return (
    <ReportSection id="price-action" title="Price Action Reading" icon={<PriceActionIcon className="w-4 h-4" />}>
      <p className="text-sm leading-relaxed text-white/90 whitespace-pre-line">{data || "Not available"}</p>
    </ReportSection>
  );
}

export function SupportResistanceCard({ data }: { data: SupportResistance }) {
  if (!data) return null;
  return (
    <ReportSection id="sr-zones" title="Support & Resistance" icon={<Layers className="w-4 h-4" />}>
      <p className="text-sm text-white/80 mb-6">{data.narrative}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-xs text-[#8CFF3F] mb-3 uppercase tracking-wider">Key Support</h4>
          <ul className="space-y-2">
            {(data.keySupport || []).map((s, i) => (
              <li key={i} className="text-sm font-mono text-white/80 flex items-start gap-2">
                <span className="text-[#8CFF3F] shrink-0 mt-0.5">•</span> 
                {s}
              </li>
            ))}
            {(!data.keySupport || data.keySupport.length === 0) && <li className="text-sm text-white/50">None visible</li>}
          </ul>
        </div>
        <div>
          <h4 className="text-xs text-[#FF5C7A] mb-3 uppercase tracking-wider">Key Resistance</h4>
          <ul className="space-y-2">
            {(data.keyResistance || []).map((s, i) => (
              <li key={i} className="text-sm font-mono text-white/80 flex items-start gap-2">
                <span className="text-[#FF5C7A] shrink-0 mt-0.5">•</span> 
                {s}
              </li>
            ))}
            {(!data.keyResistance || data.keyResistance.length === 0) && <li className="text-sm text-white/50">None visible</li>}
          </ul>
        </div>
      </div>
    </ReportSection>
  );
}

export function SupplyDemandCard({ data }: { data: string }) {
  return (
    <ReportSection id="supply-demand" title="Supply & Demand" icon={<PackageMinus className="w-4 h-4" />}>
      <p className="text-sm leading-relaxed text-white/90 whitespace-pre-line">{data || "Not available"}</p>
    </ReportSection>
  );
}

export function SmartMoneyCard({ data }: { data: string }) {
  return (
    <ReportSection id="smart-money" title="Smart Money Clues" icon={<LocateFixed className="w-4 h-4" />}>
      <p className="text-sm leading-relaxed text-white/90 whitespace-pre-line">{data || "Not available"}</p>
    </ReportSection>
  );
}

export function PatternDetectionCard({ data }: { data: string[] }) {
  return (
    <ReportSection id="patterns" title="Pattern Detection" icon={<GitMerge className="w-4 h-4" />}>
      {data && data.length > 0 ? (
        <ul className="space-y-3">
          {data.map((p, i) => (
            <li key={i} className="p-4 bg-white/5 border border-white/5 rounded-xl text-sm text-white/90">
              {p}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-white/50">No clear patterns detected.</p>
      )}
    </ReportSection>
  );
}

export function VolumeIndicatorCard({ data }: { data: string }) {
  return (
    <ReportSection id="volume" title="Volume / Indicators" icon={<BarChart2 className="w-4 h-4" />}>
      <p className="text-sm leading-relaxed text-white/90 whitespace-pre-line">{data || "Not available"}</p>
    </ReportSection>
  );
}

export function MultiTimeframeCard({ data }: { data: string }) {
  return (
    <ReportSection id="mtf" title="Multi-Timeframe Context" icon={<Clock className="w-4 h-4" />}>
      <p className="text-sm leading-relaxed text-white/90 whitespace-pre-line">{data || "Not available"}</p>
    </ReportSection>
  );
}

export function ScenarioCards({ bullish, bearish, neutral }: { bullish: string, bearish: string, neutral: string }) {
  return (
    <div className="space-y-6">
      <ReportSection id="scen-bull" title="Possible Bullish Scenario" icon={<TrendingUp className="w-4 h-4 text-[#8CFF3F]" />}>
        <p className="text-sm leading-relaxed text-white/90 whitespace-pre-line">{bullish || "Not available"}</p>
      </ReportSection>
      <ReportSection id="scen-bear" title="Possible Bearish Scenario" icon={<TrendingUp className="w-4 h-4 text-[#FF5C7A] rotate-180 scale-x-[-1]" />}>
        <p className="text-sm leading-relaxed text-white/90 whitespace-pre-line">{bearish || "Not available"}</p>
      </ReportSection>
      <ReportSection id="scen-neu" title="Neutral / No-Trade Scenario" icon={<AlertTriangle className="w-4 h-4 text-yellow-500" />}>
        <p className="text-sm leading-relaxed text-white/90 whitespace-pre-line">{neutral || "Not available"}</p>
      </ReportSection>
    </div>
  );
}

export function RiskManagementCard({ data }: { data: RiskManagement }) {
  if (!data) return null;
  return (
    <ReportSection id="risk" title="Risk & Invalidation" icon={<ShieldAlert className="w-4 h-4" />}>
      <KeyValueRow 
        label="Risk Level" 
        value={<span className="capitalize">{data.riskLevel}</span>} 
        valueClass={data.riskLevel === 'low' ? "text-[#8CFF3F]" : data.riskLevel === 'extreme' ? "text-[#FF5C7A] font-bold" : "text-yellow-400"} 
      />
      <KeyValueRow label="Invalidation Level" value={data.invalidationLevel} valueClass="font-mono text-white/90" />
      <div className="mt-4 pt-4 border-t border-white/5">
        <h4 className="text-xs text-white/50 uppercase tracking-widest mb-2">Position Sizing Note</h4>
        <p className="text-sm text-white/80">{data.positionSizingNote}</p>
      </div>
    </ReportSection>
  );
}

export function TradeQualityScoreCard({ data }: { data: TradeQualityScore }) {
  if (!data) return null;
  
  const score = data.score;
  const breakD = data.breakdown || {} as any;
  
  const BreakdownRow = ({ label, max, val }: { label: string, max: number, val: number }) => (
    <div className="mb-3">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-white/60">{label}</span>
        <span className="font-mono text-white/90">{val || 0}/{max}</span>
      </div>
      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
        <div className="h-full bg-[#8CFF3F]/50 rounded-full" style={{ width: `${Math.min(100, Math.max(0, ((val||0)/max)*100))}%` }} />
      </div>
    </div>
  );

  return (
    <ReportSection id="score" title="Trade Quality Score" icon={<CheckSquare className="w-4 h-4" />}>
      <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
        <div className="flex flex-col items-center justify-center w-32 h-32 rounded-full border-4 border-[#8CFF3F]/20 relative">
          <span className="text-4xl font-bold text-[#8CFF3F]">{score}</span>
          <span className="text-[10px] text-white/50 uppercase tracking-widest absolute bottom-4">Score</span>
        </div>
        <div className="flex-1 text-sm text-white/70">
          <p>Even a 100/100 score is not a guarantee. This score reflects technical structure alignment according to common principles. Always use proper risk management.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
        <div>
          <BreakdownRow label="Trend Clarity" max={15} val={breakD.trendClarity} />
          <BreakdownRow label="Market Structure" max={15} val={breakD.marketStructureQuality} />
          <BreakdownRow label="Support & Resistance" max={15} val={breakD.supportResistanceClarity} />
          <BreakdownRow label="Pattern Reliability" max={10} val={breakD.patternReliability} />
        </div>
        <div>
          <BreakdownRow label="Volume Confirmation" max={10} val={breakD.volumeConfirmation} />
          <BreakdownRow label="Risk/Reward Quality" max={15} val={breakD.riskRewardQuality} />
          <BreakdownRow label="Confirmation Strength" max={10} val={breakD.confirmationStrength} />
          <BreakdownRow label="Timeframe/Clarity" max={10} val={breakD.screenshotTimeframeClarity} />
        </div>
      </div>
    </ReportSection>
  );
}

export function ConfirmationChecklistCard({ data }: { data: string[] }) {
  return (
    <ReportSection id="checklist" title="Confirmation Checklist" icon={<CheckSquare className="w-4 h-4" />}>
      {data && data.length > 0 ? (
        <ul className="space-y-3">
          {data.map((c, i) => (
            <li key={i} className="flex items-start gap-3 p-3 bg-white/[0.02] border border-white/5 rounded-lg text-sm text-white/80">
              <span className="text-[#8CFF3F] shrink-0 mt-0.5">•</span>
              {c}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-white/50">No checklist items provided.</p>
      )}
    </ReportSection>
  );
}

export function AvoidConditionsCard({ data }: { data: string[] }) {
  return (
    <ReportSection id="avoid" title="Avoid-Trade Conditions" icon={<XOctagon className="w-4 h-4 text-[#FF5C7A]" />}>
      {data && data.length > 0 ? (
        <ul className="space-y-3">
          {data.map((c, i) => (
            <li key={i} className="flex items-start gap-3 p-3 bg-[#FF5C7A]/5 border border-[#FF5C7A]/10 rounded-lg text-sm text-white/80">
              <AlertTriangle className="w-4 h-4 text-[#FF5C7A] shrink-0 mt-0.5" />
              {c}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-white/50">No specific conditions provided.</p>
      )}
    </ReportSection>
  );
}

export function TraderBiasCard({ data }: { data: any }) {
  if (!data) return null;
  return (
    <ReportSection id="bias" title="If I Were Analyzing This Chart" glowing icon={<UserCircle2 className="w-4 h-4" />}>
      <div className="space-y-6">
        <div>
          <h4 className="text-xs text-white/50 uppercase tracking-widest mb-2">My Bias</h4>
          <p className="text-sm text-white/90 leading-relaxed whitespace-pre-line">{data.myBias}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
              <h4 className="text-xs text-white/50 uppercase tracking-widest mb-2">What I would wait for</h4>
              <p className="text-sm text-white/80 leading-relaxed whitespace-pre-line">{data.whatIWouldWaitFor}</p>
          </div>
          <div>
              <h4 className="text-xs text-white/50 uppercase tracking-widest mb-2">What would make me avoid</h4>
              <p className="text-sm text-white/80 leading-relaxed whitespace-pre-line">{data.whatWouldMakeMeAvoid}</p>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5">
          <div className="flex items-center gap-3 mb-2">
            <h4 className="text-xs text-white/50 uppercase tracking-widest">Final Educational View</h4>
            <span className="px-2 py-0.5 rounded text-[10px] uppercase tracking-widest border border-white/10 bg-white/5 text-[#8CFF3F]">{data.stanceLabel}</span>
          </div>
          <p className="text-sm text-white/90 leading-relaxed font-medium whitespace-pre-line">{data.finalEducationalView}</p>
        </div>
        
        <p className="text-[10px] text-white/30 uppercase tracking-wider mt-4">This is an educational analysis and personal-style market bias, not financial advice or a recommendation to buy or sell.</p>
      </div>
    </ReportSection>
  );
}

export function FinalVerdictCard({ data }: { data: string }) {
  return (
    <ReportSection id="verdict" title="Educational Final Verdict" icon={<Gavel className="w-4 h-4" />}>
      <p className="text-sm leading-relaxed text-white/90 whitespace-pre-line font-medium">{data || "Not available"}</p>
    </ReportSection>
  );
}
