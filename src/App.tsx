import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AppRoutes } from './routes';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-bg text-white font-sans overflow-x-hidden flex flex-col">
        {/* Simple top navbar placeholder */}
        <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/5 px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-serif tracking-tight flex items-center gap-2">
            <span className="w-6 h-6 rounded-sm bg-[--color-tradelens-green] flex items-center justify-center [box-shadow:0_0_12px_rgba(16,224,160,0.4)] rotate-45" />
            TradeLens AI
          </Link>
          <div className="flex gap-6 text-sm font-medium text-muted">
            <Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
            <Link to="/upload" className="hover:text-white transition-colors">Upload</Link>
            <Link to="/reports" className="hover:text-white transition-colors">Reports</Link>
            <Link to="/login" className="hover:text-white transition-colors">Login</Link>
          </div>
        </nav>

        {/* Content area */}
        <main className="flex-1 pt-20">
          <AppRoutes />
        </main>
      </div>
    </BrowserRouter>
  );
}
