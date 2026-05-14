import { AnalysisReportRecord } from './report';
import { ChartScan } from './dashboard';

export type JournalResult = 'win' | 'loss' | 'breakeven' | 'skipped' | 'open';
export type EmotionalState = 'calm' | 'confident' | 'fearful' | 'greedy' | 'rushed' | 'frustrated' | 'neutral';
export type UserDecision = 'watchlist' | 'paper_trade' | 'entered' | 'skipped' | 'avoided';

export interface JournalEntry {
  journalId: string;
  reportId: string;
  scanId: string;
  symbol: string;
  market: string;
  timeframe: string;
  setupType?: string;
  aiStance?: string;
  userDecision?: UserDecision;
  entryPrice?: number;
  exitPrice?: number;
  result?: JournalResult;
  rMultiple?: number;
  emotionalState?: EmotionalState;
  mistakeNotes?: string;
  followUpNotes?: string;
  followUpImagePath?: string;
  followUpImageUrl?: string;
  lessonsLearned?: string;
  tags?: string[];
  mistakeTags?: string[];
  createdAt: number;
  updatedAt: number;
}

export interface EnrichedJournalEntry {
  journal: JournalEntry;
  report: AnalysisReportRecord | null;
  scan: ChartScan | null;
}

export interface JournalStats {
  totalEntries: number;
  openEntries: number;
  closedEntries: number;
  wins: number;
  losses: number;
  breakeven: number;
  skipped: number;
  averageRMultiple: number;
  mostCommonMistakeTag: string;
  needsReviewCount: number;
}

export interface JournalFilters {
  search: string;
  result: string;
  market: string;
  timeframe: string;
  aiStance: string;
  emotionalState: string;
  reviewStatus: string;
}

export type JournalSortOption = 'newest' | 'oldest' | 'symbol-asc' | 'best-r' | 'worst-r' | 'open-first';
