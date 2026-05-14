import React from 'react';
import { useGSAPAnimations } from '../hooks/useGSAPAnimations';
import { LandingNavbar } from '../components/landing/LandingNavbar';
import { HeroScene } from '../components/landing/HeroScene';
import { AICoreShowcase } from '../components/landing/AICoreShowcase';
import { DashboardPreview } from '../components/landing/DashboardPreview';
import { HowItWorks } from '../components/landing/HowItWorks';
import { UploadDemo } from '../components/landing/UploadDemo';
import { SafetyTrust } from '../components/landing/SafetyTrust';
import { FinalCTA } from '../components/landing/FinalCTA';
import { LandingFooter } from '../components/landing/LandingFooter';

export default function Landing() {
  useGSAPAnimations();

  return (
    <div className="app-bg text-white selection:bg-[#8CFF3F]/30 overflow-hidden">
      <LandingNavbar />
      
      <main>
        <HeroScene />
        <AICoreShowcase />
        <DashboardPreview />
        <HowItWorks />
        <UploadDemo />
        <SafetyTrust />
        <FinalCTA />
      </main>

      <LandingFooter />
    </div>
  );
}
