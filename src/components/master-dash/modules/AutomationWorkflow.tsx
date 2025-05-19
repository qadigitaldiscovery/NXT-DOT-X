
import { ModuleCard } from '../ModuleCard';

const AutomationWorkflow = () => {
  return (
    <div className="col-span-1">
      <ModuleCard
        title="Automation + Workflow"
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
