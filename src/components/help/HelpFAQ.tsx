import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { Camera, HelpCircle } from 'lucide-react';

export function HelpFAQ() {
  const faqs = [
    {
      q: "Why is my confidence score low?",
      a: "If the chart lacks clean structure, clear wicks, or strong volume, the AI will issue a low score to reflect the uncertainty. It's safer to avoid messy setups."
    },
    {
      q: "Why does AI say volume is not visible?",
      a: "The AI relies on the visual volume bars at the bottom of standard charts. If you don't include them in the screenshot, or they are too compressed, the AI cannot read them."
    },
    {
      q: "Why does AI say no clear setup?",
      a: "Because forcing a trade in chop (sideways movement) is bad practice. Good analysis includes knowing when to do nothing."
    },
    {
      q: "Why does it avoid direct buy/sell language?",
      a: "Because TradeLens AI is an educational tool, not a financial adviser. Trading is highly risky, and structural opinions are not guarantees."
    },
    {
      q: "Can I use mobile screenshots?",
      a: "Yes, but ensure the candles, price axis, and timeframe are clearly readable. Avoid uploading charts entirely covered by moving averages or indicators."
    },
    {
      q: "Can I analyze crypto charts?",
      a: "Yes. The AI uses price action principles which apply across crypto, stocks, futures, and forex."
    },
    {
      q: "Can I analyze Indian stocks?",
      a: "Yes, standard technical analysis applies globally."
    },
    {
      q: "Can I save reports?",
      a: "Yes, full reports can be saved to your Saved Reports section from the report page."
    },
    {
      q: "Can I delete my data?",
      a: "Yes, go to Settings -> Data & Privacy to wipe your app data."
    }
  ];

  return (
    <div className="mb-16">
      
      {/* Upload Tips */}
      <GlassCard className="p-8 mb-16 border-white/5">
        <div className="flex items-center gap-3 mb-6">
          <Camera className="w-6 h-6 text-yellow-400" />
          <h3 className="text-2xl font-serif text-white">Image Upload Tips</h3>
        </div>
        <p className="text-sm text-white/60 mb-6">For the best analysis, your screenshot should be clear and structurally readable.</p>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <TipBox text="Include visible candles (not just a line chart)." />
          <TipBox text="Include the vertical price axis on the right." />
          <TipBox text="Include the timeframe clearly in the image." />
          <TipBox text="Include the symbol ticker if possible." />
          <TipBox text="Include volume bars if you want volume analysis." />
          <TipBox text="Keep it clean: avoid 20+ overlapping indicators." />
        </div>
      </GlassCard>

      {/* FAQ */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif text-white mb-4">Frequently Asked Questions</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {faqs.map((faq, i) => (
          <GlassCard key={i} className="p-6">
            <div className="flex gap-3 items-start">
              <HelpCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-white font-bold text-sm mb-2">{faq.q}</h4>
                <p className="text-sm text-white/50 leading-relaxed">{faq.a}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

    </div>
  );
}

function TipBox({ text }: { text: string }) {
  return (
    <div className="bg-[#020403] border border-white/10 p-4 rounded-xl flex items-start gap-3">
      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-1.5 shrink-0" />
      <span className="text-sm text-white/80">{text}</span>
    </div>
  );
}
