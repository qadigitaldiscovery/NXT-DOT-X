import React, { Suspense } from "react";
import { Route } from "react-router-dom";
import RAGDashboardPage from "@/pages/rag-dashboard/RAGDashboardPage";
import RAGAnalytics from "@/pages/RAGAnalytics";
import PermissionGuard from "@/components/PermissionGuard";
import { PlatformLayout } from '@/components/layouts/PlatformLayout';
import { ragDashboardNavigation } from "@/components/rag-dashboard/config/dashboardNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Lazy-loaded components for better performance
const RAGSettings = React.lazy(() => import("@/pages/auto/RAGSettings"));
const RAGAlerts = React.lazy(() => import("@/pages/auto/RAGAlerts"));

// Loading fallback component
const LoadingFallback = () => (
  <PlatformLayout moduleTitle="Loading..." navCategories={ragDashboardNavigation}>
    <div className="container p-4">
      <Card>
        <CardHeader>
          <CardTitle>Loading...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </PlatformLayout>
);

// Create a wrapper component that converts requiredPermission to permission
const PermissionWrapper: React.FC<{ requiredPermission: string, children: React.ReactNode }> = ({ 
  requiredPermission, 
  children 
}) => {
  return (
    <PermissionGuard permission={requiredPermission}>
      {children}
    </PermissionGuard>
  );
};

export const RAGDashboardRoutes = () => {
  return [
    <Route key="rag-dashboard-index" path="/dashboard/rag">
      <Route index element={
        <PermissionWrapper requiredPermission="modules.rag">
          <RAGDashboardPage />
        </PermissionWrapper>
      } />
      <Route path="analytics" element={
        <PermissionWrapper requiredPermission="modules.rag">
          <RAGAnalytics />
        </PermissionWrapper>
      } />
      <Route path="alerts" element={
        <PermissionWrapper requiredPermission="modules.rag">
          <Suspense fallback={<LoadingFallback />}>
            <RAGAlerts />
          </Suspense>
        </PermissionWrapper>
      } />
      <Route path="settings" element={
        <PermissionWrapper requiredPermission="modules.rag.admin">
          <Suspense fallback={<LoadingFallback />}>
            <RAGSettings />
          </Suspense>
        </PermissionWrapper>
      } />
    </Route>
  ];
};
