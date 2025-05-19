
import { ModuleCard } from '../ModuleCard';

const WebServices = () => {
  return (
    <div className="col-span-1">
      <ModuleCard
        title="WEB SERVICES"
        path="/web-services"
        variant="default"
        features={[
          { name: 'Hosting', path: '/web-services/hosting' },
          { name: 'Email Services', path: '/web-services/email' },
          { name: 'Domain Management', path: '/web-services/domains' },
          { name: 'Cloud Infrastructure', path: '/web-services/cloud' }
        ]}
      />
    </div>
  );
};

export default WebServices;
