import { jsx as _jsx } from "react/jsx-runtime";
import { ModuleCard } from '../ModuleCard';
const DataManagement = () => {
    return (_jsx("div", { className: "col-span-1", children: _jsx(ModuleCard, { title: "DATA MANAGEMENT", path: "/data-management", variant: "default", features: [
                { name: 'Dashboard', path: '/data-management' },
                { name: 'Cost Analysis', path: '/data-management/cost-analysis' },
                { name: 'Data Connections', path: '/data-management/connections' },
                { name: 'Export Data', path: '/data-management/export-data' },
                { name: 'Data Insights', path: '/data-management/insights' }
            ] }) }));
};
export default DataManagement;
