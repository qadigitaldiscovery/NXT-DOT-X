import React from "react";
import { Route, Navigate } from "react-router-dom";
import PermissionGuard from "../components/PermissionGuard";
import UserManagement from "../pages/admin/UserManagement";
import DocumentationPage from "../pages/admin/DocumentationPage";
import DatabaseAdminPage from "../pages/admin/DatabaseAdminPage";
import AdminModuleAccess from "../pages/admin/AdminModuleAccess";

export const AdminRoutes = () => [
  <Route key="admin" path="admin">
    <Route 
      key="admin-module-access"
      path="module-access" 
      element={
        <PermissionGuard 
          requiredRole="admin"
          moduleSlug="admin/module-access"
        >
          <AdminModuleAccess />
        </PermissionGuard>
      } 
    />
    
    <Route 
      key="admin-users"
      path="users" 
      element={
        <PermissionGuard 
          requiredRole="admin"
          moduleSlug="admin/users"
        >
          <UserManagement />
        </PermissionGuard>
      } 
    />
    
    <Route 
      key="admin-customers"
      path="customers" 
      element={
        <Navigate to="/customer-management/directory" replace />
      } 
    />
    
    <Route 
      key="admin-documentation"
      path="documentation" 
      element={
        <PermissionGuard 
          requiredRole="admin"
          moduleSlug="admin/documentation"
        >
          <DocumentationPage />
        </PermissionGuard>
      } 
    />
    
    <Route 
      key="admin-database"
      path="database" 
      element={
        <PermissionGuard 
          requiredRole="admin"
          moduleSlug="admin/database"
        >
          <DatabaseAdminPage />
        </PermissionGuard>
      } 
    />
    
    <Route 
      key="admin-system-settings"
      path="system-settings" 
      element={
        <PermissionGuard 
          requiredRole="admin"
          moduleSlug="admin/system-settings"
        >
          <DocumentationPage />
        </PermissionGuard>
      } 
    />
    
    <Route 
      key="admin-roles"
      path="roles" 
      element={
        <PermissionGuard 
          requiredRole="admin"
          moduleSlug="admin/roles"
        >
          <DocumentationPage />
        </PermissionGuard>
      } 
    />
    
    <Route 
      key="admin-security"
      path="security" 
      element={
        <PermissionGuard 
          requiredRole="admin"
          moduleSlug="admin/security"
        >
          <DocumentationPage />
        </PermissionGuard>
      } 
    />
    
    <Route 
      key="admin-reporting"
      path="reporting" 
      element={
        <PermissionGuard 
          requiredRole="admin"
          moduleSlug="admin/reporting"
        >
          <DocumentationPage />
        </PermissionGuard>
      } 
    />
    
    <Route 
      key="admin-localization"
      path="localization" 
      element={
        <PermissionGuard 
          requiredRole="admin"
          moduleSlug="admin/localization"
        >
          <DocumentationPage />
        </PermissionGuard>
      } 
    />
  </Route>
];
