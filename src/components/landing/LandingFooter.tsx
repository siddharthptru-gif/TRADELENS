import React from 'react';
import { Link } from 'react-router-dom';

export function LandingFooter() {
  return (
    <footer className="bg-[#020403] border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          <div className="col-span-2">
            <Link to="/" className="text-xl font-serif tracking-tight flex items-center gap-2 mb-6">
              <span className="w-5 h-5 rounded-full border-2 border-[#8CFF3F] flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-[#8CFF3F] rounded-full"></span>
              </span>
              TradeLens AI
            </Link>
            <p className="text-sm text-muted max-w-xs mb-6">
              Structured, risk-aware educational market analysis powered by AI.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4 text-sm">Product</h4>
            <ul className="space-y-3 text-sm text-muted">
              <li><Link to="/features" className="hover:text-white transition-colors">AI Scanner</Link></li>
              <li><Link to="/features" className="hover:text-white transition-colors">Dashboard</Link></li>
              <li><Link to="/features" className="hover:text-white transition-colors">Trade Journal</Link></li>
              <li><Link to="/features" className="hover:text-white transition-colors">Risk Calculator</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4 text-sm">Resources</h4>
            <ul className="space-y-3 text-sm text-muted">
              <li><Link to="/help" className="hover:text-white transition-colors">Demo Report</Link></li>
              <li><Link to="/help" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/help" className="hover:text-white transition-colors">Docs</Link></li>
              <li><Link to="/help" className="hover:text-white transition-colors">Support</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4 text-sm">Legal</h4>
            <ul className="space-y-3 text-sm text-muted">
              <li><Link to="/help" className="hover:text-white transition-colors">Disclaimer</Link></li>
              <li><Link to="/help" className="hover:text-white transition-colors">Privacy</Link></li>
              <li><Link to="/help" className="hover:text-white transition-colors">Terms</Link></li>
              <li><Link to="/help" className="hover:text-white transition-colors text-[#FF5C7A]">Risk Warning</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} TradeLens AI. All rights reserved.
          </p>
          <div className="text-[10px] text-muted max-w-xl md:text-right">
            Educational analysis only. Not financial advice. Always verify with your own research and a registered professional.
          </div>
        </div>
      </div>
    </footer>
  );
}
