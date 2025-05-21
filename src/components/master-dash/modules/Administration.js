import { jsx as _jsx } from "react/jsx-runtime";
import { ModuleCard } from '../ModuleCard';
const Administration = () => {
    return (_jsx("div", { className: "col-span-1", children: _jsx(ModuleCard, { title: "ADMINISTRATION", path: "/admin", variant: "default", features: [
                { name: 'User Management', path: '/admin/users' },
                { name: 'Security Controls', path: '/admin/security' },
                { name: 'Module Access', path: '/admin/module-access' },
                { name: 'Database Admin', path: '/admin/database' }
            ] }) }));
};
export default Administration;
