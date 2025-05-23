
import React from 'react';
import { Database } from 'lucide-react';
import { ModuleCard } from '../ModuleCard';
import { useNavigate } from 'react-router-dom';

const DataManagement = () => {
  const navigate = useNavigate();

  return (
    <ModuleCard
      title="Data Management"
      description="Manage suppliers, costs, pricing, and business data analytics"
      icon={<Database size={24} />}
      features={[
        { name: 'Supplier Management', path: '/data-management/suppliers' },
        { name: 'Cost Analysis', path: '/data-management/cost-analysis' },
        { name: 'Price Management', path: '/data-management/pricing/price-management' },
        { name: 'Data Analytics', path: '/data-management/insights' }
      ]}
      onClick={() => navigate('/data-management')}
    />
  );
};

export default DataManagement;
