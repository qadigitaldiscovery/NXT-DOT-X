
import { ModuleCard } from '../ModuleCard';
import { Award } from 'lucide-react';

const LoyaltyProgram = () => {
  return (
    <div className="col-span-1">
      <ModuleCard
        title="Loyalty Program"
        icon={<Award className="h-8 w-8" />}
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
