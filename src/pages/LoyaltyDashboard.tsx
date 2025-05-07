
import React from 'react';
import { DashboardHeader } from '@/components/beta2/dashboard/DashboardHeader';
import { LoyaltyStatusCard } from '@/components/beta2/dashboard/LoyaltyStatusCard';
import { QuickNavSection } from '@/components/beta2/dashboard/QuickNavSection';
import { GettingStartedGuide } from '@/components/beta2/dashboard/GettingStartedGuide';

const LoyaltyDashboard = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <DashboardHeader 
        title="Loyalty Rewards Program" 
        description="Welcome to the loyalty program management platform."
      />
      
      {/* Account status card */}
      <LoyaltyStatusCard />
      
      {/* Quick navigation cards */}
      <QuickNavSection />
      
      {/* Getting Started Guide */}
      <GettingStartedGuide />
    </div>
  );
};

export default LoyaltyDashboard;
