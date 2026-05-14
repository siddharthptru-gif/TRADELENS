export const reportSchema = {
  type: "object",
  properties: {
    analysisConfidence: { type: "number", minimum: 0, maximum: 1 },
    quickSummary: { type: "string" },
    visibleInformation: {
      type: "object",
      properties: {
        symbolVisible: { type: "boolean" },
        timeframeVisible: { type: "boolean" },
        volumeVisible: { type: "boolean" },
        priceAxisVisible: { type: "boolean" }
      },
      required: ["symbolVisible", "timeframeVisible", "volumeVisible", "priceAxisVisible"]
    },
    missingData: { type: "array", items: { type: "string" } },
    screenshotQuality: {
      type: "object",
      properties: {
        quality: { type: "string", enum: ["excellent", "good", "poor"] },
        issues: { type: "array", items: { type: "string" } }
      },
      required: ["quality", "issues"]
    },
    trendAnalysis: {
      type: "object",
      properties: {
        direction: { type: "string", enum: ["bullish", "bearish", "ranging", "unclear"] },
        strength: { type: "string", enum: ["strong", "weak", "neutral"] },
        details: { type: "string" }
      },
      required: ["direction", "strength", "details"]
    },
    marketStructure: { type: "string" },
    candlestickAnalysis: { type: "string" },
    priceAction: { type: "string" },
    supportResistance: {
      type: "object",
      properties: {
        keySupport: { type: "array", items: { type: "string" } },
        keyResistance: { type: "array", items: { type: "string" } },
        narrative: { type: "string" }
      },
      required: ["keySupport", "keyResistance", "narrative"]
    },
    supplyDemand: { type: "string" },
    smartMoneyClues: { type: "string" },
    patternDetection: { type: "array", items: { type: "string" } },
    volumeIndicatorAnalysis: { type: "string" },
    multiTimeframeContext: { type: "string" },
    bullishScenario: { type: "string" },
    bearishScenario: { type: "string" },
    neutralScenario: { type: "string" },
    riskManagement: {
      type: "object",
      properties: {
        invalidationLevel: { type: "string" },
        riskLevel: { type: "string", enum: ["low", "medium", "high", "extreme"] },
        positionSizingNote: { type: "string" }
      },
      required: ["invalidationLevel", "riskLevel", "positionSizingNote"]
    },
    tradeQualityScore: {
      type: "object",
      properties: {
        score: { type: "number", minimum: 0, maximum: 100 },
        breakdown: {
          type: "object",
          properties: {
            trendClarity: { type: "number", maximum: 15 },
            marketStructureQuality: { type: "number", maximum: 15 },
            supportResistanceClarity: { type: "number", maximum: 15 },
            patternReliability: { type: "number", maximum: 10 },
            volumeConfirmation: { type: "number", maximum: 10 },
            riskRewardQuality: { type: "number", maximum: 15 },
            confirmationStrength: { type: "number", maximum: 10 },
            screenshotTimeframeClarity: { type: "number", maximum: 10 }
          },
          required: ["trendClarity", "marketStructureQuality", "supportResistanceClarity", "patternReliability", "volumeConfirmation", "riskRewardQuality", "confirmationStrength", "screenshotTimeframeClarity"]
        }
      },
      required: ["score", "breakdown"]
    },
    confirmationChecklist: { type: "array", items: { type: "string" } },
    avoidTradeConditions: { type: "array", items: { type: "string" } },
    ifIWereAnalyzing: {
      type: "object",
      properties: {
        myBias: { type: "string" },
        whatIWouldWaitFor: { type: "string" },
        whatWouldMakeMeAvoid: { type: "string" },
        finalEducationalView: { type: "string" },
        stanceLabel: {
          type: "string",
          enum: [
            "Avoid for now",
            "Watchlist only",
            "Wait for confirmation",
            "Possible bullish setup",
            "Possible bearish setup",
            "High-risk setup",
            "Clean setup but needs confirmation",
            "No clear trade setup"
          ]
        }
      },
      required: ["myBias", "whatIWouldWaitFor", "whatWouldMakeMeAvoid", "finalEducationalView", "stanceLabel"]
    },
    finalVerdict: { type: "string" },
    disclaimer: { type: "string" }
  },
  required: [
    "analysisConfidence",
    "quickSummary",
    "visibleInformation",
    "missingData",
    "screenshotQuality",
    "trendAnalysis",
    "marketStructure",
    "candlestickAnalysis",
    "priceAction",
    "supportResistance",
    "supplyDemand",
    "smartMoneyClues",
    "patternDetection",
    "volumeIndicatorAnalysis",
    "multiTimeframeContext",
    "bullishScenario",
    "bearishScenario",
    "neutralScenario",
    "riskManagement",
    "tradeQualityScore",
    "confirmationChecklist",
    "avoidTradeConditions",
    "ifIWereAnalyzing",
    "finalVerdict",
    "disclaimer"
  ],
  additionalProperties: false
};
