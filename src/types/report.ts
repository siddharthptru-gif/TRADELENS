export interface VisibleInformation {
  symbolVisible: boolean;
  timeframeVisible: boolean;
  volumeVisible: boolean;
  priceAxisVisible: boolean;
}

export interface ScreenshotQuality {
  quality: "excellent" | "good" | "poor" | string;
  issues: string[];
}

export interface TrendAnalysis {
  direction: "bullish" | "bearish" | "ranging" | "unclear" | string;
  strength: "strong" | "weak" | "neutral" | string;
  details: string;
}

export interface SupportResistance {
  keySupport: string[];
  keyResistance: string[];
  narrative: string;
}

export interface RiskManagement {
  invalidationLevel: string;
  riskLevel: "low" | "medium" | "high" | "extreme" | string;
  positionSizingNote: string;
}

export interface TradeQualityScore {
  score: number;
  breakdown: {
    trendClarity: number;
    marketStructureQuality: number;
    supportResistanceClarity: number;
    patternReliability: number;
    volumeConfirmation: number;
    riskRewardQuality: number;
    confirmationStrength: number;
    screenshotTimeframeClarity: number;
  };
}

export interface TraderBias {
  myBias: string;
  whatIWouldWaitFor: string;
  whatWouldMakeMeAvoid: string;
  finalEducationalView: string;
  stanceLabel: string;
}

export interface AnalysisFullReport {
  analysisConfidence: number;
  quickSummary: string;
  visibleInformation: VisibleInformation;
  missingData: string[];
  screenshotQuality: ScreenshotQuality;
  trendAnalysis: TrendAnalysis;
  marketStructure: string;
  candlestickAnalysis: string;
  priceAction: string;
  supportResistance: SupportResistance;
  supplyDemand: string;
  smartMoneyClues: string;
  patternDetection: string[];
  volumeIndicatorAnalysis: string;
  multiTimeframeContext: string;
  bullishScenario: string;
  bearishScenario: string;
  neutralScenario: string;
  riskManagement: RiskManagement;
  tradeQualityScore: TradeQualityScore;
  confirmationChecklist: string[];
  avoidTradeConditions: string[];
  ifIWereAnalyzing: TraderBias;
  finalVerdict: string;
  disclaimer: string;
}

export interface AnalysisReportRecord {
  reportId: string;
  scanId: string;
  ownerUid: string;
  createdAt: number;
  analysisConfidence: number;
  quickSummary: string;
  finalStance: string;
  tradeQualityScore: number;
  riskLevel: string;
  trendDirection: string;
  fullReport: AnalysisFullReport;
}
