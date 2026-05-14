export interface UserRecord {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  plan: string;
  isGuest: boolean;
  createdAt: number;
  lastLoginAt: number;
}

export interface UserProfile {
  experienceLevel: string;
  preferredMarkets: string[];
  tradingStyle: string;
  riskProfile: string;
  defaultTimeframe: string;
  defaultMarketType: string;
  onboardingCompleted: boolean;
  preferences: {
    theme: string;
    language: string;
    showPositionSizing: boolean;
    showSmcConcepts: boolean;
  };
  updatedAt: number;
}

export interface UsageLimits {
  plan: string;
  dailyLimit: number;
  monthlyLimit: number;
  dailyUsed: number;
  monthlyUsed: number;
  dailyResetAt: number;
  monthlyResetAt: number;
  lastScanAt: number;
}

export type MarketType = 'stock' | 'crypto' | 'forex' | 'commodity' | 'index' | 'futures' | 'unknown';
export type Timeframe = '1m' | '3m' | '5m' | '15m' | '30m' | '1h' | '4h' | '1D' | '1W' | '1M' | 'unknown';
export type TradingStyle = 'scalping' | 'intraday' | 'swing' | 'positional' | 'unknown';
export type RiskProfile = 'low' | 'medium' | 'high' | 'unknown';
export type ScanStatus = 'uploading' | 'queued' | 'analyzing' | 'validating' | 'completed' | 'failed';

export interface ChartScan {
  scanId: string;
  ownerUid: string;
  imagePath?: string | null;
  imageUrl?: string | null;
  originalImagePath?: string | null;
  originalImageUrl?: string | null;
  compressedImagePath?: string | null;
  compressedImageUrl?: string | null;
  marketType: MarketType;
  symbol: string | null;
  timeframe: Timeframe;
  currentPrice: number | null;
  tradingStyle: TradingStyle;
  riskProfile: RiskProfile;
  notes: string | null;
  accountSize: number | null;
  riskPercent: number | null;
  status: ScanStatus;
  errorCode: string | null;
  createdAt: number;
  startedAt: number | null;
  completedAt: number | null;
  reportId: string | null;
  promptVersion: string | null;
  modelUsed: string | null;
  
  // Previous keys for backward compatibility
  id?: string;
  userId?: string;
  error?: string;
}

export interface AnalysisReportSummary {
  id: string;
  scanId: string;
  userId: string;
  symbol: string;
  createdAt: number;
  tradeQualityScore: number;
  stance: 'bullish' | 'bearish' | 'neutral' | 'wait';
}

export interface SavedReport {
  id: string;
  reportId: string;
  userId: string;
  savedAt: number;
  notes?: string;
}

export interface JournalEntry {
  id: string;
  userId: string;
  reportId?: string;
  symbol: string;
  result: 'win' | 'loss' | 'breakeven' | 'skipped' | 'none';
  mistakes: string[];
  notes: string;
  createdAt: number;
}

export interface WatchlistItem {
  id: string;
  userId: string;
  symbol: string;
  market: string;
  timeframe: string;
  importantSupport: string;
  importantResistance: string;
  linkedReportsCount: number;
  createdAt: number;
}

export interface DashboardStats {
  scansRemaining: number;
  dailyUsed: number;
  dailyLimit: number;
  monthlyUsed: number;
  monthlyLimit: number;
  savedReportsCount: number;
  journalCount: number;
  watchlistCount: number;
  averageTradeQualityScore: number;
  recentScores: number[];
  totalScans: number;
  completedScans: number;
  failedScans: number;
  pendingScans: number;
}
