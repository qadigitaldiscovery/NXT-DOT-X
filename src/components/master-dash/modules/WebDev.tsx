
import React from 'react';
import { Code2 } from 'lucide-react';
import { ModuleCard } from '../ModuleCard';
import { useNavigate } from 'react-router-dom';

const WebDev = () => {
  const navigate = useNavigate();

  return (
    <ModuleCard
      title="Web Development"
      description="Web development tools and deployment management"
      icon={<Code2 size={24} />}
      features={[
        { name: 'Code Repository', path: '/web-dev/repository' },
        { name: 'Deployment Pipeline', path: '/web-dev/deployment' },
        { name: 'Version Control', path: '/web-dev/version' },
        { name: 'Testing Suite', path: '/web-dev/testing' }
      ]}
      onClick={() => navigate('/web-dev')}
    />
  );
};

export default WebDev;
