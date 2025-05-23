
import React from 'react';
import { Gift } from 'lucide-react';
import { ModuleCard } from '../ModuleCard';
import { useNavigate } from 'react-router-dom';

const LoyaltyProgram = () => {
  const navigate = useNavigate();

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
      onClick={() => navigate('/loyalty-rewards')}
    />
  );
};

export default LoyaltyProgram;
