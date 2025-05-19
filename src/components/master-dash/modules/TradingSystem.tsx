
import { ModuleCard } from '../ModuleCard';
import { TrendingUp, LineChart } from 'lucide-react';

const TradingSystem = () => {
  const tradingModules = [
    {
      title: 'Market Analytics',
      icon: <TrendingUp className="h-7 w-7 text-emerald-500" />,
      path: '/trading-system/analytics',
      color: "bg-gradient-to-br from-emerald-50 to-emerald-100"
    },
    {
      title: 'Trading History',
      icon: <LineChart className="h-7 w-7 text-emerald-500" />,
      path: '/trading-system/history',
      color: "bg-gradient-to-br from-green-50 to-green-100"
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Trading System</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tradingModules.map((module, index) => (
          <ModuleCard
            key={index}
            title={module.title}
            icon={module.icon}
            path={module.path}
            color={module.color}
          />
        ))}
      </div>
    </div>
  );
};

export default TradingSystem;
