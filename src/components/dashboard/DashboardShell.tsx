import React from 'react';
import { useDashboardData } from '../../hooks/useDashboardData';
import { DashboardSkeleton } from './DashboardSkeleton';
import { WelcomeHeader } from './WelcomeHeader';
import { PlanUsageCard } from './PlanUsageCard';
import { ScansRemainingRing } from './ScansRemainingRing';
import { QuickUploadCard } from './QuickUploadCard';
import { RecentScansGrid } from './RecentScansGrid';
import { QualityHistoryCard } from './QualityHistoryCard';
import { JournalSummaryCard } from './JournalSummaryCard';
import { WatchlistMiniCard } from './WatchlistMiniCard';
import { SavedReportsCard } from './SavedReportsCard';

export function DashboardShell() {
  const data = useDashboardData();

  if (data.loading) {
    return <DashboardSkeleton />;
  }

  // Dashboard desktop grid layout:
  // Row 1: PlanUsage (1), ScansRing (1), QuickUpload (2)
  // Row 2: RecentScans (4)
  // Row 3: QualityHistory (1), JournalSummary (1), Watchlist (1), SavedReports (1)

  return (
    <div className="animate-in fade-in duration-700">
      <WelcomeHeader userRecord={data.userRecord} />
      
      {data.error && (
        <div className="p-4 mb-6 bg-[#FF5C7A]/10 border border-[#FF5C7A]/30 text-[#FF5C7A] text-sm rounded-xl">
          {data.error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <PlanUsageCard limits={data.usageLimits} />
        <ScansRemainingRing limits={data.usageLimits} />
        <div className="md:col-span-2">
          <QuickUploadCard />
        </div>
      </div>

      <div className="mb-6">
        <RecentScansGrid scans={data.recentScans} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <QualityHistoryCard stats={data.stats} />
        <JournalSummaryCard entries={data.journalEntries} />
        <WatchlistMiniCard items={data.watchlistItems} />
        <SavedReportsCard saved={data.savedReports} />
      </div>
    </div>
  );
}
