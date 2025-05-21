import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StatusGauge from './rag-dashboard/StatusGauge';
import StatusTimeline from './rag-dashboard/StatusTimeline';
import AlertsList from './rag-dashboard/AlertsList';
import ThresholdRulesList from './rag-dashboard/ThresholdRulesList';
import CustomerImpactsList from './rag-dashboard/CustomerImpactsList';
import RuleForm from './rag-dashboard/RuleForm';
export default function ModuleDetailsDialog({ isOpen, onClose, module, statusLogs, alerts, rules, customerImpacts, logsLoading, alertsLoading, rulesLoading, impactsLoading, onResolveAlert, onAddRule, onDeleteRule }) {
    const [activeTab, setActiveTab] = useState('status');
    if (!module)
        return null;
    const unresolved = alerts.filter(a => !a.resolved);
    return (_jsx(Dialog, { open: isOpen, onOpenChange: (open) => !open && onClose(), children: _jsxs(DialogContent, { className: "max-w-4xl max-h-[80vh] overflow-y-auto", children: [_jsx(DialogHeader, { children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(StatusGauge, { status: module.status, size: "lg", showLabel: true }), _jsxs("div", { children: [_jsx(DialogTitle, { className: "text-2xl", children: module.name }), _jsx(DialogDescription, { className: "mt-1", children: module.description })] })] }) }), _jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, className: "mt-4", children: [_jsxs(TabsList, { className: "grid grid-cols-4", children: [_jsx(TabsTrigger, { value: "status", children: "Status History" }), _jsxs(TabsTrigger, { value: "alerts", className: "relative", children: ["Alerts", unresolved.length > 0 && (_jsx("span", { className: "absolute top-0 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white", children: unresolved.length }))] }), _jsx(TabsTrigger, { value: "rules", children: "Threshold Rules" }), _jsx(TabsTrigger, { value: "impact", children: "Customer Impact" })] }), _jsxs("div", { className: "mt-4", children: [_jsx(TabsContent, { value: "status", children: _jsx(StatusTimeline, { logs: statusLogs, loading: logsLoading }) }), _jsx(TabsContent, { value: "alerts", children: _jsx(AlertsList, { alerts: alerts, onResolve: onResolveAlert, loading: alertsLoading }) }), _jsx(TabsContent, { value: "rules", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsx(ThresholdRulesList, { rules: rules, onDeleteRule: onDeleteRule, loading: rulesLoading }), _jsx(RuleForm, { module: module, onAddRule: onAddRule })] }) }), _jsx(TabsContent, { value: "impact", children: _jsx(CustomerImpactsList, { impacts: customerImpacts, loading: impactsLoading }) })] })] })] }) }));
}
