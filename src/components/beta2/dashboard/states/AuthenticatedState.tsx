
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { LoyaltyAccount } from '@/services/loyalty/types';

interface AuthenticatedStateProps {
  account: LoyaltyAccount;
}

export const AuthenticatedState: React.FC<AuthenticatedStateProps> = ({ account }) => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-2xl font-bold">Welcome back, Valued Member!</h3>
        <p>You have <span className="font-bold text-xl">{account.points_balance}</span> points available</p>
        <p className="text-sm text-white/80">Current tier: {account.tier_level}</p>
      </div>
      
      <div className="flex gap-2">
        <Button variant="secondary" onClick={() => navigate('/beta2/members')}>
          View Dashboard
        </Button>
        <Button 
          variant="outline" 
          className="bg-transparent text-white border-white hover:bg-white/10" 
          onClick={() => navigate('/beta2/rewards')}
        >
          Redeem Rewards
        </Button>
      </div>
    </div>
  );
};
