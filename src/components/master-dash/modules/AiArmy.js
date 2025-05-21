import { jsx as _jsx } from "react/jsx-runtime";
import { ModuleCard } from '../ModuleCard';
const AiArmy = () => {
    return (_jsx("div", { className: "col-span-1", children: _jsx(ModuleCard, { title: "AI ARMY", path: "/ai-army", variant: "default", features: [
                { name: 'AI Studio', path: '/ai-army/studio' },
                { name: 'Bot Management', path: '/ai-army/bots' },
                { name: 'Training Center', path: '/ai-army/training' },
                { name: 'AI Metrics', path: '/ai-army/metrics' }
            ] }) }));
};
export default AiArmy;
