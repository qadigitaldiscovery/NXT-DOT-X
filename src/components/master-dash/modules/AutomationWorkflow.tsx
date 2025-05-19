
import { ModuleCard } from '../ModuleCard';
import { Workflow } from 'lucide-react';

const AutomationWorkflow = () => {
  return (
    <div className="col-span-1">
      <ModuleCard
        title="Automation + Workflow"
        icon={<Workflow className="h-8 w-8" />}
        path="/automation-workflow"
        variant="default"
        features={[
          { name: 'Workflow Builder', path: '/automation-workflow/builder' },
          { name: 'Automation Rules', path: '/automation-workflow/rules' },
          { name: 'Task Scheduling', path: '/automation-workflow/scheduling' },
          { name: 'Integrations', path: '/automation-workflow/integrations' },
          { name: 'Reporting', path: '/automation-workflow/reports' }
        ]}
      />
    </div>
  );
};

export default AutomationWorkflow;
