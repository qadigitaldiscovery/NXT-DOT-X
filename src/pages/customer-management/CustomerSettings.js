import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DefaultCustomerSettings } from '@/components/customers/settings/DefaultCustomerSettings';
import { CustomerColumnMappings } from '@/components/customers/settings/CustomerColumnMappings';
const CustomerSettings = () => {
    const [activeTab, setActiveTab] = useState('defaults');
    return (_jsx(DashboardLayout, { children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight", children: "Customer Settings" }), _jsx("p", { className: "text-muted-foreground mt-2", children: "Configure default settings and column mappings for customers." })] }), _jsxs(Tabs, { defaultValue: activeTab, onValueChange: setActiveTab, className: "space-y-4", children: [_jsxs(TabsList, { children: [_jsx(TabsTrigger, { value: "defaults", children: "Default Settings" }), _jsx(TabsTrigger, { value: "mappings", children: "Column Mappings" })] }), _jsx(TabsContent, { value: "defaults", className: "space-y-4", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Default Customer Settings" }), _jsx(CardDescription, { children: "Configure default values when creating new customers." })] }), _jsx(CardContent, { children: _jsx(DefaultCustomerSettings, {}) })] }) }), _jsx(TabsContent, { value: "mappings", className: "space-y-4", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Column Mappings" }), _jsx(CardDescription, { children: "Configure how customer file columns map to system fields." })] }), _jsx(CardContent, { children: _jsx(CustomerColumnMappings, {}) })] }) })] })] }) }));
};
export default CustomerSettings;
