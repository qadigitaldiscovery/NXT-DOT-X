
import React from 'react';
import { Database } from 'lucide-react';
import { ModuleCard } from '../ModuleCard';

const DataManagement = () => {
  return (
    <ModuleCard
      title="Data Management"
      description="Manage suppliers, costs, pricing, and business data analytics"
      icon={<Database size={24} />}
      features={[
        { name: 'Supplier Management', path: '/data-management/suppliers' },
        { name: 'Cost Analysis', path: '/data-management/costs' },
        { name: 'Price Management', path: '/data-management/pricing' },
        { name: 'Data Analytics', path: '/data-management/analytics' }
      ]}
      onClick={() => window.location.href = '/data-management'}
    />
  );
};

export default DataManagement;
