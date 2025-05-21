import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Route } from "react-router-dom";
import { PlatformLayout } from '@/components/layouts/PlatformLayout';
import RequestsPage from "@/pages/auto/RequestsPage";
import { FileInput, Plus, ClipboardList, Clock, Settings } from 'lucide-react';
export const RequestsNavCategories = [
    {
        name: "Requests",
        label: "Submit Requests",
        items: [
            { label: "Dashboard", path: "/requests", icon: FileInput },
            { label: "New Request", path: "/requests/new", icon: Plus },
            { label: "My Requests", path: "/requests/my-requests", icon: ClipboardList },
            { label: "Pending Requests", path: "/requests/pending", icon: Clock },
            { label: "Settings", path: "/requests/settings", icon: Settings }
        ]
    }
];
export const RequestsRoutes = () => {
    return [
        _jsxs(Route, { path: "/requests", children: [_jsx(Route, { index: true, element: _jsx(PlatformLayout, { moduleTitle: "Requests Dashboard", navCategories: RequestsNavCategories, children: _jsx(RequestsPage, {}) }) }), _jsx(Route, { path: "new", element: _jsx(PlatformLayout, { moduleTitle: "New Request", navCategories: RequestsNavCategories, children: _jsx(RequestsPage, {}) }) }), _jsx(Route, { path: "my-requests", element: _jsx(PlatformLayout, { moduleTitle: "My Requests", navCategories: RequestsNavCategories, children: _jsx(RequestsPage, {}) }) }), _jsx(Route, { path: "pending", element: _jsx(PlatformLayout, { moduleTitle: "Pending Requests", navCategories: RequestsNavCategories, children: _jsx(RequestsPage, {}) }) }), _jsx(Route, { path: "settings", element: _jsx(PlatformLayout, { moduleTitle: "Request Settings", navCategories: RequestsNavCategories, children: _jsx(RequestsPage, {}) }) })] }, "requests-index")
    ];
};
