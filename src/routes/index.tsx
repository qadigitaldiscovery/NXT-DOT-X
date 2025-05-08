
import { Routes, Route, Navigate } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import Landing from "@/pages/Landing";
import RootHandler from '@/components/RootHandler';
import Unauthorized from "@/pages/Unauthorized";

// Import module-specific routes
import { AdminRoutes } from "./adminRoutes";
import { DataManagementRoutes } from "./dataManagementRoutes";
import { LoyaltyRoutes } from "./loyaltyRoutes";
import { TradingSystemRoutes } from "./tradingSystemRoutes";
import { TechHubRoutes } from "./techHubRoutes";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Landing Page (Login) */}
      <Route index element={<RootHandler />} />
      <Route path="/landing" element={<Landing />} />
      
      {/* Unauthorized Page */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      
      {/* Legacy route redirects */}
      <Route path="/prototypes" element={<Navigate to="/" replace />} />
      
      {/* Module-specific Routes */}
      {AdminRoutes()}
      {DataManagementRoutes()}
      {LoyaltyRoutes()}
      {TradingSystemRoutes()}
      {TechHubRoutes()}
      
      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
