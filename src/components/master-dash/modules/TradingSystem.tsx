
import { ModuleCard } from '../ModuleCard';
import { TrendingUp } from 'lucide-react';

const TradingSystem = () => {
  return (
    <div className="col-span-1">
      <ModuleCard
        title="Trading System"
        icon={<TrendingUp className="h-8 w-8" />}
        path="/trading-system"
        variant="default"
        features={[
          { name: 'Dashboard', path: '/trading-system' },
          { name: 'Market Analytics', path: '/trading-system/analytics' },
          { name: 'Trading History', path: '/trading-system/history' },
          { name: 'Settings', path: '/trading-system/settings' }
        ]}
      />
    </div>
  );
};

export default TradingSystem;
