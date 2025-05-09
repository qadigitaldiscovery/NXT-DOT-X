
import { Route } from "react-router-dom";
import { TradingSystemLayout } from "@/components/layout/TradingSystemLayout";
import TradingSystemDashboard from "@/pages/TradingSystemDashboard";
import TradingSystemSettings from "@/pages/TradingSystemSettings";
import SupplierCosting from "@/pages/data-management/cost-management/SupplierCosting";

export const TradingSystemRoutes = () => {
  return (
    <Route path="/trading-system" element={<TradingSystemLayout />}>
      <Route index element={<TradingSystemDashboard />} />
      <Route path="settings" element={<TradingSystemSettings />} />
    </Route>
  );
};

// Add a direct route for supplier costing
export const CostManagementRoutes = () => {
  return (
    <>
      <Route path="/supplier-costing" element={<SupplierCosting />} />
      <Route path="/cost-analysis" element={<SupplierCosting />} />
    </>
  );
};
