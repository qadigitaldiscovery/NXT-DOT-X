import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { Suspense } from 'react';
import { PlatformLayout } from '@/components/layouts/PlatformLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ragDashboardNavigation } from '@/components/rag-dashboard/config/dashboardNavigation';
import AlertsList from '@/components/rag-dashboard/AlertsList';
import ThresholdRulesList from '@/components/rag-dashboard/ThresholdRulesList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RuleForm from '@/components/rag-dashboard/RuleForm';
import { AlertTriangle, Settings, Bell } from 'lucide-react';
import { useAlerts } from '@/hooks/useAlerts';
import { useThresholdRules } from '@/hooks/useThresholdRules';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { useModules } from '@/hooks/useModules';
const LoadingCard = () => (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx("div", { className: "h-7 bg-gray-200 rounded animate-pulse w-1/3 mb-2" }), _jsx("div", { className: "h-4 bg-gray-200 rounded animate-pulse w-1/2" })] }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: [1, 2, 3].map(i => (_jsx("div", { className: "h-16 bg-gray-200 rounded animate-pulse" }, i))) }) })] }));
const RAGAlerts = () => {
    const navigate = useNavigate();
    const { preferences, loading: prefsLoading } = useUserPreferences({
        module: 'rag_dashboard',
        key: 'alerts_view',
        defaultValue: { activeTab: 'current' }
    });
    const [activeTab, setActiveTab] = React.useState('current');
    const { alerts, loading: alertsLoading, resolveAlert } = useAlerts();
    const { rules, loading: rulesLoading, deleteRule, addRule } = useThresholdRules();
    const { modules } = useModules();
    const [selectedModule, setSelectedModule] = React.useState(null);
    React.useEffect(() => {
        if (!prefsLoading && preferences?.activeTab) {
            setActiveTab(preferences.activeTab);
        }
    }, [preferences, prefsLoading]);
    // Handle adding a new rule
    const handleAddRule = async (rule) => {
        const result = await addRule(rule);
        if (result.success) {
            setActiveTab('rules');
        }
        return result;
    };
    return (_jsx(PlatformLayout, { moduleTitle: "RAG Alerts Center", navCategories: ragDashboardNavigation, children: _jsxs("div", { className: "container mx-auto p-4", children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsxs("div", { children: [_jsxs("h1", { className: "text-2xl font-bold flex items-center", children: [_jsx(AlertTriangle, { className: "h-6 w-6 mr-2 text-amber-500" }), "RAG Alerts Center"] }), _jsx("p", { className: "text-muted-foreground", children: "Manage system alerts and notification rules" })] }), _jsx("div", { className: "flex items-center gap-2", children: !alertsLoading && alerts && (_jsxs(Badge, { variant: "outline", className: "bg-amber-50 text-amber-700 hover:bg-amber-100", children: [alerts.length, " Active ", alerts.length === 1 ? 'Alert' : 'Alerts'] })) })] }), _jsxs(Tabs, { defaultValue: activeTab, onValueChange: setActiveTab, className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-3 lg:w-[400px]", children: [_jsxs(TabsTrigger, { value: "current", className: "flex items-center", children: [_jsx(Bell, { className: "h-4 w-4 mr-2" }), "Current Alerts"] }), _jsxs(TabsTrigger, { value: "rules", className: "flex items-center", children: [_jsx(Settings, { className: "h-4 w-4 mr-2" }), "Alert Rules"] }), _jsxs(TabsTrigger, { value: "new-rule", className: "flex items-center", children: [_jsx(AlertTriangle, { className: "h-4 w-4 mr-2" }), "New Rule"] })] }), _jsx(TabsContent, { value: "current", className: "space-y-4 mt-6", children: _jsx(Suspense, { fallback: _jsx(LoadingCard, {}), children: alertsLoading ? (_jsx(LoadingCard, {})) : (_jsx(AlertsList, { alerts: alerts || [], onResolve: resolveAlert })) }) }), _jsx(TabsContent, { value: "rules", className: "space-y-4 mt-6", children: _jsx(Suspense, { fallback: _jsx(LoadingCard, {}), children: rulesLoading ? (_jsx(LoadingCard, {})) : (_jsx(ThresholdRulesList, { rules: rules || [], onDeleteRule: deleteRule, loading: rulesLoading })) }) }), _jsxs(TabsContent, { value: "new-rule", className: "space-y-4 mt-6", children: [modules && modules.length > 0 && selectedModule === null && (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Select Module" }), _jsx(CardDescription, { children: "Choose a module to create a rule for" })] }), _jsx(CardContent, { children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: modules.map(module => (_jsx(Card, { className: "cursor-pointer hover:bg-slate-50", onClick: () => setSelectedModule(module.id), children: _jsx(CardContent, { className: "p-4", children: _jsx("h3", { className: "font-medium", children: module.name }) }) }, module.id))) }) })] })), selectedModule && modules && (_jsxs("div", { children: [_jsx(Button, { variant: "outline", onClick: () => setSelectedModule(null), className: "mb-4", children: "\u2190 Back to module selection" }), _jsx(RuleForm, { module: modules.find(m => m.id === selectedModule), onAddRule: handleAddRule })] })), !modules || modules.length === 0 ? (_jsx(Card, { children: _jsx(CardContent, { className: "p-6", children: _jsx("p", { children: "No modules are available. Please add modules first." }) }) })) : null] })] })] }) }));
};
export default RAGAlerts;
