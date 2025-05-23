
import React from 'react';
import { Gift } from 'lucide-react';
import { ModuleCard } from '../ModuleCard';

const LoyaltyProgram = () => {
  return (
    <ModuleCard
      title="Loyalty & Rewards"
      description="Manage customer loyalty programs and reward systems"
      icon={<Gift size={24} />}
      features={[
        { name: 'Member Management', path: '/loyalty/members' },
        { name: 'Rewards Catalog', path: '/loyalty/rewards' },
        { name: 'Program Analytics', path: '/loyalty/analytics' },
        { name: 'Campaign Management', path: '/loyalty/campaigns' }
      ]}
      onClick={() => window.location.href = '/loyalty-rewards'}
    />
  );
};

export default LoyaltyProgram;
