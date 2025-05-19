
import { ModuleCard } from '../ModuleCard';

const TradingSystem = () => {
  return (
    <div className="col-span-1">
      <ModuleCard
        title="TRADING SYSTEM"
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
