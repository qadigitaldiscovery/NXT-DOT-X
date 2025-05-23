
import React from 'react';
import { TrendingUp } from 'lucide-react';
import { ModuleCard } from '../ModuleCard';
import { useNavigate } from 'react-router-dom';

const TradingSystem = () => {
  const navigate = useNavigate();

  return (
    <ModuleCard
      title="Trading System"
      description="Automated trading platform with portfolio management"
      icon={<TrendingUp size={24} />}
      features={[
        { name: 'Portfolio Dashboard', path: '/trading/dashboard' },
        { name: 'Trade Execution', path: '/trading/trades' },
        { name: 'Risk Management', path: '/trading/risk' },
        { name: 'Performance Analytics', path: '/trading/analytics' }
      ]}
      onClick={() => navigate('/trading-system')}
    />
  );
};

export default TradingSystem;
