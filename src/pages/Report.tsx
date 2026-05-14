import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useReportData } from '../hooks/useReportData';
import { GradientButton } from '../components/ui/GradientButton';
import { AlertTriangle, ArrowLeft } from 'lucide-react';

import { ReportHeader } from '../components/report/ReportHeader';
import { ReportTOC } from '../components/report/ReportTOC';
import { ChartPreviewPanel } from '../components/report/ChartPreviewPanel';
import { ReportActionsBar } from '../components/report/ReportActionsBar';
import { ReportSection } from '../components/report/Shared';
import { PageTransition } from '../components/ui/PageTransition';
import { AppErrorState } from '../components/ui/AppErrorState';

import {
  QuickSummaryCard,
  VisibleInfoCard,
  ScreenshotQualityCard,
  TrendAnalysisCard,
  MarketStructureCard,
  CandlestickAnalysisCard,
  PriceActionCard,
  SupportResistanceCard,
  SupplyDemandCard,
  SmartMoneyCard,
  PatternDetectionCard,
  VolumeIndicatorCard,
  MultiTimeframeCard,
  ScenarioCards,
  RiskManagementCard,
  TradeQualityScoreCard,
  ConfirmationChecklistCard,
  AvoidConditionsCard,
  TraderBiasCard,
  FinalVerdictCard
} from '../components/report/ReportSections';

export default function Report() {
  const { reportId } = useParams();
  const navigate = useNavigate();
  
  const { 
    loading, error, report, fullReport, scan, 
    saveReport, addToJournal, addToWatchlist, 
    isSaved, actionLoading 
  } = useReportData(reportId);

  // Intersection Observer for highlighting TOC (basic implementation)
  const [activeSection, setActiveSection] = useState('summary');

  useEffect(() => {
    if (loading || !fullReport) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [loading, fullReport]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center min-h-[50vh]">
        <div className="w-12 h-12 border-t-2 border-[#8CFF3F] border-solid rounded-full animate-spin mb-4"></div>
        <p className="text-white/50 text-sm tracking-widest uppercase">Loading Artificial Intelligence Report</p>
      </div>
    );
  }

  if (error || !report || !fullReport) {
    return (
      <AppErrorState 
        title="Error Loading Report" 
        message={error || "Report data is incomplete or unavailable."} 
      />
    );
  }

  return (
    <PageTransition className="pb-32 font-sans selection:bg-[#8CFF3F]/30 -mt-4 md:-mt-8">
      <ReportHeader report={report} scan={scan} />
      
      <div className="max-w-[1600px] mx-auto py-8 flex flex-col lg:flex-row items-start gap-8 lg:gap-12 relative">
        <ReportTOC activeId={activeSection} />

        <main className="flex-1 space-y-8 w-full min-w-0">
           <QuickSummaryCard data={fullReport.quickSummary} />
           <VisibleInfoCard data={fullReport.visibleInformation} />
           <ScreenshotQualityCard quality={fullReport.screenshotQuality} missing={fullReport.missingData} />
           <TrendAnalysisCard data={fullReport.trendAnalysis} />
           <MarketStructureCard data={fullReport.marketStructure} />
           <CandlestickAnalysisCard data={fullReport.candlestickAnalysis} />
           <PriceActionCard data={fullReport.priceAction} />
           <SupportResistanceCard data={fullReport.supportResistance} />
           <SupplyDemandCard data={fullReport.supplyDemand} />
           <SmartMoneyCard data={fullReport.smartMoneyClues} />
           <PatternDetectionCard data={fullReport.patternDetection} />
           <VolumeIndicatorCard data={fullReport.volumeIndicatorAnalysis} />
           <MultiTimeframeCard data={fullReport.multiTimeframeContext} />
           
           <ScenarioCards 
             bullish={fullReport.bullishScenario} 
             bearish={fullReport.bearishScenario} 
             neutral={fullReport.neutralScenario} 
           />
           
           <RiskManagementCard data={fullReport.riskManagement} />
           <TradeQualityScoreCard data={fullReport.tradeQualityScore} />
           <ConfirmationChecklistCard data={fullReport.confirmationChecklist} />
           <AvoidConditionsCard data={fullReport.avoidTradeConditions} />
           <TraderBiasCard data={fullReport.ifIWereAnalyzing} />
           <FinalVerdictCard data={fullReport.finalVerdict} />

           <ReportSection id="disclaimer" title="Legal & Risk Disclaimer" icon={<AlertTriangle className="w-4 h-4 text-yellow-500" />}>
             <div className="p-4 bg-yellow-500/5 border border-yellow-500/10 rounded-xl">
               <p className="text-xs text-white/50 leading-relaxed font-mono">
                 {fullReport.disclaimer || "TradeLens AI provides educational technical analysis only... Always do your own research..."}
               </p>
             </div>
           </ReportSection>
        </main>

        <ChartPreviewPanel scan={scan} />
      </div>

      <ReportActionsBar 
        onSave={saveReport} 
        onJournal={addToJournal} 
        onWatchlist={addToWatchlist} 
        isSaved={isSaved} 
        loading={actionLoading} 
      />
    </PageTransition>
  );
}
