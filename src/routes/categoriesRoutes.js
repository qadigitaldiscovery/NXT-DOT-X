import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Route } from "react-router-dom";
import { PlatformLayout } from '@/components/layouts/PlatformLayout';
import CategoriesPage from "@/pages/auto/CategoriesPage";
import { FolderKanban, List, PieChart, Settings, Plus } from 'lucide-react';
export const CategoriesNavCategories = [
    {
        name: "Categories",
        label: "Categories",
        items: [
            { label: "Overview", path: "/categories", icon: FolderKanban },
            { label: "All Categories", path: "/categories/list", icon: List },
            { label: "Create Category", path: "/categories/new", icon: Plus },
            { label: "Analytics", path: "/categories/analytics", icon: PieChart },
            { label: "Settings", path: "/categories/settings", icon: Settings }
        ]
    }
];
export const CategoriesRoutes = () => {
    return [
        _jsxs(Route, { path: "/categories", children: [_jsx(Route, { index: true, element: _jsx(PlatformLayout, { moduleTitle: "Categories", navCategories: CategoriesNavCategories, children: _jsx(CategoriesPage, {}) }) }), _jsx(Route, { path: "list", element: _jsx(PlatformLayout, { moduleTitle: "All Categories", navCategories: CategoriesNavCategories, children: _jsx(CategoriesPage, {}) }) }), _jsx(Route, { path: "new", element: _jsx(PlatformLayout, { moduleTitle: "Create Category", navCategories: CategoriesNavCategories, children: _jsx(CategoriesPage, {}) }) }), _jsx(Route, { path: "analytics", element: _jsx(PlatformLayout, { moduleTitle: "Categories Analytics", navCategories: CategoriesNavCategories, children: _jsx(CategoriesPage, {}) }) }), _jsx(Route, { path: "settings", element: _jsx(PlatformLayout, { moduleTitle: "Categories Settings", navCategories: CategoriesNavCategories, children: _jsx(CategoriesPage, {}) }) })] }, "categories-index")
    ];
};
