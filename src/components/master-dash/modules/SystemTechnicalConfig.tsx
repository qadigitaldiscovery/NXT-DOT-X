
import { ModuleCard } from '../ModuleCard';

const SystemTechnicalConfig = () => {
  return (
    <div className="col-span-1">
      <ModuleCard
        title="SYSTEM TECHNICAL CONFIG"
        path="/system/config"
        variant="default"
        features={[
          { name: 'Database Settings', path: '/system/config/database' },
          { name: 'API Servers', path: '/system/config/api' },
          { name: 'Cloud Storage', path: '/system/config/storage' },
          { name: 'Security Settings', path: '/system/config/security' }
        ]}
      />
    </div>
  );
};

export default SystemTechnicalConfig;
