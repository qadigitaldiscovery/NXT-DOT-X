
import { Route } from "react-router-dom";
import { TradingSystemLayout } from "@/components/layout/TradingSystemLayout";
import TradingSystemDashboard from "@/pages/TradingSystemDashboard";
import TradingSystemSettings from "@/pages/TradingSystemSettings";
import ProtectedRoute from "@/components/ProtectedRoute";

export const TradingSystemRoutes = () => {
  return (
    <Route path="/trading-system" element={
      <ProtectedRoute>
        <TradingSystemLayout />
      </ProtectedRoute>
    }>
      <Route index element={<TradingSystemDashboard />} />
      <Route path="settings" element={<TradingSystemSettings />} />
    </Route>
  );
};
