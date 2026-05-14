export type MarketType = 'stock' | 'crypto' | 'forex' | 'commodity' | 'index' | 'futures' | 'unknown';

export type Timeframe = '1m' | '3m' | '5m' | '15m' | '30m' | '1h' | '4h' | '1D' | '1W' | '1M' | 'unknown';

export type TradingStyle = 'scalping' | 'intraday' | 'swing' | 'positional' | 'unknown';

export type RiskProfile = 'low' | 'medium' | 'high' | 'unknown';

export type ScanStatus = 'uploading' | 'queued' | 'analyzing' | 'validating' | 'completed' | 'failed';

export type StanceLabel = 'Avoid for now' | 'Watchlist only' | 'Wait for confirmation' | 'Possible bullish setup' | 'Possible bearish setup' | 'High-risk setup' | 'Clean setup but needs confirmation' | 'No clear trade setup';

export type UserPlan = 'free' | 'starter' | 'pro' | 'elite';

export interface UserRecord {
  uid: string;
  email: string | null;
  plan: UserPlan;
  isGuest: boolean;
  createdAt: number;
}

export interface UserProfile {
  experienceLevel: string;
  preferredMarkets: MarketType[];
  tradingStyle: TradingStyle;
  riskProfile: RiskProfile;
  defaultTimeframe: Timeframe;
  updatedAt: number;
}

export interface ChartScan {
  scanId: string;
  ownerUid: string;
  status: ScanStatus;
  createdAt: number;
  marketType: MarketType;
  timeframe: Timeframe;
  symbol: string | null;
  imagePath: string;
  imageUrl: string;
  reportId: string | null;
}

export interface AnalysisReportSummary {
  reportId: string;
  scanId: string;
  ownerUid: string;
  createdAt: number;
  tradeQualityScore: number;
  finalStance: StanceLabel;
  trendDirection: string;
  riskLevel: string;
  quickSummary: string;
}

export interface UsageLimits {
  plan: UserPlan;
  dailyLimit: number;
  monthlyLimit: number;
  dailyUsed: number;
  monthlyUsed: number;
}
