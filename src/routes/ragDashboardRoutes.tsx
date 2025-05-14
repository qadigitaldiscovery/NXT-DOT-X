
import React from 'react';
import { Route } from 'react-router-dom';
import RAGDashboardPage from '@/pages/rag-dashboard/RAGDashboardPage';
import { RAGAnalytics } from '@/pages/RAGAnalytics';
import PermissionGuard from '@/components/admin/PermissionGuard';

export const RAGDashboardRoutes = () => {
  return (
    <>
      <Route 
        path="/dashboard/rag" 
        element={
          <PermissionGuard moduleSlug="modules">
            <RAGDashboardPage />
          </PermissionGuard>
        } 
      />
      <Route 
        path="/dashboard/rag/analytics" 
        element={
          <PermissionGuard moduleSlug="modules">
            <RAGAnalytics />
          </PermissionGuard>
        } 
      />
      <Route 
        path="/dashboard/rag/alerts" 
        element={
          <PermissionGuard moduleSlug="modules">
            <RAGDashboardPage />
          </PermissionGuard>
        } 
      />
      <Route 
        path="/dashboard/rag/settings" 
        element={
          <PermissionGuard moduleSlug="modules" requiredRole="admin">
            <RAGDashboardPage />
          </PermissionGuard>
        } 
      />
    </>
  );
};
