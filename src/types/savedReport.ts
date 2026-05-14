import { AnalysisReportRecord } from './report';
import { ChartScan } from './dashboard';

export interface SavedReportRecord {
  reportId: string;
  scanId: string;
  savedAt: number;
  tags: string[];
  userNote: string;
}

export interface EnrichedSavedReport {
  savedData: SavedReportRecord;
  reportData: AnalysisReportRecord | null;
  scanData: ChartScan | null;
}

export interface ReportFilters {
  search: string;
  market: string;
  timeframe: string;
  stance: string;
  risk: string;
  scoreRange: string;
}

export type ReportSortOption = 
  | 'newest' 
  | 'oldest' 
  | 'highest-score' 
  | 'lowest-score' 
  | 'highest-confidence' 
  | 'symbol-asc';
