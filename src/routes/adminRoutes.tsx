
import React from "react";
import { Route, Navigate } from "react-router-dom";
import PermissionGuard from "@/components/admin/PermissionGuard";
import UserManagement from "@/pages/UserManagement";
import DocumentationPage from "@/pages/admin/DocumentationPage";
import DatabaseAdminPage from "@/pages/admin/DatabaseAdminPage";
import AdminModuleAccess from "@/pages/admin/AdminModuleAccess";
import Unauthorized from "@/pages/Unauthorized";

export const AdminRoutes = () => [
  <Route key="unauthorized" path="/unauthorized" element={<Unauthorized />} />,
  
  <Route 
    key="admin-module-access"
    path="/admin/module-access" 
    element={
      <PermissionGuard requiredRole="admin">
        <AdminModuleAccess />
      </PermissionGuard>
    } 
  />,
  
  <Route 
    key="admin-users"
    path="/admin/users" 
    element={
      <PermissionGuard requiredRole="admin" moduleSlug="admin/users">
        <UserManagement />
      </PermissionGuard>
    } 
  />,
  
  <Route 
    key="admin-customers"
    path="/admin/customers" 
    element={
      <Navigate to="/data-management/customers" replace />
    } 
  />,
  
  <Route 
    key="admin-documentation"
    path="/admin/documentation" 
    element={
      <PermissionGuard requiredRole="admin" moduleSlug="admin/documentation">
        <DocumentationPage />
      </PermissionGuard>
    } 
  />,
  
  <Route 
    key="admin-database"
    path="/admin/database" 
    element={
      <PermissionGuard requiredRole="admin" moduleSlug="admin/database">
        <DatabaseAdminPage />
      </PermissionGuard>
    } 
  />,
  
  <Route 
    key="admin-system-settings"
    path="/admin/system-settings" 
    element={
      <PermissionGuard requiredRole="admin" moduleSlug="admin/system-settings">
        <DocumentationPage />
      </PermissionGuard>
    } 
  />,
  
  <Route 
    key="admin-roles"
    path="/admin/roles" 
    element={
      <PermissionGuard requiredRole="admin" moduleSlug="admin/roles">
        <DocumentationPage />
      </PermissionGuard>
    } 
  />,
  
  <Route 
    key="admin-security"
    path="/admin/security" 
    element={
      <PermissionGuard requiredRole="admin" moduleSlug="admin/security">
        <DocumentationPage />
      </PermissionGuard>
    } 
  />,
  
  <Route 
    key="admin-reporting"
    path="/admin/reporting" 
    element={
      <PermissionGuard requiredRole="admin" moduleSlug="admin/reporting">
        <DocumentationPage />
      </PermissionGuard>
    } 
  />,
  
  <Route 
    key="admin-localization"
    path="/admin/localization" 
    element={
      <PermissionGuard requiredRole="admin" moduleSlug="admin/localization">
        <DocumentationPage />
      </PermissionGuard>
    } 
  />
];
