import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Route } from "react-router-dom";
import { PlatformLayout } from '@/components/layouts/PlatformLayout';
import WorkflowsPage from "@/pages/auto/WorkflowsPage";
import { GitCompareArrows, List, Plus, History, Settings } from 'lucide-react';
export const WorkflowsNavCategories = [
    {
        name: "Workflows",
        label: "Workflows",
        items: [
            { label: "Dashboard", path: "/workflows", icon: GitCompareArrows },
            { label: "All Workflows", path: "/workflows/list", icon: List },
            { label: "Create Workflow", path: "/workflows/new", icon: Plus },
            { label: "History", path: "/workflows/history", icon: History },
            { label: "Settings", path: "/workflows/settings", icon: Settings }
        ]
    }
];
export const WorkflowsRoutes = () => {
    return [
        _jsxs(Route, { path: "/workflows", children: [_jsx(Route, { index: true, element: _jsx(PlatformLayout, { moduleTitle: "Workflows", navCategories: WorkflowsNavCategories, children: _jsx(WorkflowsPage, {}) }) }), _jsx(Route, { path: "list", element: _jsx(PlatformLayout, { moduleTitle: "All Workflows", navCategories: WorkflowsNavCategories, children: _jsx(WorkflowsPage, {}) }) }), _jsx(Route, { path: "new", element: _jsx(PlatformLayout, { moduleTitle: "Create Workflow", navCategories: WorkflowsNavCategories, children: _jsx(WorkflowsPage, {}) }) }), _jsx(Route, { path: "history", element: _jsx(PlatformLayout, { moduleTitle: "Workflow History", navCategories: WorkflowsNavCategories, children: _jsx(WorkflowsPage, {}) }) }), _jsx(Route, { path: "settings", element: _jsx(PlatformLayout, { moduleTitle: "Workflow Settings", navCategories: WorkflowsNavCategories, children: _jsx(WorkflowsPage, {}) }) })] }, "workflows-index")
    ];
};
