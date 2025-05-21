import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate } from "react-router-dom";
import PermissionGuard from "../components/PermissionGuard";
import UserManagement from "../pages/admin/UserManagement";
import DocumentationPage from "../pages/admin/DocumentationPage";
import DatabaseAdminPage from "../pages/admin/DatabaseAdminPage";
import AdminModuleAccess from "../pages/admin/AdminModuleAccess";
export const AdminRoutes = [
    {
        path: "admin",
        children: [
            {
                path: "module-access",
                element: (_jsx(PermissionGuard, { requiredRole: "admin", moduleSlug: "admin/module-access", children: _jsx(AdminModuleAccess, {}) })),
            },
            {
                path: "users",
                element: (_jsx(PermissionGuard, { requiredRole: "admin", moduleSlug: "admin/users", children: _jsx(UserManagement, {}) })),
            },
            {
                path: "customers",
                element: _jsx(Navigate, { to: "/customer-management/directory", replace: true }),
            },
            {
                path: "documentation",
                element: (_jsx(PermissionGuard, { requiredRole: "admin", moduleSlug: "admin/documentation", children: _jsx(DocumentationPage, {}) })),
            },
            {
                path: "database",
                element: (_jsx(PermissionGuard, { requiredRole: "admin", moduleSlug: "admin/database", children: _jsx(DatabaseAdminPage, {}) })),
            },
            {
                path: "system-settings",
                element: (_jsx(PermissionGuard, { requiredRole: "admin", moduleSlug: "admin/system-settings", children: _jsx(DocumentationPage, {}) })),
            },
            {
                path: "roles",
                element: (_jsx(PermissionGuard, { requiredRole: "admin", moduleSlug: "admin/roles", children: _jsx(DocumentationPage, {}) })),
            },
            {
                path: "security",
                element: (_jsx(PermissionGuard, { requiredRole: "admin", moduleSlug: "admin/security", children: _jsx(DocumentationPage, {}) })),
            },
            {
                path: "reporting",
                element: (_jsx(PermissionGuard, { requiredRole: "admin", moduleSlug: "admin/reporting", children: _jsx(DocumentationPage, {}) })),
            },
            {
                path: "localization",
                element: (_jsx(PermissionGuard, { requiredRole: "admin", moduleSlug: "admin/localization", children: _jsx(DocumentationPage, {}) })),
            },
        ],
    },
];
