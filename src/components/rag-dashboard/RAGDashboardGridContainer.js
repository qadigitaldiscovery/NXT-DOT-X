import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useModules } from '@/hooks/useModules';
import { useAlerts } from '@/hooks/useAlerts';
import { useDashboardState } from './hooks/useDashboardState';
import OverviewStats from './OverviewStats';
import ModulesGrid from './dashboard/ModulesGrid';
import { DashboardDialogs } from './dashboard/DashboardDialogs';
import { useStatusLogs } from '@/hooks/useStatusLogs';
import { useThresholdRules } from '@/hooks/useThresholdRules';
import { useCustomerImpacts } from '@/hooks/useCustomerImpacts';
import { DashboardFilters } from './dashboard/DashboardFilters';
import { RefreshCw, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
const RAGDashboardGridContainer = () => {
    const { modules, loading: modulesLoading, error: modulesError } = useModules();
    const { alerts, loading: alertsLoading, resolveAlert } = useAlerts();
    const { getLogsByModuleId, loading: logsLoading } = useStatusLogs();
    const { rules, loading: rulesLoading, addRule, deleteRule } = useThresholdRules();
    const { impacts, loading: impactsLoading } = useCustomerImpacts();
    const { selectedStatus, setSelectedStatus, searchQuery, setSearchQuery, filteredModules, alertCountByModule, selectedModule, setSelectedModule, isDetailsOpen, setIsDetailsOpen, isBatchOperationsOpen, setIsBatchOperationsOpen } = useDashboardState(modules || [], alerts || []);
    // State for module-specific data
    const [moduleStatusLogs, setModuleStatusLogs] = useState([]);
    const [moduleAlerts, setModuleAlerts] = useState([]);
    const [moduleRules, setModuleRules] = useState([]);
    const [moduleImpacts, setModuleImpacts] = useState([]);
    // Handle opening module details
    const onViewDetails = async (module) => {
        setSelectedModule(module);
        // Fetch module specific data
        const statusLogs = await getLogsByModuleId(module.id);
        setModuleStatusLogs(statusLogs);
        setModuleAlerts((alerts || []).filter(alert => alert.module_id === module.id));
        setModuleRules((rules || []).filter(rule => rule.module_id === module.id));
        setModuleImpacts((impacts || []).filter(impact => impact.module_id === module.id));
        setIsDetailsOpen(true);
    };
    // Handle batch operations dialog
    const handleBatchOperationsOpen = () => {
        setIsBatchOperationsOpen(true);
    };
    const handleRefresh = () => {
        // Check if we can refresh modules using console log
        console.log('Attempting to refresh modules data');
    };
    // Convert modules to be compatible with ModulesContext.Module type
    const compatibleModules = Array.isArray(modules) ? modules.map(m => ({
        ...m,
        isEnabled: m.status === 'green',
        isVisible: m.status !== 'red'
    })) : [];
    return (_jsxs("div", { className: "container mx-auto py-6 max-w-7xl", children: [_jsxs("div", { className: "mb-6 flex justify-between items-center", children: [_jsx("h1", { className: "text-2xl font-bold", children: "System Status Dashboard" }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsxs("a", { href: "#", className: "inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 hover:underline", onClick: (e) => {
                                    e.preventDefault();
                                    handleRefresh();
                                }, "aria-label": "Refresh data", children: [_jsx(RefreshCw, { className: cn("h-4 w-4 mr-2", modulesLoading && "animate-spin"), "aria-hidden": "true" }), "Refresh"] }), _jsxs("a", { href: "#", className: "inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 hover:underline", onClick: (e) => {
                                    e.preventDefault();
                                    handleBatchOperationsOpen();
                                }, "aria-label": "Batch Operations", children: [_jsx(Settings, { className: "h-4 w-4 mr-2", "aria-hidden": "true" }), "Batch Operations"] })] })] }), _jsx(DashboardFilters, { selectedStatus: selectedStatus, onStatusSelect: setSelectedStatus, searchQuery: searchQuery, onSearchChange: setSearchQuery }), _jsx(OverviewStats, { modules: compatibleModules, alerts: alerts || [] }), _jsx("h2", { className: "text-lg font-semibold mb-4", children: "Monitored Services" }), _jsx(ModulesGrid, { modules: filteredModules, isLoading: modulesLoading, hasError: !!modulesError, alertCountByModule: alertCountByModule, onViewDetails: onViewDetails }), _jsx(DashboardDialogs, { isDetailsOpen: isDetailsOpen, onDetailsClose: () => setIsDetailsOpen(false), selectedModule: selectedModule, logs: moduleStatusLogs, moduleAlerts: moduleAlerts, rules: moduleRules, impacts: moduleImpacts, logsLoading: logsLoading, alertsLoading: alertsLoading, rulesLoading: rulesLoading, impactsLoading: impactsLoading, onResolveAlert: resolveAlert, onAddRule: addRule, onDeleteRule: deleteRule, isBatchOperationsOpen: isBatchOperationsOpen, onBatchOperationsClose: () => setIsBatchOperationsOpen(false), modules: compatibleModules })] }));
};
export default RAGDashboardGridContainer;
