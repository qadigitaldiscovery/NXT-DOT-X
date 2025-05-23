import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { RouteGuard } from '../utils/rbac/RouteGuard';
import { Permission } from '../utils/rbac/permissions';

// Lazy-loaded components for better performance
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Unauthorized = lazy(() => import('../pages/Unauthorized'));
const NotFound = lazy(() => import('../pages/NotFound'));

// Import module routes
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
const VendorRoutes = lazy(() => import("./vendorRoutes").then(module => ({ default: module.VendorRoutes })));
import { ContractsRoutes } from "./contractsRoutes";
import { CategoriesRoutes } from "./categoriesRoutes";
import { EntitiesRoutes } from "./entitiesRoutes";
import { ScorecardsRoutes } from "./scorecardsRoutes";
import { WorkflowsRoutes } from "./workflowsRoutes";
const AIExtractRoutes = lazy(() => import("./aiExtractRoutes").then(module => ({ default: module.AIExtractRoutes })));
import { FilesRoutes } from "./filesRoutes";
import { EventsRoutes } from "./eventsRoutes";
import { RiskRegisterRoutes } from "./riskRegisterRoutes";
const RequestsRoutes = lazy(() => import("./requestsRoutes").then(module => ({ default: module.RequestsRoutes })));
const BetaRoutes = lazy(() => import("./betaRoutes").then(module => ({ default: module.BetaRoutes })));


// Loading fallback for lazy-loaded components
const LoadingFallback = () => <div className="loading-spinner">Loading...</div>;

/**
 * Main application router implementing the hierarchical structure
 * Organizes routes according to the defined hierarchy:
 * 1. Global Landing
 * 2. Global Technology Management
 * 3. Global Modules
 * 4. Business Modules
 * 5. Automation & Workflows
 * 6. Web Services
 */
const IndexRouter: React.FC = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* A. Global Landing */}
        <Route 
          path="/" 
          element={
            <RouteGuard requiredPermissions={Permission.VIEW_DASHBOARD}>
              <Dashboard />
            </RouteGuard>
          } 
        />
        <Route 
          path="/landing" 
          element={
            <RouteGuard requiredPermissions={Permission.VIEW_DASHBOARD}>
              <Dashboard />
            </RouteGuard>
          } 
        />
        <Route 
          path="/master" 
          element={
            <RouteGuard requiredPermissions={Permission.VIEW_DASHBOARD}>
              <Dashboard />
            </RouteGuard>
          } 
        />
        <Route 
          path="/prototypes" 
          element={
            <RouteGuard requiredPermissions={Permission.VIEW_DASHBOARD}>
              <Dashboard />
            </RouteGuard>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <RouteGuard requiredPermissions={Permission.VIEW_DASHBOARD}>
              <Dashboard />
            </RouteGuard>
          } 
        />

        {/* B. Global Technology Management */}
        <Route path="/tech-hub/*" element={
          <RouteGuard requiredPermissions={[
            Permission.ADMIN_ACCESS,
            Permission.SYSTEM_CONFIG,
            Permission.INTEGRATION_MANAGE,
            Permission.API_MANAGE
          ]} requireAll={false}>
            <TechHubRoutes />
          </RouteGuard>
        } />
        
        <Route path="/admin/*" element={
          <RouteGuard requiredPermissions={Permission.ADMIN_ACCESS}>
            <AdminRoutes />
          </RouteGuard>
        } />
        
        <Route path="/ai-extract/*" element={
          <RouteGuard requiredPermissions={Permission.AI_EXTRACT_ACCESS}>
            <AIExtractRoutes />
          </RouteGuard>
        } />
        
        <Route path="/dot-x/*" element={
          <RouteGuard requiredPermissions={Permission.DOT_X_ACCESS}>
            <DotXRoutes />
          </RouteGuard>
        } />

        {/* C. Global Modules */}
        <Route path="/customer-management/*" element={
          <RouteGuard requiredPermissions={Permission.CUSTOMER_VIEW}>
            <CustomerManagementRoutes />
          </RouteGuard>
        } />
        
        <Route path="/supplier-management/*" element={
          <RouteGuard requiredPermissions={Permission.SUPPLIER_VIEW}>
            <SupplierManagementRoutes />
          </RouteGuard>
        } />
        
        <Route path="/vendors/*" element={
          <RouteGuard requiredPermissions={Permission.SUPPLIER_VIEW}>
            <VendorRoutes />
          </RouteGuard>
        } />
        
        <Route path="/files/*" element={
          <RouteGuard requiredPermissions={Permission.FILE_VIEW}>
            <FilesRoutes />
          </RouteGuard>
        } />

        {/* D. Business Modules */}
        <Route path="/data-management/*" element={
          <RouteGuard requiredPermissions={Permission.DATA_MANAGEMENT_ACCESS}>
            <DataManagementRoutes />
          </RouteGuard>
        } />
        
        <Route path="/projects/*" element={
          <RouteGuard requiredPermissions={Permission.PROJECT_VIEW}>
            <ProjectManagementRoutes />
          </RouteGuard>
        } />
        
        <Route path="/social-media/*" element={
          <RouteGuard requiredPermissions={Permission.SOCIAL_MEDIA_ACCESS}>
            <SocialMediaRoutes />
          </RouteGuard>
        } />
        
        <Route path="/dashboard/rag/*" element={
          <RouteGuard requiredPermissions={Permission.RAG_VIEW}>
            <RAGDashboardRoutes />
          </RouteGuard>
        } />
        
        <Route path="/brand-marketing/*" element={
          <RouteGuard requiredPermissions={Permission.MARKETING_ACCESS}>
            <BrandMarketingRoutes />
          </RouteGuard>
        } />
        
        <Route path="/loyalty-rewards/*" element={
          <RouteGuard requiredPermissions={Permission.LOYALTY_ACCESS}>
            <LoyaltyRoutes />
          </RouteGuard>
        } />
        
        <Route path="/loyalty/*" element={
          <RouteGuard requiredPermissions={Permission.LOYALTY_ACCESS}>
            <LoyaltyRoutes />
          </RouteGuard>
        } />
        
        <Route path="/trading-system/*" element={
          <RouteGuard requiredPermissions={Permission.TRADING_SYSTEM_ACCESS}>
            <TradingSystemRoutes />
          </RouteGuard>
        } />

        {/* E. Automation & Workflows */}
        <Route path="/workflows/*" element={
          <RouteGuard requiredPermissions={Permission.WORKFLOW_EDIT}>
            <WorkflowsRoutes />
          </RouteGuard>
        } />

        {/* Beta Routes */}
        <Route path="/beta1/*" element={
          <RouteGuard requiredPermissions={Permission.BETA_ACCESS}>
            <BetaRoutes />
          </RouteGuard>
        } />
        
        <Route path="/beta2/*" element={
          <RouteGuard requiredPermissions={Permission.BETA_ACCESS}>
            <BetaRoutes />
          </RouteGuard>
        } />

        {/* Other existing routes to maintain compatibility */}
        <Route path="/contracts/*" element={
          <RouteGuard requiredPermissions={Permission.CONTRACTS_ACCESS}>
            <ContractsRoutes />
          </RouteGuard>
        } />
        
        <Route path="/categories/*" element={
          <RouteGuard requiredPermissions={Permission.CATEGORIES_ACCESS}>
            <CategoriesRoutes />
          </RouteGuard>
        } />
        
        <Route path="/entities/*" element={
          <RouteGuard requiredPermissions={Permission.ENTITIES_ACCESS}>
            <EntitiesRoutes />
          </RouteGuard>
        } />
        
        <Route path="/scorecards/*" element={
          <RouteGuard requiredPermissions={Permission.SCORECARDS_ACCESS}>
            <ScorecardsRoutes />
          </RouteGuard>
        } />
        
        <Route path="/risk-register/*" element={
          <RouteGuard requiredPermissions={Permission.RISK_REGISTER_ACCESS}>
            <RiskRegisterRoutes />
          </RouteGuard>
        } />
        
        <Route path="/requests/*" element={
          <RouteGuard requiredPermissions={Permission.REQUESTS_ACCESS}>
            <RequestsRoutes />
          </RouteGuard>
        } />
        
        <Route path="/events/*" element={
          <RouteGuard requiredPermissions={Permission.EVENTS_ACCESS}>
            <EventsRoutes />
          </RouteGuard>
        } />

        {/* Auth and error routes */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/404" element={<NotFound />} />
        
        {/* Redirect unknown routes to 404 */}
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Suspense>
  );
};

export default IndexRouter;