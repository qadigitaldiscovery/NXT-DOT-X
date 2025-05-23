
import React from 'react';
import { Settings } from 'lucide-react';
import { ModuleCard } from '../ModuleCard';
import { useNavigate } from 'react-router-dom';

const Operations = () => {
  const navigate = useNavigate();

  return (
    <ModuleCard
      title="Operations & Monitoring"
      description="Monitor and optimize business operations"
      icon={<Settings size={24} />}
      features={[
        { name: 'System Monitoring', path: '/operations/monitoring' },
        { name: 'Performance Metrics', path: '/operations/metrics' },
        { name: 'Health Checks', path: '/operations/health' },
        { name: 'Alerts & Logs', path: '/operations/alerts' }
      ]}
      onClick={() => navigate('/operations')}
      variant="default"
    />
  );
};

export default Operations;
