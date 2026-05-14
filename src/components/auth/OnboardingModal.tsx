import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { db } from '../../lib/rtdb';
import { ref, update } from 'firebase/database';
import { GradientButton } from '../ui/GradientButton';

export function OnboardingModal({ onClose }: { onClose: () => void }) {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [preferences, setPreferences] = useState({
    experienceLevel: 'beginner',
    preferredMarkets: ['crypto'],
    tradingStyle: 'swing',
    riskProfile: 'medium',
    defaultTimeframe: '1D',
  });

  const updatePreference = (key: string, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const handleFinish = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const profileRef = ref(db, `userProfiles/${user.uid}`);
      await update(profileRef, {
        ...preferences,
        onboardingCompleted: true,
        updatedAt: Date.now()
      });
      onClose();
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleSkip = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const profileRef = ref(db, `userProfiles/${user.uid}`);
      await update(profileRef, {
        onboardingCompleted: true,
        updatedAt: Date.now()
      });
      onClose();
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const nextStep = () => {
    if (step < 5) setStep(step + 1);
    else handleFinish();
  };

  const renderOptions = (key: string, options: string[]) => {
    const isArray = Array.isArray((preferences as any)[key]);
    
    const toggleOption = (opt: string) => {
      if (isArray) {
        const arr = (preferences as any)[key] as string[];
        if (arr.includes(opt)) {
          updatePreference(key, arr.filter(i => i !== opt));
        } else {
          updatePreference(key, [...arr, opt]);
        }
      } else {
        updatePreference(key, opt);
      }
    };

    return (
      <div className="flex flex-wrap gap-3 mt-6">
        {options.map(opt => {
          const selected = isArray 
            ? ((preferences as any)[key] as string[]).includes(opt)
            : (preferences as any)[key] === opt;
            
          return (
            <button
              key={opt}
              onClick={() => toggleOption(opt)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                selected 
                  ? 'bg-[#8CFF3F]/20 border-[#8CFF3F] text-[#8CFF3F]' 
                  : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
              }`}
            >
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="bg-[#020403] border border-white/10 rounded-2xl p-8 max-w-lg w-full relative shadow-2xl">
        <h2 className="text-2xl font-serif mb-2">Personalize your experience</h2>
        <p className="text-muted text-sm mb-8">We'll use this to tailor your analysis settings.</p>

        <div className="min-h-[150px]">
          {step === 1 && (
             <div>
               <h3 className="font-medium">What is your experience level?</h3>
               {renderOptions('experienceLevel', ['beginner', 'intermediate', 'advanced'])}
             </div>
          )}
          {step === 2 && (
             <div>
               <h3 className="font-medium">Which markets do you trade? (Select all that apply)</h3>
               {renderOptions('preferredMarkets', ['crypto', 'stocks', 'forex', 'commodities', 'indices', 'futures'])}
             </div>
          )}
          {step === 3 && (
             <div>
               <h3 className="font-medium">What is your trading style?</h3>
               {renderOptions('tradingStyle', ['scalping', 'intraday', 'swing', 'positional', 'unknown'])}
             </div>
          )}
          {step === 4 && (
             <div>
               <h3 className="font-medium">What is your risk profile?</h3>
               {renderOptions('riskProfile', ['low', 'medium', 'high', 'unknown'])}
             </div>
          )}
          {step === 5 && (
             <div>
               <h3 className="font-medium">What is your default timeframe?</h3>
               {renderOptions('defaultTimeframe', ['1m', '3m', '5m', '15m', '30m', '1h', '4h', '1D', '1W', '1M', 'unknown'])}
             </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-10">
          <button 
            onClick={handleSkip}
            disabled={loading}
            className="text-muted text-sm hover:text-white transition-colors"
          >
            Skip for now
          </button>
          <GradientButton onClick={nextStep} disabled={loading}>
            {step === 5 ? (loading ? 'Saving...' : 'Finish') : 'Next'}
          </GradientButton>
        </div>
        
        {/* Progress bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-white/5 rounded-t-2xl overflow-hidden">
           <div 
             className="h-full bg-[#8CFF3F] transition-all duration-300"
             style={{ width: `${(step / 5) * 100}%` }}
           />
        </div>
      </div>
    </div>
  );
}
