
import { ModuleCard } from '../ModuleCard';

const WebServices = () => {
  return (
    <div className="col-span-1">
      <ModuleCard
        title="Web Services"
        path="/web-services"
        variant="default"
        features={[
          { name: 'Hosting Management', path: '/web-services/hosting' },
          { name: 'Email Services', path: '/web-services/email' },
          { name: 'Cloud Infrastructure', path: '/web-services/cloud' },
          { name: 'SaaS Applications', path: '/web-services/saas' },
          { name: 'Domain Management', path: '/web-services/domains' }
        ]}
      />
    </div>
  );
};

export default WebServices;
