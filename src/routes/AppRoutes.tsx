
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PlatformLayout } from '@/components/layouts/PlatformLayout';
import { NavCategory } from '@/components/layout/sidebar/types';

// Pages
import NotFound from '@/pages/NotFound';
import Settings from '@/pages/Settings';
import Landing from '@/pages/Landing';
import RootHandler from '@/components/RootHandler';
import MasterDash from '@/pages/MasterDash';
import Unauthorized from '@/pages/Unauthorized';
import SharedDocumentPage from '@/pages/SharedDocumentPage';
import Dashboard from '@/pages/Dashboard';
import DashboardV2 from '@/pages/DashboardV2';

// Module Routes
import { DataManagementRoutes } from './dataManagementRoutes';
import { AdminRoutes } from './adminRoutes';
import { LoyaltyRoutes } from './loyaltyRoutes';
import { TradingSystemRoutes } from './tradingSystemRoutes';
import { TechHubRoutes } from './techHubRoutes';
import { DotXRoutes } from './dotXRoutes';
import { SupplierManagementRoutes } from './supplierManagementRoutes';
import { CustomerManagementRoutes } from './customerManagementRoutes';
import { BrandMarketingRoutes } from './brandMarketingRoutes';
import { SocialMediaRoutes } from './socialMediaRoutes';
import { ProjectManagementRoutes } from './projectManagementRoutes';
import { RAGDashboardRoutes } from './ragDashboardRoutes';
import { VendorRoutes } from './vendorRoutes';
import { ContractsRoutes } from './contractsRoutes';
import { CategoriesRoutes } from './categoriesRoutes';
import { EntitiesRoutes } from './entitiesRoutes';
import { ScorecardsRoutes } from './scorecardsRoutes';
import { WorkflowsRoutes } from './workflowsRoutes';
import { AIExtractRoutes } from './aiExtractRoutes';
import { FilesRoutes } from './filesRoutes';
import { EventsRoutes } from './eventsRoutes';
import { RiskRegisterRoutes } from './riskRegisterRoutes';
import { RequestsRoutes } from './requestsRoutes';

// Import layout configuration
import { navCategories } from '@/components/layout/sidebar/NavigationConfig';
import { Home, Settings as SettingsIcon } from 'lucide-react';

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

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Root/Index Routes */}
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
      
      {/* Include Module Routes - Each module returns an array of Route elements */}
      {AdminRoutes().map((route, index) => (
        <React.Fragment key={`admin-route-${index}`}>{route}</React.Fragment>
      ))}
      {DataManagementRoutes().map((route, index) => (
        <React.Fragment key={`data-route-${index}`}>{route}</React.Fragment>
      ))}
      {LoyaltyRoutes().map((route, index) => (
        <React.Fragment key={`loyalty-route-${index}`}>{route}</React.Fragment>
      ))}
      {TradingSystemRoutes().map((route, index) => (
        <React.Fragment key={`trading-route-${index}`}>{route}</React.Fragment>
      ))}
      {TechHubRoutes().map((route, index) => (
        <React.Fragment key={`tech-route-${index}`}>{route}</React.Fragment>
      ))}
      {DotXRoutes().map((route, index) => (
        <React.Fragment key={`dotx-route-${index}`}>{route}</React.Fragment>
      ))}
      {SupplierManagementRoutes().map((route, index) => (
        <React.Fragment key={`supplier-route-${index}`}>{route}</React.Fragment>
      ))}
      {CustomerManagementRoutes().map((route, index) => (
        <React.Fragment key={`customer-route-${index}`}>{route}</React.Fragment>
      ))}
      {BrandMarketingRoutes().map((route, index) => (
        <React.Fragment key={`brand-route-${index}`}>{route}</React.Fragment>
      ))}
      {SocialMediaRoutes().map((route, index) => (
        <React.Fragment key={`social-route-${index}`}>{route}</React.Fragment>
      ))}
      {ProjectManagementRoutes().map((route, index) => (
        <React.Fragment key={`project-route-${index}`}>{route}</React.Fragment>
      ))}
      {RAGDashboardRoutes().map((route, index) => (
        <React.Fragment key={`rag-route-${index}`}>{route}</React.Fragment>
      ))}
      {VendorRoutes().map((route, index) => (
        <React.Fragment key={`vendor-route-${index}`}>{route}</React.Fragment>
      ))}
      {ContractsRoutes().map((route, index) => (
        <React.Fragment key={`contract-route-${index}`}>{route}</React.Fragment>
      ))}
      {CategoriesRoutes().map((route, index) => (
        <React.Fragment key={`category-route-${index}`}>{route}</React.Fragment>
      ))}
      {EntitiesRoutes().map((route, index) => (
        <React.Fragment key={`entity-route-${index}`}>{route}</React.Fragment>
      ))}
      {ScorecardsRoutes().map((route, index) => (
        <React.Fragment key={`scorecard-route-${index}`}>{route}</React.Fragment>
      ))}
      {WorkflowsRoutes().map((route, index) => (
        <React.Fragment key={`workflow-route-${index}`}>{route}</React.Fragment>
      ))}
      {AIExtractRoutes().map((route, index) => (
        <React.Fragment key={`ai-extract-route-${index}`}>{route}</React.Fragment>
      ))}
      {FilesRoutes().map((route, index) => (
        <React.Fragment key={`file-route-${index}`}>{route}</React.Fragment>
      ))}
      {EventsRoutes().map((route, index) => (
        <React.Fragment key={`event-route-${index}`}>{route}</React.Fragment>
      ))}
      {RiskRegisterRoutes().map((route, index) => (
        <React.Fragment key={`risk-route-${index}`}>{route}</React.Fragment>
      ))}
      {RequestsRoutes().map((route, index) => (
        <React.Fragment key={`request-route-${index}`}>{route}</React.Fragment>
      ))}
      
      {/* Legacy route redirects */}
      <Route path="/beta1/*" element={<Navigate to="/data-management" replace />} />
      <Route path="/beta2/*" element={<Navigate to="/loyalty-rewards" replace />} />
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
  );
};
