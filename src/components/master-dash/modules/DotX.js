import { jsx as _jsx } from "react/jsx-runtime";
import { ModuleCard } from '../ModuleCard';
const DotX = () => {
    return (_jsx("div", { className: "col-span-1", children: _jsx(ModuleCard, { title: "INTELLIGENCE MANAGEMENT (DOT-X)", path: "/dot-x", variant: "default", features: [
                { name: 'Command Center', path: '/dot-x/command-center' },
                { name: 'AI Agents', path: '/dot-x/agents' },
                { name: 'Intelligence Reports', path: '/dot-x/reports' },
                { name: 'Knowledge Base', path: '/dot-x/knowledge' }
            ] }) }));
};
export default DotX;
