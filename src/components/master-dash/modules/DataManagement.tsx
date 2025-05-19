
import { ModuleCard } from '../ModuleCard';

const DataManagement = () => {
  return (
    <div className="col-span-1">
      <ModuleCard
        title="Data Management"
        path="/data-management"
        variant="default"
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
