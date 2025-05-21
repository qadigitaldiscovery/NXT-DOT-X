import { jsx as _jsx } from "react/jsx-runtime";
import { ModuleCard } from '../ModuleCard';
const SystemTechnicalConfig = () => {
    return (_jsx("div", { className: "col-span-1", children: _jsx(ModuleCard, { title: "SYSTEM TECHNICAL CONFIG", path: "/system/config", variant: "default", features: [
                { name: 'Database Settings', path: '/system/config/database' },
                { name: 'API Servers', path: '/system/config/api' },
                { name: 'Cloud Storage', path: '/system/config/storage' },
                { name: 'Security Settings', path: '/system/config/security' }
            ] }) }));
};
export default SystemTechnicalConfig;
