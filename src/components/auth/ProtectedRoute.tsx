import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { OnboardingModal } from './OnboardingModal';
import { ref, get } from 'firebase/database';
import { db } from '../../lib/rtdb';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();
  const [checkingOnboarding, setCheckingOnboarding] = useState(true);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);

  useEffect(() => {
    async function checkOnboarding() {
      if (user) {
        try {
          const profileRef = ref(db, `userProfiles/${user.uid}`);
          const profileSnap = await get(profileRef);
          if (profileSnap.exists()) {
            setNeedsOnboarding(!profileSnap.val().onboardingCompleted);
          }
        } catch (error) {
          console.error("Error checking onboarding status:", error);
        }
      }
      setCheckingOnboarding(false);
    }
    
    if (!loading) {
      if (isAuthenticated) {
        checkOnboarding();
      } else {
        setCheckingOnboarding(false);
      }
    }
  }, [loading, isAuthenticated, user]);

  if (loading || checkingOnboarding) {
    return (
      <div className="min-h-screen bg-[#020403] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#8CFF3F] border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <>
      {children}
      {needsOnboarding && <OnboardingModal onClose={() => setNeedsOnboarding(false)} />}
    </>
  );
}