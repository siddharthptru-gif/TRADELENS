import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { UserRecord } from '../../types/dashboard';

interface Props {
  userRecord: UserRecord | null;
}

export function WelcomeHeader({ userRecord }: Props) {
  const { user, logoutUser } = useAuth();
  
  const displayName = userRecord?.displayName || user?.displayName || 'Trader';
  const email = userRecord?.email || user?.email || '';
  const photo = userRecord?.photoURL || user?.photoURL || '';

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div className="flex items-center gap-4">
        {photo ? (
          <img src={photo} alt={displayName} className="w-14 h-14 rounded-full border-2 border-white/10" />
        ) : (
          <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xl font-serif">
            {displayName.charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <h1 className="text-3xl font-serif tracking-tight">Welcome back, {displayName}</h1>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-sm text-muted">{email}</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col items-start md:items-end gap-2">
        <button 
          onClick={() => logoutUser()} 
          className="px-4 py-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors text-sm font-medium"
        >
          Logout
        </button>
        <p className="text-[10px] text-muted tracking-wider">Educational analysis only. Not financial advice.</p>
      </div>
    </div>
  );
}
