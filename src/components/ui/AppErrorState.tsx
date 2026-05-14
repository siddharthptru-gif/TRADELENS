import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { PageTransition } from './PageTransition';

interface AppErrorStateProps {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  to?: string;
}

export function AppErrorState({
  title = "Something went wrong",
  message = "We couldn't load the requested data. Please try again or return to the dashboard.",
  actionLabel = "Return Home",
  onAction,
  to = "/dashboard"
}: AppErrorStateProps) {
  const navigate = useNavigate();

  const handleAction = () => {
    if (onAction) {
      onAction();
    } else {
      navigate(to);
    }
  };

  return (
    <PageTransition className="flex items-center justify-center min-h-[50vh] p-6">
      <div className="max-w-md w-full text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FF5C7A]/10 mb-6">
          <AlertCircle className="w-8 h-8 text-[#FF5C7A]" />
        </div>
        <h2 className="text-2xl font-serif text-white mb-3">{title}</h2>
        <p className="text-white/60 text-sm mb-8 leading-relaxed">
          {message}
        </p>
        <button 
          onClick={handleAction}
          className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-bold transition-colors w-full sm:w-auto"
        >
          {actionLabel}
        </button>
      </div>
    </PageTransition>
  );
}
