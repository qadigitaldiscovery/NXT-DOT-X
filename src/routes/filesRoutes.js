import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Route } from "react-router-dom";
import { PlatformLayout } from '@/components/layouts/PlatformLayout';
import FilesPage from "@/pages/auto/FilesPage";
import { Files, Upload, Search, History, Settings } from 'lucide-react';
export const FilesNavCategories = [
    {
        name: "Files",
        label: "Files",
        items: [
            { label: "Dashboard", path: "/files", icon: Files },
            { label: "Upload", path: "/files/upload", icon: Upload },
            { label: "Search", path: "/files/search", icon: Search },
            { label: "History", path: "/files/history", icon: History },
            { label: "Settings", path: "/files/settings", icon: Settings }
        ]
    }
];
export const FilesRoutes = () => {
    return [
        _jsxs(Route, { path: "/files", children: [_jsx(Route, { index: true, element: _jsx(PlatformLayout, { moduleTitle: "Files", navCategories: FilesNavCategories, children: _jsx(FilesPage, {}) }) }), _jsx(Route, { path: "upload", element: _jsx(PlatformLayout, { moduleTitle: "Upload Files", navCategories: FilesNavCategories, children: _jsx(FilesPage, {}) }) }), _jsx(Route, { path: "search", element: _jsx(PlatformLayout, { moduleTitle: "Search Files", navCategories: FilesNavCategories, children: _jsx(FilesPage, {}) }) }), _jsx(Route, { path: "history", element: _jsx(PlatformLayout, { moduleTitle: "File History", navCategories: FilesNavCategories, children: _jsx(FilesPage, {}) }) }), _jsx(Route, { path: "settings", element: _jsx(PlatformLayout, { moduleTitle: "File Settings", navCategories: FilesNavCategories, children: _jsx(FilesPage, {}) }) })] }, "files-index")
    ];
};
