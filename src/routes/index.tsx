
import { Routes, Route, Navigate } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import Landing from "@/pages/Landing";
import RootHandler from '@/components/RootHandler';
import Unauthorized from "@/pages/Unauthorized";
import MasterDash from '@/pages/MasterDash';

// Import module-specific routes
import { AdminRoutes } from "./adminRoutes";
import { DataManagementRoutes } from "./dataManagementRoutes";
import { LoyaltyRoutes } from "./loyaltyRoutes";
import { TradingSystemRoutes } from "./tradingSystemRoutes";
import { TechHubRoutes } from "./techHubRoutes";
import { DotXRoutes } from "./dotXRoutes";
import { SupplierManagementRoutes } from "./supplierManagementRoutes";
import { CustomerManagementRoutes } from "./customerManagementRoutes";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Landing Page (Login) */}
      <Route index element={<MasterDash />} />
      <Route path="/landing" element={<Landing />} />
      
      {/* Unauthorized Page */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      
      {/* Legacy route redirects */}
      <Route path="/prototypes" element={<Navigate to="/" replace />} />
      <Route path="/supplier-settings" element={<Navigate to="/supplier-management/settings" replace />} />
      
      {/* Module-specific Routes */}
      {AdminRoutes()}
      {DataManagementRoutes()}
      {LoyaltyRoutes()}
      {TradingSystemRoutes()}
      {TechHubRoutes()}
      {DotXRoutes()}
      {SupplierManagementRoutes()}
      {CustomerManagementRoutes()}
      
      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
