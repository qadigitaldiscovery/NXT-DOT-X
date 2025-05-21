import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import KpiCard from './KpiCard';
import { useKpiIndicators } from '@/hooks/useKpiIndicators';
const RAGDashboardGrid = ({ className }) => {
    const { kpis, loading, error } = useKpiIndicators();
    if (loading) {
        return (_jsx("div", { className: "flex justify-center items-center py-8", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" }) }));
    }
    if (error) {
        return (_jsx("div", { className: "bg-red-50 border border-red-200 rounded-md p-4 my-4", children: _jsxs("div", { className: "flex", children: [_jsx("div", { className: "flex-shrink-0", children: _jsxs("svg", { className: "h-5 w-5 text-red-400", fill: "currentColor", viewBox: "0 0 20 20", children: [_jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm-1-9v4h2V9H9z", clipRule: "evenodd" }), _jsx("path", { fillRule: "evenodd", d: "M10 6a1 1 0 100-2 1 1 0 000 2z", clipRule: "evenodd" })] }) }), _jsxs("div", { className: "ml-3", children: [_jsx("h3", { className: "text-sm font-medium text-red-800", children: "Error loading KPI indicators" }), _jsx("div", { className: "mt-2 text-sm text-red-700", children: _jsx("p", { children: error.message }) })] })] }) }));
    }
    // Group KPIs by module_name
    const kpisByModule = kpis.reduce((acc, kpi) => {
        if (!acc[kpi.module_name]) {
            acc[kpi.module_name] = [];
        }
        acc[kpi.module_name].push(kpi);
        return acc;
    }, {});
    return (_jsxs("div", { className: className, children: [Object.entries(kpisByModule).map(([moduleName, moduleKpis]) => (_jsxs("div", { className: "mb-8", children: [_jsx("h2", { className: "text-lg font-semibold mb-4", children: moduleName }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4", children: moduleKpis.map((kpi) => (_jsx(KpiCard, { title: kpi.kpi_title, value: kpi.kpi_value, status: kpi.rag_status }, kpi.id))) })] }, moduleName))), kpis.length === 0 && (_jsx("div", { className: "text-center py-8 text-gray-500", children: "No KPI indicators found. Please add some data to the kpi_indicators table." }))] }));
};
export default RAGDashboardGrid;
