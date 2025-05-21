import { jsx as _jsx } from "react/jsx-runtime";
import { ModuleCard } from '../ModuleCard';
const SupplierManagement = () => {
    return (_jsx("div", { className: "col-span-1", children: _jsx(ModuleCard, { title: "SUPPLIER MANAGEMENT", path: "/supplier-management", variant: "default", features: [
                { name: 'Supplier Directory', path: '/supplier-management' },
                { name: 'Performance Tracking', path: '/supplier-management/performance' },
                { name: 'Contract Management', path: '/supplier-management/contracts' },
                { name: 'Supplier Settings', path: '/supplier-management/settings' }
            ] }) }));
};
export default SupplierManagement;
