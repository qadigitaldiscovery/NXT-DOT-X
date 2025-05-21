import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { Suspense } from "react";
import { Route } from "react-router-dom";
import RAGDashboardPage from "@/pages/rag-dashboard/RAGDashboardPage";
import RAGAnalytics from "@/pages/RAGAnalytics";
import PermissionGuard from "@/components/PermissionGuard";
import { PlatformLayout } from '@/components/layouts/PlatformLayout';
import { ragDashboardNavigation } from "@/components/rag-dashboard/config/dashboardNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Lazy-loaded components for better performance
const RAGSettings = React.lazy(() => import("@/pages/auto/RAGSettings"));
const RAGAlerts = React.lazy(() => import("@/pages/auto/RAGAlerts"));
// Loading fallback component
const LoadingFallback = () => (_jsx(PlatformLayout, { moduleTitle: "Loading...", navCategories: ragDashboardNavigation, children: _jsx("div", { className: "container p-4", children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Loading..." }) }), _jsx(CardContent, { children: _jsx("div", { className: "animate-pulse flex space-x-4", children: _jsxs("div", { className: "flex-1 space-y-4 py-1", children: [_jsx("div", { className: "h-4 bg-gray-200 rounded w-3/4" }), _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "h-4 bg-gray-200 rounded" }), _jsx("div", { className: "h-4 bg-gray-200 rounded w-5/6" })] })] }) }) })] }) }) }));
// Create a wrapper component that converts requiredPermission to permission
const PermissionWrapper = ({ requiredPermission, children }) => {
    return (_jsx(PermissionGuard, { permission: requiredPermission, children: children }));
};
export const RAGDashboardRoutes = () => {
    return [
        _jsxs(Route, { path: "/dashboard/rag", children: [_jsx(Route, { index: true, element: _jsx(PermissionWrapper, { requiredPermission: "modules.rag", children: _jsx(RAGDashboardPage, {}) }) }), _jsx(Route, { path: "analytics", element: _jsx(PermissionWrapper, { requiredPermission: "modules.rag", children: _jsx(RAGAnalytics, {}) }) }), _jsx(Route, { path: "alerts", element: _jsx(PermissionWrapper, { requiredPermission: "modules.rag", children: _jsx(Suspense, { fallback: _jsx(LoadingFallback, {}), children: _jsx(RAGAlerts, {}) }) }) }), _jsx(Route, { path: "settings", element: _jsx(PermissionWrapper, { requiredPermission: "modules.rag.admin", children: _jsx(Suspense, { fallback: _jsx(LoadingFallback, {}), children: _jsx(RAGSettings, {}) }) }) })] }, "rag-dashboard-index")
    ];
};
