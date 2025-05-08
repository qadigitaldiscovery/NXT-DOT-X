
import { Route } from "react-router-dom";
import PermissionGuard from "@/components/PermissionGuard";
import UserManagement from "@/pages/UserManagement";

export const AdminRoutes = () => {
  return (
    <>
      <Route path="/admin/users" element={
        <PermissionGuard requiredPermission="users.view">
          <UserManagement />
        </PermissionGuard>
      } />
    </>
  );
};
