import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { UploadCloud, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { MobileNav } from './MobileNav';

export function AppTopbar() {
  const { user } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'Dashboard';
    if (path.startsWith('/upload')) return 'Analyze Chart';
    if (path.startsWith('/scan')) return 'Analyzing';
    if (path.startsWith('/report')) return 'Report';
    if (path.startsWith('/reports')) return 'Saved Reports';
    if (path.startsWith('/journal')) return 'Trading Journal';
    if (path.startsWith('/watchlist')) return 'Watchlist';
    if (path.startsWith('/settings')) return 'Settings';
    return '';
  };

  return (
    <>
      <header className="h-16 border-b border-white/10 bg-[#020403]/80 backdrop-blur-xl sticky top-0 z-40 flex items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-3">
          <button 
            className="md:hidden p-2 -ml-2 text-white/70 hover:text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="md:hidden flex items-center justify-center w-8 h-8 rounded-lg bg-[#8CFF3F] shrink-0">
            <div className="w-2.5 h-2.5 border-2 border-[#020403] rounded-sm" />
          </div>

          <h2 className="text-lg font-serif text-white hidden sm:block">{getPageTitle()}</h2>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <Link 
            to="/upload"
            className="flex items-center gap-2 px-4 py-2 bg-[#8CFF3F]/10 hover:bg-[#8CFF3F]/20 text-[#8CFF3F] border border-[#8CFF3F]/20 rounded-xl text-sm font-bold transition-all shadow-[0_0_15px_rgba(140,255,63,0.1)] hover:shadow-[0_0_20px_rgba(140,255,63,0.2)]"
          >
            <UploadCloud className="w-4 h-4" />
            <span className="hidden sm:inline">New Analysis</span>
            <span className="sm:hidden">Analyze</span>
          </Link>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <MobileNav onClose={() => setMobileMenuOpen(false)} />
        </div>
      )}
    </>
  );
}
