import { jsx as _jsx } from "react/jsx-runtime";
import { ModuleCard } from '../ModuleCard';
const TechHub = () => {
    return (_jsx("div", { className: "col-span-1", children: _jsx(ModuleCard, { title: "TECH HUB", path: "/tech-hub", variant: "default", features: [
                { name: 'AI Personas', path: '/tech-hub/personas' },
                { name: 'API Management', path: '/tech-hub/api-management' },
                { name: 'Integrations', path: '/tech-hub/integrations' },
                { name: 'Technical Config', path: '/tech-hub/technical-config' }
            ] }) }));
};
export default TechHub;
