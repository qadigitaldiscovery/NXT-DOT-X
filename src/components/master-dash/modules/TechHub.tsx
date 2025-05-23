
import React from 'react';
import { Code } from 'lucide-react';
import { ModuleCard } from '../ModuleCard';

const TechHub = () => {
  return (
    <ModuleCard
      title="Tech Hub"
      description="Developer tools, API management, and technical configurations"
      icon={<Code size={24} />}
      features={[
        { name: 'API Management', path: '/tech-hub/apis' },
        { name: 'AI Personas', path: '/tech-hub/personas' },
        { name: 'Integrations', path: '/tech-hub/integrations' },
        { name: 'Technical Config', path: '/tech-hub/config' }
      ]}
      onClick={() => window.location.href = '/tech-hub'}
    />
  );
};

export default TechHub;
