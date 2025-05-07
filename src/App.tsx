
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SupplierCosting from "./pages/SupplierCosting";
import CostAnalysis from "./pages/CostAnalysis";
import CompetitorPricing from "./pages/CompetitorPricing";
import PriceManagement from "./pages/PriceManagement";
import ExportData from "./pages/ExportData";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";
import PrototypeSelector from "./pages/PrototypeSelector";
import ProtectedRoute from "./components/ProtectedRoute";
import { Beta1Layout } from "./components/layout/Beta1Layout";
import Beta1Dashboard from "./pages/Beta1Dashboard";
import Beta1Settings from "./pages/Beta1Settings";
import { Beta2Layout } from "./components/layout/Beta2Layout";
import Beta2Dashboard from "./pages/Beta2Dashboard";
import Beta2Analytics from "./pages/Beta2Analytics";
import Beta2Settings from "./pages/Beta2Settings";
import { Beta3Layout } from "./components/layout/Beta3Layout";
import Beta3Dashboard from "./pages/Beta3Dashboard";
import Beta3Settings from "./pages/Beta3Settings";
import UserManagement from "./pages/UserManagement";
import Unauthorized from "./pages/Unauthorized";
import { AuthProvider } from "./context/AuthContext";
import PermissionGuard from "./components/PermissionGuard";

// Import our new supplier costing pages
import SuppliersPage from "./pages/SuppliersPage";
import NewSupplierPage from "./pages/NewSupplierPage";
import EditSupplierPage from "./pages/EditSupplierPage";
import SupplierCostsPage from "./pages/SupplierCostsPage";
import UploadsPage from "./pages/UploadsPage";
import NewUploadPage from "./pages/NewUploadPage";

// Import our new loyalty pages
import Beta2Members from "./pages/Beta2Members";
import Beta2Rewards from "./pages/Beta2Rewards";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              {/* Landing Page (Login) */}
              <Route index element={<Navigate to="/landing" replace />} />
              <Route path="/landing" element={<Landing />} />
              
              {/* Unauthorized Page */}
              <Route path="/unauthorized" element={<Unauthorized />} />
              
              {/* Prototype Selector */}
              <Route path="/prototypes" element={
                <ProtectedRoute>
                  <PrototypeSelector />
                </ProtectedRoute>
              } />
              
              {/* User Management */}
              <Route path="/users" element={
                <PermissionGuard requiredPermission="users.view">
                  <UserManagement />
                </PermissionGuard>
              } />

              {/* Beta 1 Dashboard routes */}
              <Route path="/beta1" element={
                <PermissionGuard requiredPermission="modules.data">
                  <Beta1Layout>
                    <Beta1Dashboard />
                  </Beta1Layout>
                </PermissionGuard>
              } />
              <Route path="/beta1/settings" element={
                <PermissionGuard requiredPermission="modules.data">
                  <Beta1Layout>
                    <Beta1Settings />
                  </Beta1Layout>
                </PermissionGuard>
              } />

              {/* New Supplier Costing Module routes */}
              <Route path="/beta1/suppliers" element={
                <PermissionGuard requiredPermission="modules.data">
                  <Beta1Layout>
                    <SuppliersPage />
                  </Beta1Layout>
                </PermissionGuard>
              } />
              <Route path="/beta1/suppliers/new" element={
                <PermissionGuard requiredPermission="modules.data">
                  <Beta1Layout>
                    <NewSupplierPage />
                  </Beta1Layout>
                </PermissionGuard>
              } />
              <Route path="/beta1/suppliers/:id" element={
                <PermissionGuard requiredPermission="modules.data">
                  <Beta1Layout>
                    <EditSupplierPage />
                  </Beta1Layout>
                </PermissionGuard>
              } />
              <Route path="/beta1/suppliers/:id/costs" element={
                <PermissionGuard requiredPermission="modules.data">
                  <Beta1Layout>
                    <SupplierCostsPage />
                  </Beta1Layout>
                </PermissionGuard>
              } />
              <Route path="/beta1/uploads" element={
                <PermissionGuard requiredPermission="modules.data">
                  <Beta1Layout>
                    <UploadsPage />
                  </Beta1Layout>
                </PermissionGuard>
              } />
              <Route path="/beta1/uploads/new" element={
                <PermissionGuard requiredPermission="modules.data">
                  <Beta1Layout>
                    <NewUploadPage />
                  </Beta1Layout>
                </PermissionGuard>
              } />
              
              {/* Legacy Beta 1 routes - redirect to new structure */}
              <Route path="/supplier-costing" element={
                <PermissionGuard requiredPermission="modules.data">
                  <Beta1Layout>
                    <SupplierCosting />
                  </Beta1Layout>
                </PermissionGuard>
              } />
              <Route path="/cost-analysis" element={
                <PermissionGuard requiredPermission="modules.data">
                  <Beta1Layout>
                    <CostAnalysis />
                  </Beta1Layout>
                </PermissionGuard>
              } />
              <Route path="/competitor-pricing" element={
                <PermissionGuard requiredPermission="modules.data">
                  <Beta1Layout>
                    <CompetitorPricing />
                  </Beta1Layout>
                </PermissionGuard>
              } />
              <Route path="/price-management" element={
                <PermissionGuard requiredPermission="modules.data">
                  <Beta1Layout>
                    <PriceManagement />
                  </Beta1Layout>
                </PermissionGuard>
              } />
              <Route path="/export-data" element={
                <PermissionGuard requiredPermission="modules.data">
                  <Beta1Layout>
                    <ExportData />
                  </Beta1Layout>
                </PermissionGuard>
              } />
              <Route path="/settings" element={
                <PermissionGuard requiredPermission="settings.access">
                  <Beta1Layout>
                    <Settings />
                  </Beta1Layout>
                </PermissionGuard>
              } />
              
              {/* Beta 2 Dashboard routes */}
              <Route path="/beta2" element={
                <PermissionGuard requiredPermission="modules.loyalty">
                  <Beta2Layout>
                    <Beta2Dashboard />
                  </Beta2Layout>
                </PermissionGuard>
              } />
              <Route path="/beta2/analytics" element={
                <PermissionGuard requiredPermission="modules.loyalty">
                  <Beta2Layout>
                    <Beta2Analytics />
                  </Beta2Layout>
                </PermissionGuard>
              } />
              <Route path="/beta2/settings" element={
                <PermissionGuard requiredPermission="modules.loyalty">
                  <Beta2Layout>
                    <Beta2Settings />
                  </Beta2Layout>
                </PermissionGuard>
              } />
              {/* New Beta 2 Loyalty Program routes */}
              <Route path="/beta2/members" element={
                <PermissionGuard requiredPermission="modules.loyalty">
                  <Beta2Layout>
                    <Beta2Members />
                  </Beta2Layout>
                </PermissionGuard>
              } />
              <Route path="/beta2/rewards" element={
                <PermissionGuard requiredPermission="modules.loyalty">
                  <Beta2Layout>
                    <Beta2Rewards />
                  </Beta2Layout>
                </PermissionGuard>
              } />
              
              {/* Beta 3 Dashboard routes */}
              <Route path="/beta3" element={
                <PermissionGuard requiredPermission="modules.trading">
                  <Beta3Layout>
                    <Beta3Dashboard />
                  </Beta3Layout>
                </PermissionGuard>
              } />
              <Route path="/beta3/settings" element={
                <PermissionGuard requiredPermission="modules.trading">
                  <Beta3Layout>
                    <Beta3Settings />
                  </Beta3Layout>
                </PermissionGuard>
              } />
              
              {/* 404 Page */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
