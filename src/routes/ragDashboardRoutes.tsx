
import { Route } from "react-router-dom";
import RAGDashboard from "@/pages/RAGDashboard";
import RAGAnalytics from "@/pages/RAGAnalytics";
import PermissionGuard from "@/components/rag-dashboard/PermissionGuard";

export const RAGDashboardRoutes = () => {
  return (
    <>
      <Route path="/dashboard/rag" element={<RAGDashboard />} />
      <Route 
        path="/dashboard/rag/analytics" 
        element={
          <PermissionGuard requiredPermission="rag.view_analytics">
            <RAGAnalytics />
          </PermissionGuard>
        } 
      />
      <Route 
        path="/dashboard/rag/alerts"
        element={
          <PermissionGuard requiredPermission="rag.view_alerts">
            <div>Alerts Page</div>
          </PermissionGuard>
        }
      />
      <Route
        path="/dashboard/rag/settings"
        element={
          <PermissionGuard requiredPermission="rag.manage_settings">
            <div>Settings Page</div>
          </PermissionGuard>
        }
      />
    </>
  );
};
