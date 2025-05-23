
import React from 'react';
import { Globe } from 'lucide-react';
import { ModuleCard } from '../ModuleCard';
import { useNavigate } from 'react-router-dom';

const WebServices = () => {
  const navigate = useNavigate();

  return (
    <ModuleCard
      title="Web Services"
      description="API management and web service integration"
      icon={<Globe size={24} />}
      features={[
        { name: 'API Gateway', path: '/web-services/gateway' },
        { name: 'Service Registry', path: '/web-services/registry' },
        { name: 'Documentation', path: '/web-services/docs' },
        { name: 'Analytics', path: '/web-services/analytics' }
      ]}
      onClick={() => navigate('/web-services')}
      variant="default"
    />
  );
};

export default WebServices;
