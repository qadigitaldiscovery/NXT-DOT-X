
import React from 'react';
import CostDashboard from './CostDashboard';

const SupplierCosting = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Supplier Costing</h1>
      <p className="text-muted-foreground mb-6">Manage supplier costs and pricing data</p>
      <CostDashboard />
    </div>
  );
};

export default SupplierCosting;
