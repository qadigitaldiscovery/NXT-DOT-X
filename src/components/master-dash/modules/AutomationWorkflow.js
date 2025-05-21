import { jsx as _jsx } from "react/jsx-runtime";
import { ModuleCard } from '../ModuleCard';
const AutomationWorkflow = () => {
    return (_jsx("div", { className: "col-span-1", children: _jsx(ModuleCard, { title: "AUTOMATION + WORKFLOW", path: "/automation", variant: "default", features: [
                { name: 'Workflow Builder', path: '/automation/workflows' },
                { name: 'Task Automation', path: '/automation/tasks' },
                { name: 'Triggers', path: '/automation/triggers' },
                { name: 'Analytics', path: '/automation/analytics' }
            ] }) }));
};
export default AutomationWorkflow;
