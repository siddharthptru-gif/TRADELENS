import React from 'react';

export function PricingFAQ() {
  const faqs = [
    {
      q: "Is TradeLens AI a signal provider?",
      a: "No. TradeLens AI does not provide buy or sell signals. It provides an educational breakdown of the chart structure to help you form your own independent thesis."
    },
    {
      q: "Does TradeLens AI guarantee profits?",
      a: "Absolutely not. Trading involves significant risk. The AI highlights potential scenarios based on historical data patterns, but no outcome is guaranteed."
    },
    {
      q: "Can I use it for crypto and stocks?",
      a: "Yes, you can upload charts from any asset class including crypto, stocks, forex, indices, and commodities."
    },
    {
      q: "Why does the AI ask for timeframe and market?",
      a: "The context of a 1-minute chart differs vastly from a Weekly chart. Providing this info helps the AI calibrate its pattern recognition."
    },
    {
      q: "What happens if my chart is unclear?",
      a: "The AI will return a low trade quality score and explicitly state that the chart lacks a clean edge or confirmable structure."
    },
    {
      q: "Are paid plans live right now?",
      a: "Currently, paid plans are placeholders. All registered users start on the Free plan automatically."
    },
    {
      q: "Can I delete my data?",
      a: "Yes, you can permanently wipe all your app data (reports, journals, etc.) from the Settings -> Data & Privacy section."
    },
    {
      q: "Is this financial advice?",
      a: "No. TradeLens AI provides educational technical analysis only. It is not financial advice or a recommendation to act."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto mb-20">
      <h2 className="text-3xl font-serif text-white mb-8 text-center">Frequently Asked Questions</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h4 className="text-lg font-bold text-white mb-2">{faq.q}</h4>
            <p className="text-sm text-white/60 leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
