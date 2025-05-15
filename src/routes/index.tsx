
import { Routes, Route, Navigate } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import Landing from "@/pages/Landing";
import RootHandler from '@/components/RootHandler';
import Unauthorized from "@/pages/Unauthorized";
import MasterDash from '@/pages/MasterDash';
import SharedDocumentPage from '@/pages/SharedDocumentPage';

// Import vendor pages
import VendorDetail from '@/pages/vendors/VendorDetail';
import VendorsPage from '@/pages/vendors/VendorsPage';
import NewVendorPage from '@/pages/vendors/NewVendorPage';
import { VendorLayout } from '@/components/layout/VendorLayout';

// Import module-specific routes
import { AdminRoutes } from "./adminRoutes";
import { DataManagementRoutes } from "./dataManagementRoutes";
import { LoyaltyRoutes } from "./loyaltyRoutes";
import { TradingSystemRoutes } from "./tradingSystemRoutes";
import { TechHubRoutes } from "./techHubRoutes";
import { DotXRoutes } from "./dotXRoutes";
import { SupplierManagementRoutes } from "./supplierManagementRoutes";
import { CustomerManagementRoutes } from "./customerManagementRoutes";
import { BrandMarketingRoutes } from "./brandMarketingRoutes";
import { SocialMediaRoutes } from "./socialMediaRoutes";
import { ProjectManagementRoutes } from "./projectManagementRoutes";
import { RAGDashboardRoutes } from "./ragDashboardRoutes";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Root/Index Route */}
      <Route index element={<RootHandler />} />
      
      {/* Landing Page (Login) */}
      <Route path="/landing" element={<Landing />} />
      
      {/* Unauthorized Page */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      
      {/* MasterDash Route */}
      <Route path="/master" element={<MasterDash />} />
      
      {/* Shared Document Route */}
      <Route path="/shared-document/:shareId" element={<SharedDocumentPage />} />
      
      {/* Healthcare Supplier Dashboard Routes */}
      <Route path="/vendors" element={<VendorLayout />}>
        <Route index element={<VendorsPage />} />
        <Route path=":id" element={<VendorDetail />} />
        <Route path="new" element={<NewVendorPage />} />
      </Route>
      
      {/* Legacy route redirects */}
      <Route path="/prototypes" element={<Navigate to="/" replace />} />
      <Route path="/supplier-settings" element={<Navigate to="/data-management/suppliers" replace />} />
      <Route path="/supplier-costing" element={<Navigate to="/data-management/supplier-costing" replace />} />
      <Route path="/cost-analysis" element={<Navigate to="/data-management/cost-analysis" replace />} />
      
      {/* Module-specific Routes */}
      {AdminRoutes()}
      {DataManagementRoutes()}
      {LoyaltyRoutes()}
      {TradingSystemRoutes()}
      {TechHubRoutes()}
      {DotXRoutes()}
      {SupplierManagementRoutes()}
      {CustomerManagementRoutes()}
      {BrandMarketingRoutes()}
      {SocialMediaRoutes()}
      {ProjectManagementRoutes()}
      {RAGDashboardRoutes()}
      
      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
