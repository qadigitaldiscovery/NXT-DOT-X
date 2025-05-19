
import { ModuleCard } from '../ModuleCard';

const Operations = () => {
  return (
    <div className="col-span-1">
      <ModuleCard
        title="Operations"
        path="/operations"
        variant="default"
        features={[
          { name: 'Operations Dashboard', path: '/operations/dashboard' },
          { name: 'Resource Management', path: '/operations/resources' },
          { name: 'Process Optimization', path: '/operations/processes' },
          { name: 'Performance Metrics', path: '/operations/metrics' },
          { name: 'Operational Reports', path: '/operations/reports' }
        ]}
      />
    </div>
  );
};

export default Operations;
