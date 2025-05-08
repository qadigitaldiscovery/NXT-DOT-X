
import { Route } from "react-router-dom";
import PermissionGuard from "@/components/PermissionGuard";
import UserManagement from "@/pages/UserManagement";
import DocumentationPage from "@/pages/admin/DocumentationPage";

export const AdminRoutes = () => {
  return (
    <>
      <Route path="/admin/users" element={
        <PermissionGuard requiredPermission="users.view">
          <UserManagement />
        </PermissionGuard>
      } />
      <Route path="/admin/documentation" element={
        <PermissionGuard requiredPermission="settings.access">
          <DocumentationPage />
        </PermissionGuard>
      } />
    </>
  );
};
