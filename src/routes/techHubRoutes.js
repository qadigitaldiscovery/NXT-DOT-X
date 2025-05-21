import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Route } from "react-router-dom";
import { Outlet } from "react-router-dom";
import TechHubPersonas from "@/pages/TechHubPersonas";
import TechHubApiManagement from "@/pages/APIsPage";
import TechHubTechnicalConfig from "@/pages/TechHubTechnicalConfig";
import RequestyPage from "@/pages/RequestyPage";
import TechHubLayout from "@/components/layout/TechHubLayout";
import OdooIntegrationWrapper from "@/components/integrations/odoo/OdooIntegrationWrapper";
import WooCommerceWrapper from "@/components/integrations/woocommerce/WooCommerceWrapper";
import BlackBoxAIService from "@/components/cloud-services/BlackBoxAIService";
import NotFound from "@/pages/NotFound";
export const TechHubRoutes = () => {
    return [
        _jsxs(Route, { path: "/tech-hub", element: _jsx(TechHubLayout, {}), children: [_jsx(Route, { index: true, element: _jsx(TechHubPersonas, {}) }), _jsx(Route, { path: "personas", element: _jsx(TechHubPersonas, {}) }), _jsx(Route, { path: "technical-config", element: _jsx(TechHubTechnicalConfig, {}) }), _jsx(Route, { path: "api-management", element: _jsx(TechHubApiManagement, {}) }), _jsx(Route, { path: "api-management/requesty", element: _jsx(RequestyPage, {}) }), _jsxs(Route, { path: "integrations", element: _jsx(Outlet, {}), children: [_jsx(Route, { index: true, element: _jsx("div", { className: "p-6 text-center", children: "Select an integration from the menu" }) }), _jsx(Route, { path: "odoo", element: _jsx(OdooIntegrationWrapper, {}) }), _jsx(Route, { path: "woocommerce", element: _jsx(WooCommerceWrapper, {}) })] }), _jsxs(Route, { path: "cloud-services", element: _jsx(Outlet, {}), children: [_jsx(Route, { index: true, element: _jsx("div", { className: "p-6 text-center", children: "Cloud Services - Feature coming soon" }) }), _jsx(Route, { path: "blackbox-ai", element: _jsx(BlackBoxAIService, {}) })] }), _jsx(Route, { path: "settings", element: _jsx("div", { className: "p-6 text-center", children: "Tech Hub Settings - Feature coming soon" }) }), _jsx(Route, { path: "database", element: _jsx("div", { className: "p-6 text-center", children: "Database Admin - Feature coming soon" }) }), _jsx(Route, { path: "documentation", element: _jsx("div", { className: "p-6 text-center", children: "Documentation - Feature coming soon" }) }), _jsx(Route, { path: "activity", element: _jsx("div", { className: "p-6 text-center", children: "Activity Logs - Feature coming soon" }) }), _jsx(Route, { path: "support", element: _jsx("div", { className: "p-6 text-center", children: "Tech Hub Support - Feature coming soon" }) }), _jsx(Route, { path: "rag-dashboard", element: _jsx("div", { className: "p-6 text-center", children: "RAG Dashboard - Feature coming soon" }) }), _jsx(Route, { path: "*", element: _jsx(NotFound, {}) })] }, "tech-hub-layout")
    ];
};
