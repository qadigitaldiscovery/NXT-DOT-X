
import React from 'react';
import { Zap } from 'lucide-react';
import { ModuleCard } from '../ModuleCard';
import { useNavigate } from 'react-router-dom';

const AutomationWorkflow = () => {
  const navigate = useNavigate();

  return (
    <ModuleCard
      title="Automation & Workflows"
      description="Streamline business processes with intelligent automation"
      icon={<Zap size={24} />}
      features={[
        { name: 'Process Automation', path: '/workflows/automation' },
        { name: 'Workflow Designer', path: '/workflows/designer' },
        { name: 'Task Scheduling', path: '/workflows/scheduler' },
        { name: 'Integration Hub', path: '/workflows/integrations' }
      ]}
      onClick={() => navigate('/workflows')}
      variant="default"
    />
  );
};

export default AutomationWorkflow;
