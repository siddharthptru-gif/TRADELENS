import React from 'react';
import { AnalysisReportRecord } from '../../types/report';
import { ChartScan } from '../../types/dashboard';
import { Shield, Target, Activity } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Breadcrumbs } from '../layout/Breadcrumbs';

export function ReportHeader({ report, scan }: { report: AnalysisReportRecord, scan: ChartScan | null }) {
  const symbol = scan?.symbol || "Unknown Symbol";
  const marketType = scan?.marketType || "Analysis";
  const timeframe = scan?.timeframe || "Unknown TF";
  const dateStr = new Date(report.createdAt).toLocaleString();

  return (
    <div className="sticky top-0 z-40 w-full bg-[#020403]/80 backdrop-blur-xl border-b border-white/5 py-4 px-6 md:px-12">
      <div className="max-w-[1600px] mx-auto">
        <Breadcrumbs items={[
          { label: 'Dashboard', to: '/dashboard' },
          { label: 'Reports', to: '/reports' },
          { label: `${symbol} Analysis` }
        ]} />
        
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-2xl font-serif">{symbol}</h1>
              <span className="px-2 py-0.5 rounded text-[10px] uppercase tracking-widest border border-white/10 text-white/50">{marketType}</span>
              <span className="px-2 py-0.5 rounded text-[10px] uppercase tracking-widest border border-white/10 text-white/50">{timeframe}</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted">
              <span>{dateStr}</span>
              <div className="w-1 h-1 rounded-full bg-white/20"></div>
              <span className="flex items-center gap-1.5 text-[#8CFF3F]">
                <Shield className="w-3 h-3" />
                {report.finalStance || report.fullReport?.ifIWereAnalyzing?.stanceLabel || "Unknown Stance"}
              </span>
            </div>
          </div>

          <div className="flex items-stretch gap-3">
            <div className="flex flex-col items-center justify-center px-4 py-2 bg-white/5 border border-white/10 rounded-xl min-w-[100px]">
               <span className="text-[10px] text-white/50 uppercase tracking-widest mb-1 flex items-center gap-1"><Activity className="w-3 h-3"/> Score</span>
               <span className="text-xl font-bold text-[#8CFF3F] leading-none">{report.tradeQualityScore}/100</span>
            </div>
            <div className="flex flex-col items-center justify-center px-4 py-2 bg-white/5 border border-white/10 rounded-xl min-w-[100px]">
               <span className="text-[10px] text-white/50 uppercase tracking-widest mb-1 flex items-center gap-1"><Target className="w-3 h-3"/> Risk</span>
               <span className={cn(
                 "text-sm font-bold uppercase", 
                 report.riskLevel === 'low' ? "text-[#8CFF3F]" : 
                 report.riskLevel === 'extreme' ? "text-[#FF5C7A]" : "text-yellow-400"
               )}>{report.riskLevel}</span>
            </div>
            <div className="hidden sm:flex flex-col items-center justify-center px-4 py-2 bg-white/5 border border-white/10 rounded-xl min-w-[100px]">
               <span className="text-[10px] text-white/50 uppercase tracking-widest mb-1">Confidence</span>
               <span className="text-sm font-bold text-white/90">{(report.analysisConfidence * 100).toFixed(0)}%</span>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
