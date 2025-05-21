import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { PlatformLayout } from '@/components/layouts/PlatformLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ragDashboardNavigation } from '@/components/rag-dashboard/config/dashboardNavigation';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useUserPreferences } from '@/hooks/useUserPreferences';
const RAGSettings = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { preferences, setPreferences, loading } = useUserPreferences({
        module: 'rag_dashboard',
        key: 'settings',
        defaultValue: {
            enableNotifications: true,
            enableAutoRefresh: true,
            showCriticalOnly: false
        }
    });
    const form = useForm({
        defaultValues: {
            enableNotifications: preferences?.enableNotifications ?? true,
            enableAutoRefresh: preferences?.enableAutoRefresh ?? true,
            showCriticalOnly: preferences?.showCriticalOnly ?? false
        }
    });
    // Update form values when preferences load or user changes
    React.useEffect(() => {
        if (!loading && preferences) {
            form.reset({
                enableNotifications: preferences.enableNotifications ?? true,
                enableAutoRefresh: preferences.enableAutoRefresh ?? true,
                showCriticalOnly: preferences.showCriticalOnly ?? false
            });
        }
    }, [preferences, loading, form, user]);
    const onSubmit = async (data) => {
        const result = await setPreferences(data);
        if (result.success) {
            toast.success("Settings saved successfully");
        }
        else {
            toast.error("Failed to save settings");
        }
    };
    if (loading) {
        return (_jsx(PlatformLayout, { moduleTitle: "RAG Dashboard Settings", navCategories: ragDashboardNavigation, children: _jsx("div", { className: "container mx-auto p-4", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx("div", { className: "h-7 bg-gray-200 rounded animate-pulse w-1/3 mb-2" }), _jsx("div", { className: "h-4 bg-gray-200 rounded animate-pulse w-1/2" })] }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: [1, 2, 3].map(i => (_jsxs("div", { className: "flex justify-between", children: [_jsx("div", { className: "h-5 bg-gray-200 rounded animate-pulse w-1/4" }), _jsx("div", { className: "h-6 bg-gray-200 rounded-full animate-pulse w-12" })] }, i))) }) })] }) }) }));
    }
    return (_jsx(PlatformLayout, { moduleTitle: "RAG Dashboard Settings", navCategories: ragDashboardNavigation, children: _jsx("div", { className: "container mx-auto p-4", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "RAG Dashboard Settings" }), _jsx(CardDescription, { children: "Configure your RAG dashboard preferences" })] }), _jsx(CardContent, { children: _jsx(Form, { ...form, children: _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-6", children: [_jsx(FormField, { control: form.control, name: "enableNotifications", render: ({ field }) => (_jsxs(FormItem, { className: "flex flex-row items-center justify-between rounded-lg border p-4", children: [_jsxs("div", { className: "space-y-0.5", children: [_jsx(FormLabel, { className: "text-base", children: "Notifications" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Receive alerts when system status changes" })] }), _jsx(FormControl, { children: _jsx(Switch, { checked: field.value, onCheckedChange: field.onChange }) })] })) }), _jsx(FormField, { control: form.control, name: "enableAutoRefresh", render: ({ field }) => (_jsxs(FormItem, { className: "flex flex-row items-center justify-between rounded-lg border p-4", children: [_jsxs("div", { className: "space-y-0.5", children: [_jsx(FormLabel, { className: "text-base", children: "Auto-refresh Dashboard" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Automatically refresh dashboard data every 60 seconds" })] }), _jsx(FormControl, { children: _jsx(Switch, { checked: field.value, onCheckedChange: field.onChange }) })] })) }), _jsx(FormField, { control: form.control, name: "showCriticalOnly", render: ({ field }) => (_jsxs(FormItem, { className: "flex flex-row items-center justify-between rounded-lg border p-4", children: [_jsxs("div", { className: "space-y-0.5", children: [_jsx(FormLabel, { className: "text-base", children: "Show Critical Only" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Filter dashboard to only show critical status modules" })] }), _jsx(FormControl, { children: _jsx(Switch, { checked: field.value, onCheckedChange: field.onChange }) })] })) }), _jsx(Button, { type: "submit", children: "Save Settings" })] }) }) }), _jsx(CardFooter, { className: "flex justify-between", children: _jsx(Button, { variant: "outline", onClick: () => navigate('/dashboard/rag'), children: "Return to Dashboard" }) })] }) }) }));
};
export default RAGSettings;
