
import { Route } from "react-router-dom";
import RAGDashboardPage from "@/pages/rag-dashboard/RAGDashboardPage";
import RAGAnalytics from "@/pages/RAGAnalytics";
import PermissionGuard from "@/components/PermissionGuard";
import { PlatformLayout } from '@/components/layouts/PlatformLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { Suspense } from "react";

// Lazy-loaded components for better performance
const RAGSettings = React.lazy(() => import("@/pages/auto/RAGSettings"));
const RAGAlerts = React.lazy(() => import("@/pages/auto/RAGAlerts"));

// Loading fallback component
const LoadingFallback = () => (
  <PlatformLayout>
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
    <Route path="/dashboard/rag">
      <Route index element={
        <PermissionGuard requiredPermission="modules.rag">
          <RAGDashboardPage />
        </PermissionGuard>
      } />
      <Route path="analytics" element={
        <PermissionGuard requiredPermission="modules.rag">
          <RAGAnalytics />
        </PermissionGuard>
      } />
      <Route path="alerts" element={
        <PermissionGuard requiredPermission="modules.rag">
          <Suspense fallback={<LoadingFallback />}>
            <RAGAlerts />
          </Suspense>
        </PermissionGuard>
      } />
      <Route path="settings" element={
        <PermissionGuard requiredPermission="modules.rag.admin">
          <Suspense fallback={<LoadingFallback />}>
            <RAGSettings />
          </Suspense>
        </PermissionGuard>
      } />
    </Route>
  );
};
