import { jsx as _jsx } from "react/jsx-runtime";
import { useAuth } from '@/context/AuthContext';
import RAGDashboardGridContainer from '@/components/rag-dashboard/RAGDashboardGridContainer';
import PermissionGuard from '@/components/rag-dashboard/PermissionGuard';
import { useModules } from '@/hooks/useModules';
import { useAlerts } from '@/hooks/useAlerts';
import { useThresholdRules } from '@/hooks/useThresholdRules';
import { DashboardProvider } from '@/components/rag-dashboard/providers/DashboardProvider';
import { PlatformLayout } from '@/components/layouts/PlatformLayout';
import { ragDashboardNavigation } from '@/components/rag-dashboard/config/dashboardNavigation';
const RAGDashboardPage = () => {
    const { user } = useAuth();
    const { modules, refreshModules } = useModules();
    const { alerts, resolveAlert } = useAlerts();
    const { rules, addRule, deleteRule } = useThresholdRules();
    // Added function to handle batch operations
    const handleBatchOperationsOpen = () => {
        console.log("Batch operations opened");
        // Implementation would go here in a real app
    };
    return (_jsx(PermissionGuard, { requiredPermission: "user", children: _jsx(DashboardProvider, { refreshModules: refreshModules, resolveAlert: resolveAlert, addRule: addRule, deleteRule: deleteRule, children: _jsx(PlatformLayout, { moduleTitle: "RAG Dashboard", navCategories: ragDashboardNavigation, children: _jsx(RAGDashboardGridContainer, {}) }) }) }));
};
export default RAGDashboardPage;
