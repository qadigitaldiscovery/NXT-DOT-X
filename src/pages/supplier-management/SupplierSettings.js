import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DefaultSupplierSettings } from '@/components/suppliers/settings/DefaultSupplierSettings';
import { ColumnMappingsManager } from '@/components/suppliers/settings/ColumnMappingsManager';
const SupplierSettings = () => {
    const [activeTab, setActiveTab] = useState('defaults');
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight", children: "Supplier Settings" }), _jsx("p", { className: "text-muted-foreground mt-2", children: "Configure default settings and column mappings for suppliers." })] }), _jsxs(Tabs, { defaultValue: activeTab, onValueChange: setActiveTab, className: "space-y-4", children: [_jsxs(TabsList, { children: [_jsx(TabsTrigger, { value: "defaults", children: "Default Settings" }), _jsx(TabsTrigger, { value: "mappings", children: "Column Mappings" })] }), _jsx(TabsContent, { value: "defaults", className: "space-y-4", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Default Supplier Settings" }), _jsx(CardDescription, { children: "Configure default values when creating new suppliers." })] }), _jsx(CardContent, { children: _jsx(DefaultSupplierSettings, {}) })] }) }), _jsx(TabsContent, { value: "mappings", className: "space-y-4", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Column Mappings" }), _jsx(CardDescription, { children: "Configure how supplier file columns map to system fields." })] }), _jsx(CardContent, { children: _jsx(ColumnMappingsManager, {}) })] }) })] })] }));
};
export default SupplierSettings;
