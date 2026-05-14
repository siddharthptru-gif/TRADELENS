import { AnalysisReportRecord } from './report';
import { ChartScan } from './dashboard';

export interface WatchlistItem {
  watchlistId: string;
  symbol: string;
  market: string;
  timeframe: string;
  importantSupport?: string;
  importantResistance?: string;
  notes?: string;
  linkedReports?: string[];
  createdAt: number;
  updatedAt: number;
}

export interface EnrichedWatchlistItem {
  item: WatchlistItem;
  linkedReports: {
    reportId: string;
    report: AnalysisReportRecord;
    scan: ChartScan | null;
  }[];
  latestReport: AnalysisReportRecord | null;
  latestScan: ChartScan | null;
}

export interface WatchlistStats {
  totalItems: number;
  marketsTracked: number;
  reportsLinked: number;
  itemsWithoutLevels: number;
  mostTrackedMarket: string;
  recentlyUpdatedCount: number;
}

export interface WatchlistFilters {
  search: string;
  market: string;
  timeframe: string;
  linkedReports: string;
  levelStatus: string;
}

export type WatchlistSortOption = 
  | 'recently-updated'
  | 'newest'
  | 'oldest'
  | 'symbol-asc'
  | 'most-linked'
  | 'highest-score'
  | 'lowest-score';
