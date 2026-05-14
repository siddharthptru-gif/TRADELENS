import React, { useState, useEffect } from 'react';
import { useSettingsData } from '../hooks/useSettingsData';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { SettingsTab } from '../types/settings';
import { Settings, User, Target, Sliders, Activity, Database, ShieldAlert, AlertCircle, CheckCircle2 } from 'lucide-react';
import { PageTransition } from '../components/ui/PageTransition';
import { PageHeader } from '../components/layout/PageHeader';
import { AppErrorState } from '../components/ui/AppErrorState';
import { useToast } from '../components/ui/GlobalToast';

import { ProfileSettingsCard, SubscriptionUsageCard } from '../components/settings/ProfileSettingsCards';
import { TradingPreferencesCard, AnalysisDefaultsCard } from '../components/settings/PreferencesCards';
import { DataPrivacyCard } from '../components/settings/DataPrivacyCard';
import { SafetyDisclaimerCard } from '../components/settings/SafetyDisclaimerCard';
import { DangerZoneCard } from '../components/settings/DangerZoneCard';

export default function SettingsPage() {
  const { logoutUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const {
    loading,
    error,
    userRecord,
    profile,
    subscription,
    usageLimits,
    dataCounts,
    updateProfileSettings,
    updateTradingPreferences,
    updateAnalysisDefaults,
    acceptDisclaimer,
    exportUserData,
    wipeUserData,
    deleteAccountRequest
  } = useSettingsData();

  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');

  const wrapAction = async (action: () => Promise<void>, successMsg: string) => {
    try {
      await action();
      toast({ type: 'success', title: successMsg });
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/requires-recent-login') {
         toast({ type: 'error', title: 'Recent Login Required', message: "Firebase requires recent login before deleting your account. Please sign out, sign in with Google again, and retry." });
         return;
      }
      toast({ type: 'error', title: 'Action Failed', message: err.message || 'An error occurred' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#8CFF3F]/20 border-t-[#8CFF3F] rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !userRecord || !profile) {
    return (
      <AppErrorState title="Failed to Load Settings" message={error || "Could not load user data."} />
    );
  }

  const tabs: { id: SettingsTab; label: string; icon: React.ReactNode }[] = [
    { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
    { id: 'preferences', label: 'Trading Preferences', icon: <Target className="w-4 h-4" /> },
    { id: 'defaults', label: 'Analysis Defaults', icon: <Sliders className="w-4 h-4" /> },
    { id: 'subscription', label: 'Subscription & Usage', icon: <Activity className="w-4 h-4" /> },
    { id: 'privacy', label: 'Data & Privacy', icon: <Database className="w-4 h-4" /> },
    { id: 'safety', label: 'Safety', icon: <ShieldAlert className="w-4 h-4" /> },
    { id: 'danger', label: 'Danger Zone', icon: <AlertCircle className="w-4 h-4" /> },
  ];

  return (
    <PageTransition>
      <PageHeader 
        title="Settings" 
        subtitle="Manage your profile, analysis preferences, usage, and data controls."
        badge={
          <span className="bg-[#8CFF3F] text-black w-10 h-10 flex items-center justify-center rounded-xl">
             <Settings className="w-5 h-5 fill-current" />
          </span>
        }
      />
      
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-black/40 border border-white/5 rounded-lg text-[10px] uppercase font-mono text-white/40 tracking-widest mb-8">
        <ShieldAlert className="w-3 h-3 text-[#FF5C7A]" />
        TradeLens AI provides educational technical analysis only and does not provide financial advice.
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Main Navigation Sidebar */}
        <div className="w-full lg:w-64 shrink-0 overflow-x-auto no-scrollbar border-b lg:border-b-0 border-white/10 lg:sticky lg:top-24 pb-4 lg:pb-0 z-10">
            <div className="flex lg:flex-col gap-2 min-w-max lg:min-w-0">
              {tabs.map(tab => {
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium transition-all ${
                      active 
                        ? 'bg-white/10 text-white' 
                        : 'text-white/50 hover:bg-white/5 hover:text-white'
                    } ${tab.id === 'danger' && !active ? 'hover:text-red-400 hover:bg-red-500/10' : ''} ${tab.id === 'danger' && active ? 'bg-red-500/20 text-red-500' : ''}`}
                  >
                    <span className={active && tab.id !== 'danger' ? 'text-[#8CFF3F]' : ''}>{tab.icon}</span>
                    {tab.label}
                  </button>
                );
              })}
            </div>
        </div>

        {/* Settings Content Area */}
        <div className="flex-1 w-full max-w-[800px] min-w-0">
          {activeTab === 'profile' && (
            <ProfileSettingsCard 
              userRecord={userRecord} 
              onSave={(name) => wrapAction(() => updateProfileSettings(name), "Profile settings updated")} 
            />
          )}

          {activeTab === 'preferences' && (
            <TradingPreferencesCard 
              profile={profile}
              onSave={(exp, mkts, style, risk) => wrapAction(() => updateTradingPreferences(exp, mkts, style, risk), "Trading preferences saved")}
            />
          )}

          {activeTab === 'defaults' && (
            <AnalysisDefaultsCard 
              profile={profile}
              onSave={(market, timeframe, prefs) => wrapAction(() => updateAnalysisDefaults(market, timeframe, prefs), "Analysis defaults saved")}
            />
          )}

          {activeTab === 'subscription' && (
            <SubscriptionUsageCard 
              subscription={subscription}
              usageLimits={usageLimits}
            />
          )}

          {activeTab === 'privacy' && (
            <DataPrivacyCard 
              counts={dataCounts}
              onExport={() => wrapAction(() => exportUserData(), "Data exported successfully")}
              onWipe={() => wrapAction(() => wipeUserData(), "App data has been wiped")}
            />
          )}

          {activeTab === 'safety' && (
            <SafetyDisclaimerCard 
              disclaimerAcceptedAt={userRecord.disclaimerAcceptedAt}
              onAccept={() => wrapAction(() => acceptDisclaimer(), "Safety disclaimer acknowledged")}
            />
          )}

          {activeTab === 'danger' && (
            <DangerZoneCard 
              onSignOut={async () => {
                try {
                  await logoutUser();
                  navigate('/login');
                } catch (e) {
                  toast({ type: 'error', title: "Failed to sign out" });
                }
              }}
              onDeleteAccount={() => wrapAction(async () => {
                  await deleteAccountRequest();
                  navigate('/');
                  window.location.reload(); 
              }, "Account deleted")}
            />
          )}

        </div>
      </div>
    </PageTransition>
  );
}
