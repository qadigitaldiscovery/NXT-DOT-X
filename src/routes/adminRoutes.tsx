import React from "react";
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
        element: (
          <PermissionGuard requiredRole="admin" moduleSlug="admin/module-access">
            <AdminModuleAccess />
          </PermissionGuard>
        ),
      },
      {
        path: "users",
        element: (
          <PermissionGuard requiredRole="admin" moduleSlug="admin/users">
            <UserManagement />
          </PermissionGuard>
        ),
      },
      {
        path: "customers",
        element: <Navigate to="/customer-management/directory" replace />,
      },
      {
        path: "documentation",
        element: (
          <PermissionGuard requiredRole="admin" moduleSlug="admin/documentation">
            <DocumentationPage />
          </PermissionGuard>
        ),
      },
      {
        path: "database",
        element: (
          <PermissionGuard requiredRole="admin" moduleSlug="admin/database">
            <DatabaseAdminPage />
          </PermissionGuard>
        ),
      },
      {
        path: "system-settings",
        element: (
          <PermissionGuard requiredRole="admin" moduleSlug="admin/system-settings">
            <DocumentationPage />
          </PermissionGuard>
        ),
      },
      {
        path: "roles",
        element: (
          <PermissionGuard requiredRole="admin" moduleSlug="admin/roles">
            <DocumentationPage />
          </PermissionGuard>
        ),
      },
      {
        path: "security",
        element: (
          <PermissionGuard requiredRole="admin" moduleSlug="admin/security">
            <DocumentationPage />
          </PermissionGuard>
        ),
      },
      {
        path: "reporting",
        element: (
          <PermissionGuard requiredRole="admin" moduleSlug="admin/reporting">
            <DocumentationPage />
          </PermissionGuard>
        ),
      },
      {
        path: "localization",
        element: (
          <PermissionGuard requiredRole="admin" moduleSlug="admin/localization">
            <DocumentationPage />
          </PermissionGuard>
        ),
      },
    ],
  },
];
