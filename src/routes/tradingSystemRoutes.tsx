
import { Route } from "react-router-dom";
import PermissionGuard from "@/components/PermissionGuard";
import { TradingSystemLayout } from "@/components/layout/TradingSystemLayout";

// Import Trading System pages
import TradingSystemDashboard from "@/pages/TradingSystemDashboard";
import TradingSystemSettings from "@/pages/TradingSystemSettings";

export const TradingSystemRoutes = () => {
  return (
    <>
      {/* Trading System Module Routes */}
      <Route path="/trading-system" element={
        <PermissionGuard requiredPermission="modules.trading">
          <TradingSystemLayout>
            <TradingSystemDashboard />
          </TradingSystemLayout>
        </PermissionGuard>
      } />
      
      <Route path="/trading-system/settings" element={
        <PermissionGuard requiredPermission="modules.trading">
          <TradingSystemLayout>
            <TradingSystemSettings />
          </TradingSystemLayout>
        </PermissionGuard>
      } />
    </>
  );
};
