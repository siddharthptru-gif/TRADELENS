import React, { useState } from 'react';
import { Bookmark, BookOpen, Eye, ArrowLeft, Plus } from 'lucide-react';
import { GradientButton } from '../ui/GradientButton';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';

interface ReportActionsBarProps {
  onSave: () => Promise<{ success: boolean; error?: string }>;
  onJournal: () => Promise<{ success: boolean; error?: string }>;
  onWatchlist: () => Promise<{ success: boolean; error?: string }>;
  isSaved: boolean;
  loading: boolean;
}

export function ReportActionsBar({ onSave, onJournal, onWatchlist, isSaved, loading }: ReportActionsBarProps) {
  const navigate = useNavigate();
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleAction = async (action: () => Promise<{ success: boolean; error?: string }>, successMsg: string) => {
    if (loading) return;
    const res = await action();
    if (res.success) {
      showToast(successMsg);
    } else {
      showToast(res.error || "Action failed");
    }
  };

  return (
    <>
      {toastMsg && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-[#8CFF3F]/10 border border-[#8CFF3F]/30 text-[#8CFF3F] px-4 py-2 rounded-full text-sm backdrop-blur-md shadow-[0_0_20px_rgba(140,255,63,0.1)]">
          {toastMsg}
        </div>
      )}
      
      <div className="fixed bottom-0 left-0 w-full z-40 bg-[#020403]/90 backdrop-blur-xl border-t border-white/5 p-4 flex justify-between items-center px-6 md:px-12">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </button>
          <div className="w-px h-6 bg-white/10 mx-2 hidden sm:block"></div>
          <button 
            onClick={() => navigate('/dashboard')}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all"
          >
            <Plus className="w-4 h-4" />
            New Scan
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => handleAction(onSave, "Report saved!")}
            disabled={isSaved || loading}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all group",
              isSaved ? "bg-[#8CFF3F]/10 text-[#8CFF3F] border border-[#8CFF3F]/20 cursor-default" 
                      : "bg-white/5 border border-white/10 text-white hover:bg-white/10 active:scale-95"
            )}
          >
            <Bookmark className={cn("w-4 h-4", isSaved && "fill-[#8CFF3F]")} />
            <span className="hidden sm:inline">{isSaved ? "Saved" : "Save"}</span>
          </button>
          
          <button 
            onClick={() => handleAction(onJournal, "Added to Journal")}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all active:scale-95"
          >
            <BookOpen className="w-4 h-4 text-emerald-400 group-hover:text-emerald-300" />
            <span className="hidden leading-none sm:inline">Journal</span>
          </button>

          <button 
            onClick={() => handleAction(onWatchlist, "Added to Watchlist")}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all active:scale-95"
          >
            <Eye className="w-4 h-4 text-blue-400 group-hover:text-blue-300" />
            <span className="hidden leading-none xl:inline">Watchlist</span>
          </button>
        </div>
      </div>
    </>
  );
}
