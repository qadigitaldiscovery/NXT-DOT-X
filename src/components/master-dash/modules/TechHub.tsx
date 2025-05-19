
import { ModuleCard } from '../ModuleCard';

const TechHub = () => {
  return (
    <div className="col-span-1">
      <ModuleCard
        title="TECH HUB"
        path="/tech-hub"
        variant="default"
        features={[
          { name: 'AI Personas', path: '/tech-hub/personas' },
          { name: 'API Management', path: '/tech-hub/api-management' },
          { name: 'Integrations', path: '/tech-hub/integrations' },
          { name: 'Technical Config', path: '/tech-hub/technical-config' }
        ]}
      />
    </div>
  );
};

export default TechHub;
