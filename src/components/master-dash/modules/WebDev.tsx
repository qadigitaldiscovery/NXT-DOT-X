
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ModuleCard } from '../ModuleCard';
import { FileCode } from 'lucide-react';

const WebDev: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <ModuleCard
      title="WebDev Module"
      path="/webdev"
      description="Route mapping and web development tools"
      variant="default"
      icon={FileCode}
      features={[
        { name: 'Visual Route Editor', path: '/webdev' },
        { name: 'Route Preview', path: '/webdev' }
      ]}
    />
  );
};

export default WebDev;
