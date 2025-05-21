import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Route } from "react-router-dom";
import { PlatformLayout } from '@/components/layouts/PlatformLayout';
import ContractsPage from "@/pages/auto/ContractsPage";
import { FileText, ClipboardCheck, Calendar, AlertCircle, Plus } from 'lucide-react';
export const ContractsNavCategories = [
    {
        name: "Contracts",
        label: "Contracts",
        items: [
            { label: "Dashboard", path: "/contracts", icon: FileText },
            { label: "All Contracts", path: "/contracts/list", icon: ClipboardCheck },
            { label: "Create Contract", path: "/contracts/new", icon: Plus },
            { label: "Calendar View", path: "/contracts/calendar", icon: Calendar },
            { label: "Expiring Soon", path: "/contracts/expiring", icon: AlertCircle }
        ]
    }
];
export const ContractsRoutes = () => {
    return [
        _jsxs(Route, { path: "/contracts", children: [_jsx(Route, { index: true, element: _jsx(PlatformLayout, { moduleTitle: "Contracts Dashboard", navCategories: ContractsNavCategories, children: _jsx(ContractsPage, {}) }) }), _jsx(Route, { path: "list", element: _jsx(PlatformLayout, { moduleTitle: "All Contracts", navCategories: ContractsNavCategories, children: _jsx(ContractsPage, {}) }) }), _jsx(Route, { path: "new", element: _jsx(PlatformLayout, { moduleTitle: "Create New Contract", navCategories: ContractsNavCategories, children: _jsx(ContractsPage, {}) }) }), _jsx(Route, { path: "calendar", element: _jsx(PlatformLayout, { moduleTitle: "Contracts Calendar", navCategories: ContractsNavCategories, children: _jsx(ContractsPage, {}) }) }), _jsx(Route, { path: "expiring", element: _jsx(PlatformLayout, { moduleTitle: "Expiring Contracts", navCategories: ContractsNavCategories, children: _jsx(ContractsPage, {}) }) })] }, "contracts-index")
    ];
};
