import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Route } from "react-router-dom";
import { PlatformLayout } from '@/components/layouts/PlatformLayout';
import EntitiesPage from "@/pages/auto/EntitiesPage";
import { Building, Users, FileText, Map, Settings, ListOrdered } from 'lucide-react';
import ProtectedRoute from "@/components/ProtectedRoute";
export const EntitiesNavCategories = [
    {
        name: "Entities",
        label: "Entities",
        items: [
            { label: "Dashboard", path: "/entities", icon: Building },
            { label: "Directory", path: "/entities/list", icon: ListOrdered },
            { label: "Personnel", path: "/entities/personnel", icon: Users },
            { label: "Documents", path: "/entities/documents", icon: FileText },
            { label: "Locations", path: "/entities/locations", icon: Map },
            { label: "Settings", path: "/entities/settings", icon: Settings }
        ]
    }
];
export const EntitiesRoutes = () => {
    return [
        _jsxs(Route, { path: "/entities", children: [_jsx(Route, { index: true, element: _jsx(ProtectedRoute, { children: _jsx(PlatformLayout, { moduleTitle: "Entities", navCategories: EntitiesNavCategories, children: _jsx(EntitiesPage, {}) }) }) }), _jsx(Route, { path: "list", element: _jsx(ProtectedRoute, { children: _jsx(PlatformLayout, { moduleTitle: "Entities Directory", navCategories: EntitiesNavCategories, children: _jsx(EntitiesPage, {}) }) }) }), _jsx(Route, { path: "personnel", element: _jsx(ProtectedRoute, { children: _jsx(PlatformLayout, { moduleTitle: "Entity Personnel", navCategories: EntitiesNavCategories, children: _jsx(EntitiesPage, {}) }) }) }), _jsx(Route, { path: "documents", element: _jsx(ProtectedRoute, { children: _jsx(PlatformLayout, { moduleTitle: "Entity Documents", navCategories: EntitiesNavCategories, children: _jsx(EntitiesPage, {}) }) }) }), _jsx(Route, { path: "locations", element: _jsx(ProtectedRoute, { children: _jsx(PlatformLayout, { moduleTitle: "Entity Locations", navCategories: EntitiesNavCategories, children: _jsx(EntitiesPage, {}) }) }) }), _jsx(Route, { path: "settings", element: _jsx(ProtectedRoute, { children: _jsx(PlatformLayout, { moduleTitle: "Entity Settings", navCategories: EntitiesNavCategories, children: _jsx(EntitiesPage, {}) }) }) })] }, "entities-index")
    ];
};
