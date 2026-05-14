import React from 'react';
import { Target } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 pt-20 pb-10 overflow-hidden bg-[#020403]">
      <div className="absolute inset-0 top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[--color-tradelens-green]/20 to-transparent"></div>
      {/* Subtle Aurora Glow in Footer */}
      <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[80%] h-[300px] bg-[--color-tradelens-green]/5 blur-[120px] rounded-[50%] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-20 text-sm">
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-2 text-white font-serif italic text-2xl mb-6">
              <Target className="w-6 h-6 text-[--color-tradelens-green]" />
              <span>TradeLens AI</span>
            </div>
            <p className="text-white/40 mb-6 leading-relaxed max-w-sm">
              Premium AI-powered chart structure analysis. Detect patterns, zones, and risk before you take action.
            </p>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Product</h4>
            <ul className="space-y-3 text-white/40">
              <li><a href="#" className="hover:text-[--color-tradelens-green] transition-colors">AI Scanner</a></li>
              <li><a href="#" className="hover:text-[--color-tradelens-green] transition-colors">Pattern Detection</a></li>
              <li><a href="#" className="hover:text-[--color-tradelens-green] transition-colors">Risk Calculator</a></li>
              <li><a href="#" className="hover:text-[--color-tradelens-green] transition-colors">Trade Journal</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Resources</h4>
            <ul className="space-y-3 text-white/40">
              <li><a href="#" className="hover:text-[--color-tradelens-green] transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-[--color-tradelens-green] transition-colors">API Access</a></li>
              <li><a href="#" className="hover:text-[--color-tradelens-green] transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-[--color-tradelens-green] transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Company</h4>
            <ul className="space-y-3 text-white/40">
              <li><a href="#" className="hover:text-[--color-tradelens-green] transition-colors">About</a></li>
              <li><a href="#" className="hover:text-[--color-tradelens-green] transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-[--color-tradelens-green] transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-[--color-tradelens-green] transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Legal</h4>
            <ul className="space-y-3 text-white/40">
              <li><a href="#" className="hover:text-[--color-tradelens-green] transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-[--color-tradelens-green] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[--color-tradelens-green] transition-colors">Risk Disclosure</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-white/30 text-xs text-center md:text-left">
          <p>© 2024 TradeLens AI. All rights reserved.</p>
          <div className="max-w-2xl px-4 md:px-0 bg-[#050705] border border-white/5 p-4 rounded-xl">
             <p className="font-mono text-[10px] leading-relaxed uppercase tracking-wider">
              Important: TradeLens AI provides educational technical analysis only. It is not financial advice, investment advice, or a recommendation to buy or sell any asset. Always do your own research and consult a registered financial adviser where required.
             </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
