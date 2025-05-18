
import React from "react";
import { Route, Navigate } from "react-router-dom";
import PermissionGuard from "@/components/admin/PermissionGuard";
import UserManagement from "@/pages/UserManagement";
import DocumentationPage from "@/pages/admin/DocumentationPage";
import DatabaseAdminPage from "@/pages/admin/DatabaseAdminPage";
import AdminModuleAccess from "@/pages/admin/AdminModuleAccess";
import Unauthorized from "@/pages/Unauthorized";

export const AdminRoutes = () => {
  // Return a fragment containing the routes
  return (
    <>
      <Route path="/unauthorized" element={<Unauthorized />} />
      
      <Route path="/admin/module-access" element={
        <PermissionGuard requiredRole="admin">
          <AdminModuleAccess />
        </PermissionGuard>
      } />
      
      <Route path="/admin/users" element={
        <PermissionGuard requiredRole="admin" moduleSlug="admin/users">
          <UserManagement />
        </PermissionGuard>
      } />
      
      <Route path="/admin/customers" element={
        <Navigate to="/data-management/customers" replace />
      } />
      
      <Route path="/admin/documentation" element={
        <PermissionGuard requiredRole="admin" moduleSlug="admin/documentation">
          <DocumentationPage />
        </PermissionGuard>
      } />
      
      <Route path="/admin/database" element={
        <PermissionGuard requiredRole="admin" moduleSlug="admin/database">
          <DatabaseAdminPage />
        </PermissionGuard>
      } />
      
      <Route path="/admin/system-settings" element={
        <PermissionGuard requiredRole="admin" moduleSlug="admin/system-settings">
          <DocumentationPage />
        </PermissionGuard>
      } />
      
      <Route path="/admin/roles" element={
        <PermissionGuard requiredRole="admin" moduleSlug="admin/roles">
          <DocumentationPage />
        </PermissionGuard>
      } />
      
      <Route path="/admin/security" element={
        <PermissionGuard requiredRole="admin" moduleSlug="admin/security">
          <DocumentationPage />
        </PermissionGuard>
      } />
      
      <Route path="/admin/reporting" element={
        <PermissionGuard requiredRole="admin" moduleSlug="admin/reporting">
          <DocumentationPage />
        </PermissionGuard>
      } />
      
      <Route path="/admin/localization" element={
        <PermissionGuard requiredRole="admin" moduleSlug="admin/localization">
          <DocumentationPage />
        </PermissionGuard>
      } />
    </>
  );
};
