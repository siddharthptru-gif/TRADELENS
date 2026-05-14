export const FORBIDDEN_PATTERNS = [
  "buy now",
  "sell now",
  "you should buy",
  "you should sell",
  "take this trade",
  "guaranteed",
  "sure-shot",
  "sure shot",
  "100% accurate",
  "jackpot",
  "no-loss",
  "no loss",
  "fixed target",
  "will definitely go up",
  "will definitely crash",
  "confirmed signal",
  "risk-free",
  "risk free",
  "easy money",
  "cannot lose"
];

export function containsForbiddenPhrase(text: string): boolean {
  if (!text) return false;
  const lowerText = text.toLowerCase();
  for (const phrase of FORBIDDEN_PATTERNS) {
    if (lowerText.includes(phrase)) {
      return true;
    }
  }
  return false;
}

export function sanitizeReport(report: any): any {
  let reportString = JSON.stringify(report);
  
  const replacements: Record<string, string> = {
    "buy now": "watch for possible bullish confirmation",
    "sell now": "watch for possible bearish confirmation",
    "you should buy": "a bullish scenario may be considered only after confirmation",
    "you should sell": "a bearish scenario may be considered only after confirmation",
    "guaranteed": "probability-based",
    "confirmed signal": "possible setup needing confirmation",
    "risk-free": "risk-managed",
    "risk free": "risk-managed",
    "100% accurate": "probability-based",
    "easy money": "educational setup",
    "sure-shot": "possible setup",
    "sure shot": "possible setup",
    "no-loss": "risk-managed",
    "no loss": "risk-managed",
    "take this trade": "observe this setup",
    "jackpot": "high-probability setup",
    "fixed target": "possible target area",
    "will definitely go up": "may have bullish continuation",
    "will definitely crash": "may see bearish action",
    "cannot lose": "must be risk-managed"
  };

  for (const [forbidden, safe] of Object.entries(replacements)) {
    // Case insensitive replacement
    const regex = new RegExp(forbidden, "gi");
    reportString = reportString.replace(regex, safe);
  }

  const sanitized = JSON.parse(reportString);
  return sanitized;
}

export function validateSafety(report: any) {
  const reportString = JSON.stringify(report);
  if (containsForbiddenPhrase(reportString)) {
    throw new Error("Report contains forbidden financial advice phrases even after sanitization.");
  }
  
  if (report.disclaimer !== "TradeLens AI provides educational technical analysis only. It is not financial advice, investment advice, or a recommendation to buy or sell any asset. Always do your own research and consult a registered financial adviser where required.") {
      report.disclaimer = "TradeLens AI provides educational technical analysis only. It is not financial advice, investment advice, or a recommendation to buy or sell any asset. Always do your own research and consult a registered financial adviser where required.";
  }
  
  return report;
}
