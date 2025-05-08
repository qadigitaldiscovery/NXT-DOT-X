import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";
import RootHandler from './components/RootHandler';
import ProtectedRoute from "./components/ProtectedRoute";
import PermissionGuard from "./components/PermissionGuard";
import Unauthorized from "./pages/Unauthorized";
import { AuthProvider } from "./context/AuthContext";

// Import admin pages
import UserManagement from "./pages/UserManagement";

// Import Data Management layouts and pages
import { DashboardLayout } from './components/layout/DashboardLayout';
import DataManagementDashboard from "./pages/DataManagementDashboard";
import SupplierCosting from "./pages/SupplierCosting";
import CostAnalysis from "./pages/CostAnalysis";
import CompetitorPricing from "./pages/CompetitorPricing";
import PriceManagement from "./pages/PriceManagement";
import ExportData from "./pages/ExportData";
import SuppliersPage from "./pages/SuppliersPage";
import NewSupplierPage from "./pages/NewSupplierPage";
import EditSupplierPage from "./pages/EditSupplierPage";
import SupplierCostsPage from "./pages/SupplierCostsPage";
import UploadsPage from "./pages/UploadsPage";
import NewUploadPage from "./pages/NewUploadPage";
import DataManagementSettings from "./pages/DataManagementSettings";

// Import Loyalty Rewards layouts and pages
import { LoyaltyLayout } from "./components/layout/LoyaltyLayout";
import LoyaltyDashboard from "./pages/LoyaltyDashboard";
import LoyaltyMembers from "./pages/LoyaltyMembers";
import LoyaltyRewards from "./pages/LoyaltyRewards";
import LoyaltyAnalytics from "./pages/LoyaltyAnalytics";
import LoyaltySettings from "./pages/LoyaltySettings";

// Import Trading System layouts and pages
import { TradingSystemLayout } from "./components/layout/TradingSystemLayout";
import TradingSystemDashboard from "./pages/TradingSystemDashboard";
import TradingSystemSettings from "./pages/TradingSystemSettings";

// Import the new APIsPage
import APIsPage from "./pages/APIsPage";
import TechHubApiManagement from "./pages/APIsPage";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <TooltipProvider>
            <Routes>
              {/* Landing Page (Login) */}
              <Route index element={<RootHandler />} />
              <Route path="/landing" element={<Landing />} />
              
              {/* Unauthorized Page */}
              <Route path="/unauthorized" element={<Unauthorized />} />
              
              {/* Dashboard / Module Selector */}
              {/* Removed: <Route path="/dashboard" element={ ... } /> */}

              {/* Redirect old prototypes route to new dashboard route (now root for MasterDash) */}
              <Route path="/prototypes" element={
                <Navigate to="/" replace />
              } />
              
              {/* Admin Routes */}
              <Route path="/admin/users" element={
                <PermissionGuard requiredPermission="users.view">
                  <UserManagement />
                </PermissionGuard>
              } />

              {/* Data Management Module Routes */}
              <Route path="/data-management" element={
                <PermissionGuard requiredPermission="modules.data">
                  <DashboardLayout>
                    <DataManagementDashboard />
                  </DashboardLayout>
                </PermissionGuard>
              } />
              
              <Route path="/data-management/supplier-costing" element={
                <PermissionGuard requiredPermission="modules.data">
                  <DashboardLayout>
                    <SupplierCosting />
                  </DashboardLayout>
                </PermissionGuard>
              } />
              
              <Route path="/data-management/suppliers" element={
                <PermissionGuard requiredPermission="modules.data">
                  <DashboardLayout>
                    <SuppliersPage />
                  </DashboardLayout>
                </PermissionGuard>
              } />
              
              <Route path="/data-management/suppliers/new" element={
                <PermissionGuard requiredPermission="modules.data">
                  <DashboardLayout>
                    <NewSupplierPage />
                  </DashboardLayout>
                </PermissionGuard>
              } />
              
              <Route path="/data-management/suppliers/:id" element={
                <PermissionGuard requiredPermission="modules.data">
                  <DashboardLayout>
                    <EditSupplierPage />
                  </DashboardLayout>
                </PermissionGuard>
              } />
              
              <Route path="/data-management/suppliers/:id/costs" element={
                <PermissionGuard requiredPermission="modules.data">
                  <DashboardLayout>
                    <SupplierCostsPage />
                  </DashboardLayout>
                </PermissionGuard>
              } />
              
              <Route path="/data-management/uploads" element={
                <PermissionGuard requiredPermission="modules.data">
                  <DashboardLayout>
                    <UploadsPage />
                  </DashboardLayout>
                </PermissionGuard>
              } />
              
              <Route path="/data-management/uploads/new" element={
                <PermissionGuard requiredPermission="modules.data">
                  <DashboardLayout>
                    <NewUploadPage />
                  </DashboardLayout>
                </PermissionGuard>
              } />
              
              <Route path="/data-management/cost-analysis" element={
                <PermissionGuard requiredPermission="modules.data">
                  <DashboardLayout>
                    <CostAnalysis />
                  </DashboardLayout>
                </PermissionGuard>
              } />
              
              <Route path="/data-management/competitor-pricing" element={
                <PermissionGuard requiredPermission="modules.data">
                  <DashboardLayout>
                    <CompetitorPricing />
                  </DashboardLayout>
                </PermissionGuard>
              } />
              
              <Route path="/data-management/price-management" element={
                <PermissionGuard requiredPermission="modules.data">
                  <DashboardLayout>
                    <PriceManagement />
                  </DashboardLayout>
                </PermissionGuard>
              } />
              
              <Route path="/data-management/exports" element={
                <PermissionGuard requiredPermission="modules.data">
                  <DashboardLayout>
                    <ExportData />
                  </DashboardLayout>
                </PermissionGuard>
              } />
              
              <Route path="/data-management/settings" element={
                <PermissionGuard requiredPermission="modules.data">
                  <DashboardLayout>
                    <DataManagementSettings />
                  </DashboardLayout>
                </PermissionGuard>
              } />
              
              <Route path="/data-management/apis" element={
                <PermissionGuard requiredPermission="modules.data">
                  <DashboardLayout>
                    <APIsPage />
                  </DashboardLayout>
                </PermissionGuard>
              } />
              
              {/* Legacy routes for Data Management - redirect to new structure */}
              <Route path="/beta1" element={<Navigate to="/data-management" replace />} />
              <Route path="/supplier-costing" element={<Navigate to="/data-management/suppliers" replace />} />
              <Route path="/cost-analysis" element={<Navigate to="/data-management/cost-analysis" replace />} />
              <Route path="/competitor-pricing" element={<Navigate to="/data-management/competitor-pricing" replace />} />
              <Route path="/price-management" element={<Navigate to="/data-management/price-management" replace />} />
              <Route path="/export-data" element={<Navigate to="/data-management/exports" replace />} />
              
              {/* Loyalty Rewards Module Routes */}
              <Route path="/loyalty-rewards" element={
                <PermissionGuard requiredPermission="modules.loyalty">
                  <LoyaltyLayout>
                    <LoyaltyDashboard />
                  </LoyaltyLayout>
                </PermissionGuard>
              } />
              
              <Route path="/loyalty-rewards/members" element={
                <PermissionGuard requiredPermission="modules.loyalty">
                  <LoyaltyLayout>
                    <LoyaltyMembers />
                  </LoyaltyLayout>
                </PermissionGuard>
              } />
              
              <Route path="/loyalty-rewards/rewards" element={
                <PermissionGuard requiredPermission="modules.loyalty">
                  <LoyaltyLayout>
                    <LoyaltyRewards />
                  </LoyaltyLayout>
                </PermissionGuard>
              } />
              
              <Route path="/loyalty-rewards/analytics" element={
                <PermissionGuard requiredPermission="modules.loyalty">
                  <LoyaltyLayout>
                    <LoyaltyAnalytics />
                  </LoyaltyLayout>
                </PermissionGuard>
              } />
              
              <Route path="/loyalty-rewards/settings" element={
                <PermissionGuard requiredPermission="modules.loyalty">
                  <LoyaltyLayout>
                    <LoyaltySettings />
                  </LoyaltyLayout>
                </PermissionGuard>
              } />
              
              {/* Legacy routes for Loyalty Rewards - redirect to new structure */}
              <Route path="/beta2" element={<Navigate to="/loyalty-rewards" replace />} />
              <Route path="/beta2/members" element={<Navigate to="/loyalty-rewards/members" replace />} />
              <Route path="/beta2/rewards" element={<Navigate to="/loyalty-rewards/rewards" replace />} />
              <Route path="/beta2/analytics" element={<Navigate to="/loyalty-rewards/analytics" replace />} />
              <Route path="/beta2/settings" element={<Navigate to="/loyalty-rewards/settings" replace />} />
              
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
              
              {/* Tech Hub API Management Route */}
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
              
              {/* Legacy routes for Trading System - redirect to new structure */}
              <Route path="/beta3" element={<Navigate to="/trading-system" replace />} />
              <Route path="/beta3/settings" element={<Navigate to="/trading-system/settings" replace />} />
              
              <Route path="/tech-hub/api-management" element={
                <PermissionGuard requiredPermission="modules.trading">
                  <TradingSystemLayout>
                    <TechHubApiManagement />
                  </TradingSystemLayout>
                </PermissionGuard>
              } />
              
              {/* 404 Page */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
