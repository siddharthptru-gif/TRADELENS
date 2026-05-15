import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, UploadCloud, FolderOpen, BookOpen, Bookmark, Settings, LogOut, HelpCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../ui/GlobalToast';

export function AppSidebar() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast({ type: 'success', title: 'Logged out successfully' });
      navigate('/');
    } catch (err) {
      toast({ type: 'error', title: 'Failed to log out' });
    }
  };

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
    { label: 'Analyze Chart', icon: UploadCloud, to: '/upload' },
    { label: 'Saved Reports', icon: FolderOpen, to: '/reports' },
    { label: 'Journal', icon: BookOpen, to: '/journal' },
    { label: 'Watchlist', icon: Bookmark, to: '/watchlist' },
    { label: 'Settings', icon: Settings, to: '/settings' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-white/10 bg-[#020403]/80 backdrop-blur-xl h-screen sticky top-0 shrink-0">
      <div className="p-6">
        <Link to="/dashboard" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-[#8CFF3F] group-hover:shadow-[0_0_15px_rgba(140,255,63,0.3)] transition-all flex items-center justify-center">
            <div className="w-3 h-3 border-2 border-[#020403] rounded-sm" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white font-serif">TradeLens<span className="text-[#8CFF3F]">.ai</span></span>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `
              flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative
              ${isActive ? 'text-[#8CFF3F] bg-[#8CFF3F]/10' : 'text-white/60 hover:text-white hover:bg-white/5'}
            `}
          >
            {({ isActive }) => (
              <>
                <item.icon className={`w-5 h-5 ${isActive ? 'text-[#8CFF3F]' : 'text-white/40 group-hover:text-white'}`} />
                {item.label}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#8CFF3F] rounded-r-full shadow-[0_0_10px_rgba(140,255,63,0.5)]" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="flex flex-col gap-1 mb-4">
          <Link to="/help" className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-white/50 hover:text-white transition-colors rounded-lg hover:bg-white/5">
            <HelpCircle className="w-4 h-4" /> Help & Safety
          </Link>
        </div>
        
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5 border border-white/5 group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 flex items-center justify-center shrink-0 uppercase font-bold text-white text-xs">
            {user?.email?.[0] || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-white truncate font-medium">{user?.email}</p>
          </div>
          <button onClick={handleLogout} className="p-1.5 text-white/40 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
