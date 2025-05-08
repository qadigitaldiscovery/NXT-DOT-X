
import React from 'react';
import { TradingSystemLayout } from '../components/layout/TradingSystemLayout';
import CostDashboard from './data-management/cost-management/CostDashboard';

const SupplierCosting = () => {
  return (
    <TradingSystemLayout>
      <CostDashboard />
    </TradingSystemLayout>
  );
};

export default SupplierCosting;
