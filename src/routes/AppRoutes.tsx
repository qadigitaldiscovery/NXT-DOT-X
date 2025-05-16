import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { PlatformLayout } from '@/components/layouts/PlatformLayout';
import { NavCategory, NavItem } from '@/components/layout/sidebar/types';

// Pages
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import Settings from '@/pages/Settings';
import Landing from '@/pages/Landing';
import RootHandler from '@/components/RootHandler';
import MasterDash from '@/pages/MasterDash';
import Unauthorized from '@/pages/Unauthorized';
import SharedDocumentPage from '@/pages/SharedDocumentPage';
import Dashboard from '@/pages/Dashboard';
import DashboardV2 from '@/pages/DashboardV2';

// Import module route configurations
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
import { VendorRoutes } from "./vendorRoutes";
import { ContractsRoutes } from "./contractsRoutes";
import { CategoriesRoutes } from "./categoriesRoutes";
import { EntitiesRoutes } from "./entitiesRoutes";
import { ScorecardsRoutes } from "./scorecardsRoutes";
import { WorkflowsRoutes } from "./workflowsRoutes";
import { AIExtractRoutes } from "./aiExtractRoutes";
import { FilesRoutes } from "./filesRoutes";
import { EventsRoutes } from "./eventsRoutes";
import { RiskRegisterRoutes } from "./riskRegisterRoutes";
import { RequestsRoutes } from "./requestsRoutes";
import { BetaRoutes } from "./betaRoutes";

// Import layout configuration
import { navCategories } from '@/components/layout/sidebar/NavigationConfig';
import { Home, Settings as SettingsIcon } from 'lucide-react';

export const AppRoutes = () => {
  // Define main navigation categories for standard page layout
  const mainNavCategories: NavCategory[] = [
    {
      name: "Main",
      label: "Main",
      items: [
        { label: "Dashboard", path: "/master", icon: Home },
        { label: "Settings", path: "/settings", icon: SettingsIcon }
      ]
    }
  ];

  return (
    <Router>
      <Routes>
        {/* Root/Index Route */}
        <Route index element={<RootHandler />} />
        <Route path="/" element={<Navigate to="/master" replace />} />
        
        {/* Settings page with PlatformLayout */}
        <Route 
          path="/settings" 
          element={
            <PlatformLayout 
              moduleTitle="Settings"
              navCategories={mainNavCategories}
            >
              <Settings />
            </PlatformLayout>
          } 
        />
        
        {/* Authentication Pages */}
        <Route path="/landing" element={<Landing />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        
        {/* Dashboard Pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard-v2" element={<DashboardV2 />} />
        <Route path="/master" element={<MasterDash />} />
        
        {/* Shared Document Route */}
        <Route path="/shared-document/:shareId" element={<SharedDocumentPage />} />
        
        {/* Module-specific Routes - imported from separate route files */}
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
        {VendorRoutes()}
        {ContractsRoutes()}
        {CategoriesRoutes()}
        {EntitiesRoutes()}
        {ScorecardsRoutes()}
        {WorkflowsRoutes()}
        {AIExtractRoutes()}
        {FilesRoutes()}
        {EventsRoutes()}
        {RiskRegisterRoutes()}
        {RequestsRoutes()}
        {BetaRoutes()}
        
        {/* Legacy route redirects */}
        <Route path="/prototypes" element={<Navigate to="/" replace />} />
        <Route path="/supplier-settings" element={<Navigate to="/data-management/suppliers" replace />} />
        <Route path="/supplier-costing" element={<Navigate to="/data-management/supplier-costing" replace />} />
        <Route path="/cost-analysis" element={<Navigate to="/data-management/cost-analysis" replace />} />
        
        {/* 404 Page */}
        <Route path="*" element={
          <PlatformLayout
            moduleTitle="Not Found"
            navCategories={mainNavCategories}
          >
            <NotFound />
          </PlatformLayout>
        } />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
