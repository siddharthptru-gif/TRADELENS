import React from 'react';
import { HelpHero } from '../components/help/HelpHero';
import { CoreCapabilities } from '../components/help/CoreCapabilities';
import { ReportGuide } from '../components/help/ReportGuide';
import { TradingGlossary } from '../components/help/TradingGlossary';
import { HelpFAQ } from '../components/help/HelpFAQ';
import { ContactSupportCard } from '../components/help/ContactSupportCard';
import { DisclaimerBlock } from '../components/ui/DisclaimerBlock';

export default function Help() {
  return (
    <div className="min-h-screen bg-[#020403] text-white pt-24 pb-32 px-6">
      <div className="max-w-6xl mx-auto">
        <HelpHero />
        <div className="mb-16">
          <DisclaimerBlock />
        </div>
        <CoreCapabilities />
        <ReportGuide />
        <TradingGlossary />
        <HelpFAQ />
        <ContactSupportCard />
      </div>
    </div>
  );
}

