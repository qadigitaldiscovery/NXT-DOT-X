import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ModuleStatusFilter from '@/components/rag-dashboard/ModuleStatusFilter';
// Named export for the component
export const DashboardFilters = ({ selectedStatus, onStatusSelect, searchQuery, onSearchChange }) => {
    return (_jsxs("div", { className: "mb-6", children: [_jsx("h2", { className: "text-xl font-semibold mb-4", children: "System Modules" }), _jsx(ModuleStatusFilter, { selectedStatus: selectedStatus, onStatusSelect: onStatusSelect, searchQuery: searchQuery, onSearchChange: onSearchChange })] }));
};
// Default export for backward compatibility
export default DashboardFilters;
