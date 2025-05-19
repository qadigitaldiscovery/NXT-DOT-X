
import { ModuleCard } from '../ModuleCard';

const Operations = () => {
  return (
    <div className="col-span-1">
      <ModuleCard
        title="OPERATIONS"
        path="/operations"
        variant="default"
        features={[
          { name: 'Dashboard', path: '/operations/dashboard' },
          { name: 'Resource Planning', path: '/operations/resources' },
          { name: 'Scheduling', path: '/operations/schedule' },
          { name: 'Reporting', path: '/operations/reports' }
        ]}
      />
    </div>
  );
};

export default Operations;
