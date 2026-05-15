import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, UploadCloud, FolderOpen, BookOpen, Bookmark, Settings, LogOut, X, HelpCircle, Star } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { motion } from 'framer-motion';

export function MobileNav({ onClose }: { onClose: () => void }) {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      onClose();
      navigate('/');
    } catch (err) {}
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
    <motion.div 
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
      className="relative w-72 max-w-[80vw] h-full bg-[#020403] border-r border-white/10 flex flex-col z-10"
    >
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 rounded-lg bg-[#8CFF3F] flex items-center justify-center">
            <div className="w-3 h-3 border-2 border-[#020403] rounded-sm" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white font-serif">TradeLens<span className="text-[#8CFF3F]">.ai</span></span>
        </div>
        <button onClick={onClose} className="p-2 text-white/50 hover:text-white rounded-lg">
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onClose}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
              ${isActive ? 'text-[#8CFF3F] bg-[#8CFF3F]/10' : 'text-white/70 hover:text-white active:bg-white/5'}
            `}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </NavLink>
        ))}
        
        <div className="h-px bg-white/10 my-4" />
        
        <Link to="/help" onClick={onClose} className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-white/70 hover:text-white rounded-xl">
          <HelpCircle className="w-5 h-5 text-blue-400" /> Help & Safety
        </Link>
      </nav>

      <div className="p-4 border-t border-white/10 mt-auto">
        <div className="flex items-center gap-3 mb-4">
           <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white font-bold">
            {user?.email?.[0]?.toUpperCase()}
           </div>
           <div className="flex-1 min-w-0">
             <p className="text-sm font-medium text-white truncate">{user?.email}</p>
           </div>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-white/10 text-white/70 hover:text-white hover:bg-white/5 transition-colors font-bold text-sm"
        >
          <LogOut className="w-4 h-4" /> Log Out
        </button>
      </div>
    </motion.div>
  );
}
