
import { Route } from "react-router-dom";
import PermissionGuard from "@/components/PermissionGuard";
import { TradingSystemLayout } from "@/components/layout/TradingSystemLayout";

// Import Tech Hub pages
import TradingSystemDashboard from "@/pages/TradingSystemDashboard";
import TechHubApiManagement from "@/pages/APIsPage";

export const TechHubRoutes = () => {
  return (
    <>
      {/* Tech Hub API Management Routes */}
      <Route path="/tech-hub" element={
        <PermissionGuard requiredPermission="modules.trading">
          <TradingSystemLayout>
            <TradingSystemDashboard />
          </TradingSystemLayout>
        </PermissionGuard>
      } />
      
      <Route path="/tech-hub/api-management" element={
        <PermissionGuard requiredPermission="modules.trading">
          <TradingSystemLayout>
            <TechHubApiManagement />
          </TradingSystemLayout>
        </PermissionGuard>
      } />
    </>
  );
};
