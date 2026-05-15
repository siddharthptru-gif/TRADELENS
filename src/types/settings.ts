export interface SettingsUserRecord {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  plan: string;
  isGuest: boolean;
  createdAt: number;
  lastLoginAt: number;
  disclaimerAcceptedAt?: number;
  termsAcceptedAt?: number;
  lastProfileUpdateAt?: number;
}

export interface SettingsUserProfile {
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

export interface SettingsUsageLimits {
  plan: string;
  dailyLimit: number;
  monthlyLimit: number;
  dailyUsed: number;
  monthlyUsed: number;
  dailyResetAt: number;
  monthlyResetAt: number;
  lastScanAt: number;
}

export interface SettingsSubscription {
  status: string;
  planId: string;
  currentPeriodStart: number;
  currentPeriodEnd: number;
  provider: string;
}

export interface SettingsDataCounts {
  scansCount: number;
  reportsCount: number;
  savedReportsCount: number;
  journalEntriesCount: number;
  watchlistItemsCount: number;
}

export type PreferenceMarket = 'stock' | 'crypto' | 'forex' | 'commodity' | 'index' | 'futures' | 'unknown';

export type SettingsTab = 
  | 'profile' 
  | 'preferences' 
  | 'defaults' 
  | 'privacy' 
  | 'safety' 
  | 'danger';
