import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileCode, Cloud, Settings, BrainCircuit, Server } from "lucide-react";
import ApiKeyForm from "@/components/tech-hub/api-management/ApiKeyForm";
import ApiEndpointList from "@/components/tech-hub/api-management/ApiEndpointList";
import ApiPermissionsTable from "@/components/tech-hub/api-management/ApiPermissionsTable";
import TechHubPersonas from './TechHubPersonas';
import ProvidersSection from '@/components/tech-hub/api-management/ProvidersSection';
const TechHubApiManagement = () => {
    const [activeTab, setActiveTab] = useState("apis");
    return (_jsxs("div", { className: "space-y-8", children: [_jsx("div", { className: "flex justify-between items-center", children: _jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold", children: "Tech Hub API Management" }), _jsx("p", { className: "text-muted-foreground", children: "Manage outgoing API connections and incoming API keys for the Tech Hub platform." })] }) }), _jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, className: "w-full", children: [_jsxs(TabsList, { className: "mb-4", children: [_jsxs(TabsTrigger, { value: "apis", children: [_jsx(FileCode, { className: "h-4 w-4 mr-1" }), "API Endpoints"] }), _jsxs(TabsTrigger, { value: "keys", children: [_jsx(Cloud, { className: "h-4 w-4 mr-1" }), "API Keys"] }), _jsxs(TabsTrigger, { value: "permissions", children: [_jsx(Settings, { className: "h-4 w-4 mr-1" }), "Permissions"] }), _jsxs(TabsTrigger, { value: "providers", children: [_jsx(Server, { className: "h-4 w-4 mr-1" }), "Providers"] }), _jsxs(TabsTrigger, { value: "personas", children: [_jsx(BrainCircuit, { className: "h-4 w-4 mr-1" }), "AI Assistance"] })] }), _jsx(TabsContent, { value: "apis", children: _jsx(ApiEndpointList, {}) }), _jsx(TabsContent, { value: "keys", children: _jsx(ApiKeyForm, {}) }), _jsx(TabsContent, { value: "permissions", children: _jsx(ApiPermissionsTable, {}) }), _jsx(TabsContent, { value: "providers", children: _jsx(ProvidersSection, {}) }), _jsx(TabsContent, { value: "personas", children: _jsx(TechHubPersonas, {}) })] })] }));
};
export default TechHubApiManagement;
