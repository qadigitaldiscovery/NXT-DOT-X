
import { Route } from "react-router-dom";
import PermissionGuard from "@/components/PermissionGuard";
import UserManagement from "@/pages/UserManagement";
import DocumentationPage from "@/pages/admin/DocumentationPage";
import DatabaseAdminPage from "@/pages/admin/DatabaseAdminPage";
import CustomerManagement from "@/pages/UserManagement"; // Reusing UserManagement temporarily for customers

export const AdminRoutes = () => {
  return (
    <>
      <Route path="/admin/users" element={
        <PermissionGuard requiredPermission="users.view">
          <UserManagement />
        </PermissionGuard>
      } />
      <Route path="/admin/customers" element={
        <PermissionGuard requiredPermission="users.view">
          <CustomerManagement />
        </PermissionGuard>
      } />
      <Route path="/admin/documentation" element={
        <PermissionGuard requiredPermission="settings.access">
          <DocumentationPage />
        </PermissionGuard>
      } />
      <Route path="/admin/database" element={
        <PermissionGuard requiredPermission="settings.access">
          <DatabaseAdminPage />
        </PermissionGuard>
      } />
      <Route path="/admin/system-settings" element={
        <PermissionGuard requiredPermission="settings.access">
          <DocumentationPage />
        </PermissionGuard>
      } />
      <Route path="/admin/roles" element={
        <PermissionGuard requiredPermission="settings.access">
          <DocumentationPage />
        </PermissionGuard>
      } />
      <Route path="/admin/security" element={
        <PermissionGuard requiredPermission="settings.access">
          <DocumentationPage />
        </PermissionGuard>
      } />
      <Route path="/admin/reporting" element={
        <PermissionGuard requiredPermission="settings.access">
          <DocumentationPage />
        </PermissionGuard>
      } />
      <Route path="/admin/localization" element={
        <PermissionGuard requiredPermission="settings.access">
          <DocumentationPage />
        </PermissionGuard>
      } />
    </>
  );
};
