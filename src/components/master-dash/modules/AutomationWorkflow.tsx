
import { ModuleCard } from '../ModuleCard';

const AutomationWorkflow = () => {
  return (
    <div className="col-span-1">
      <ModuleCard
        title="AUTOMATION + WORKFLOW"
        path="/automation"
        variant="default"
        features={[
          { name: 'Workflow Builder', path: '/automation/workflows' },
          { name: 'Task Automation', path: '/automation/tasks' },
          { name: 'Triggers', path: '/automation/triggers' },
          { name: 'Analytics', path: '/automation/analytics' }
        ]}
      />
    </div>
  );
};

export default AutomationWorkflow;
