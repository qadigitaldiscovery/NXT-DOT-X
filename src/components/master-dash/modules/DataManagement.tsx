
import { ModuleCard } from '../ModuleCard';

const DataManagement = () => {
  return (
    <div className="col-span-1">
      <ModuleCard
        title="DATA MANAGEMENT"
        path="/data-management"
        variant="default"
        features={[
          { name: 'Dashboard', path: '/data-management' },
          { name: 'Cost Analysis', path: '/data-management/cost-analysis' },
          { name: 'Data Connections', path: '/data-management/connections' },
          { name: 'Export Data', path: '/data-management/export-data' },
          { name: 'Data Insights', path: '/data-management/insights' }
        ]}
      />
    </div>
  );
};

export default DataManagement;
