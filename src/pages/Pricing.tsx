import React from 'react';
import { PricingHero } from '../components/pricing/PricingHero';
import { PricingCards } from '../components/pricing/PricingCards';
import { FeatureMatrix } from '../components/pricing/FeatureMatrix';
import { PricingFAQ } from '../components/pricing/PricingFAQ';
import { PricingSafetyNote } from '../components/pricing/PricingSafetyNote';

export default function Pricing() {
  return (
    <div className="min-h-screen bg-[#020403] text-white pt-24 pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        <PricingHero />
        <PricingCards />
        <FeatureMatrix />
        <PricingFAQ />
        <PricingSafetyNote />
      </div>
    </div>
  );
}

