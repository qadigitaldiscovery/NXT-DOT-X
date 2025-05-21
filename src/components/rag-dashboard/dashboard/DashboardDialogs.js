import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import ModuleDetailsDialog from '@/components/rag-dashboard/ModuleDetailsDialog';
import BatchOperationsDialog from '@/components/rag-dashboard/BatchOperationsDialog';
export const DashboardDialogs = ({ isDetailsOpen, onDetailsClose, selectedModule, logs, moduleAlerts, rules, impacts, logsLoading, alertsLoading, rulesLoading, impactsLoading, onResolveAlert, onAddRule, onDeleteRule, isBatchOperationsOpen, onBatchOperationsClose, modules // Added parameter for the prop
 }) => {
    return (_jsxs(_Fragment, { children: [_jsx(ModuleDetailsDialog, { isOpen: isDetailsOpen, onClose: onDetailsClose, module: selectedModule, statusLogs: logs, alerts: moduleAlerts, rules: rules, customerImpacts: impacts, logsLoading: logsLoading, alertsLoading: alertsLoading, rulesLoading: rulesLoading, impactsLoading: impactsLoading, onResolveAlert: onResolveAlert, onAddRule: onAddRule, onDeleteRule: onDeleteRule }), _jsx(BatchOperationsDialog, { isOpen: isBatchOperationsOpen, onClose: onBatchOperationsClose, modules: modules })] }));
};
export default DashboardDialogs;
