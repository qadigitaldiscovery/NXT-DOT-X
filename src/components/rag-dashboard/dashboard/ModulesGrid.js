import { jsx as _jsx } from "react/jsx-runtime";
import ModuleCard from '@/components/rag-dashboard/ModuleCard';
// Export as a named constant to match import in RAGDashboardPage
export const ModulesGrid = ({ modules, isLoading, hasError, alertCountByModule, onViewDetails }) => {
    if (isLoading) {
        return _jsx("div", { className: "py-8 text-center", children: "Loading modules..." });
    }
    if (hasError) {
        return (_jsx("div", { className: "py-8 text-center text-red-500", children: "Error loading modules. Please refresh and try again." }));
    }
    if (modules.length === 0) {
        return _jsx("div", { className: "py-8 text-center", children: "No modules match the current filters." });
    }
    return (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: modules.map((module) => (_jsx(ModuleCard, { module: module, alertCount: alertCountByModule[module.id] || 0, onViewDetails: onViewDetails }, module.id))) }));
};
// Keep default export for backward compatibility
export default ModulesGrid;
