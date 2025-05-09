
import React from 'react';
import { TradingSystemLayout } from '@/components/layout/TradingSystemLayout';
import CostDashboard from './CostDashboard';

const SupplierCosting = () => {
  return (
    <TradingSystemLayout>
      <div className="space-y-6">
        <CostDashboard />
      </div>
    </TradingSystemLayout>
  );
};

export default SupplierCosting;
