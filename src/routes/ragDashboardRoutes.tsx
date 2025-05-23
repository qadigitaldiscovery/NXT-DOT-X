import { Routes, Route } from "react-router-dom";
import RAGDashboardPage from "../pages/rag-dashboard/RAGDashboardPage";
import RAGAnalytics from "../pages/RAGAnalytics";
import PermissionGuard from "../components/PermissionGuard";
import { PlatformLayout } from "../components/layouts/PlatformLayout";
import React, { Suspense } from "react";
import { ragDashboardNavigation } from "../components/rag-dashboard/config/dashboardNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Permission } from "../utils/rbac/permissions";

// Lazy-loaded components for better performance
const RAGSettings = React.lazy(() => import("../pages/auto/RAGSettings"));
const RAGAlerts = React.lazy(() => import("../pages/auto/RAGAlerts"));

// Loading fallback component
const LoadingFallback = () => (
  <PlatformLayout moduleTitle="Loading..." useGlobalNavigation={false}>
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

export const RAGDashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={
          <PermissionGuard requiredPermissions={[Permission.RAG_VIEW]}>
            <RAGDashboardPage />
          </PermissionGuard>
        } />
        <Route path="analytics" element={
          <PermissionGuard requiredPermissions={[Permission.RAG_VIEW]}>
            <RAGAnalytics />
          </PermissionGuard>
        } />
        <Route path="alerts" element={
          <PermissionGuard requiredPermissions={[Permission.RAG_VIEW]}>
            <Suspense fallback={<LoadingFallback />}>
              <RAGAlerts />
            </Suspense>
          </PermissionGuard>
        } />
        <Route path="settings" element={
          <PermissionGuard requiredPermissions={[Permission.RAG_MANAGE]}>
            <Suspense fallback={<LoadingFallback />}>
              <RAGSettings />
            </Suspense>
          </PermissionGuard>
        } />
      </Route>
    </Routes>
  );
};
