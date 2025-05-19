
import React from 'react';
import { ModuleCard } from '../ModuleCard';
import { Database } from 'lucide-react';

const DataManagement = () => {
  return (
    <div className="col-span-1">
      <ModuleCard
        title="Data Management"
        icon={<Database className="h-8 w-8" />}
        path="/data-management"
        variant="red"
        features={[
          { name: 'Dashboard', path: '/data-management' },
          { name: 'Cost Analysis', path: '/data-management/cost-analysis' },
          { name: 'Data Connections', path: '/data-management/connections' },
          { name: 'Export Data', path: '/data-management/data/export' },
          { name: 'Data Insights', path: '/data-management/insights' }
        ]}
      />
    </div>
  );
};

export default DataManagement;
