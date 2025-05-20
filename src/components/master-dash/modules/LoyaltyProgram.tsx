
import React from 'react';
import { ModuleCard } from '../ModuleCard';

const LoyaltyProgram = () => {
  return (
    <div className="col-span-1">
      <ModuleCard
        title="LOYALTY PROGRAM"
        path="/loyalty-rewards"
        variant="default"
        features={[
          { name: 'Loyalty Dashboard', path: '/loyalty/dashboard' },
          { name: 'Rewards Management', path: '/loyalty/rewards' },
          { name: 'Member Analytics', path: '/loyalty/analytics' },
          { name: 'Program Settings', path: '/loyalty/settings' }
        ]}
      />
    </div>
  );
};

export default LoyaltyProgram;
