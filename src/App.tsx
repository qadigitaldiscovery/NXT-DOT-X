
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

// Import our new supplier costing pages
import SuppliersPage from "./pages/SuppliersPage";
import NewSupplierPage from "./pages/NewSupplierPage";
import EditSupplierPage from "./pages/EditSupplierPage";
import SupplierCostsPage from "./pages/SupplierCostsPage";
import UploadsPage from "./pages/UploadsPage";
import NewUploadPage from "./pages/NewUploadPage";

const queryClient = new QueryClient();

const App = () => {
  // Determine authentication status once during rendering
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  console.log("App rendering, auth status:", isAuthenticated);
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Landing Page (Login) - now set as the root path */}
            <Route index element={<Landing />} />
            <Route path="/landing" element={<Landing />} />
            
            {/* Prototype Selector */}
            <Route path="/prototypes" element={
              <ProtectedRoute>
                <PrototypeSelector />
              </ProtectedRoute>
            } />
            
            {/* Beta 1 Dashboard routes */}
            <Route path="/beta1" element={
              <ProtectedRoute>
                <Beta1Layout>
                  <Beta1Dashboard />
                </Beta1Layout>
              </ProtectedRoute>
            } />
            <Route path="/beta1/settings" element={
              <ProtectedRoute>
                <Beta1Layout>
                  <Beta1Settings />
                </Beta1Layout>
              </ProtectedRoute>
            } />

            {/* New Supplier Costing Module routes */}
            <Route path="/beta1/suppliers" element={
              <ProtectedRoute>
                <Beta1Layout>
                  <SuppliersPage />
                </Beta1Layout>
              </ProtectedRoute>
            } />
            <Route path="/beta1/suppliers/new" element={
              <ProtectedRoute>
                <Beta1Layout>
                  <NewSupplierPage />
                </Beta1Layout>
              </ProtectedRoute>
            } />
            <Route path="/beta1/suppliers/:id" element={
              <ProtectedRoute>
                <Beta1Layout>
                  <EditSupplierPage />
                </Beta1Layout>
              </ProtectedRoute>
            } />
            <Route path="/beta1/suppliers/:id/costs" element={
              <ProtectedRoute>
                <Beta1Layout>
                  <SupplierCostsPage />
                </Beta1Layout>
              </ProtectedRoute>
            } />
            <Route path="/beta1/uploads" element={
              <ProtectedRoute>
                <Beta1Layout>
                  <UploadsPage />
                </Beta1Layout>
              </ProtectedRoute>
            } />
            <Route path="/beta1/uploads/new" element={
              <ProtectedRoute>
                <Beta1Layout>
                  <NewUploadPage />
                </Beta1Layout>
              </ProtectedRoute>
            } />
            
            {/* Legacy Beta 1 routes - redirect to new structure */}
            <Route path="/supplier-costing" element={
              <ProtectedRoute>
                <Beta1Layout>
                  <SupplierCosting />
                </Beta1Layout>
              </ProtectedRoute>
            } />
            <Route path="/cost-analysis" element={
              <ProtectedRoute>
                <Beta1Layout>
                  <CostAnalysis />
                </Beta1Layout>
              </ProtectedRoute>
            } />
            <Route path="/competitor-pricing" element={
              <ProtectedRoute>
                <Beta1Layout>
                  <CompetitorPricing />
                </Beta1Layout>
              </ProtectedRoute>
            } />
            <Route path="/price-management" element={
              <ProtectedRoute>
                <Beta1Layout>
                  <PriceManagement />
                </Beta1Layout>
              </ProtectedRoute>
            } />
            <Route path="/export-data" element={
              <ProtectedRoute>
                <Beta1Layout>
                  <ExportData />
                </Beta1Layout>
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <Beta1Layout>
                  <Settings />
                </Beta1Layout>
              </ProtectedRoute>
            } />
            
            {/* Beta 2 Dashboard routes */}
            <Route path="/beta2" element={
              <ProtectedRoute>
                <Beta2Layout>
                  <Beta2Dashboard />
                </Beta2Layout>
              </ProtectedRoute>
            } />
            <Route path="/beta2/analytics" element={
              <ProtectedRoute>
                <Beta2Layout>
                  <Beta2Analytics />
                </Beta2Layout>
              </ProtectedRoute>
            } />
            <Route path="/beta2/settings" element={
              <ProtectedRoute>
                <Beta2Layout>
                  <Beta2Settings />
                </Beta2Layout>
              </ProtectedRoute>
            } />
            
            {/* Beta 3 Dashboard routes */}
            <Route path="/beta3" element={
              <ProtectedRoute>
                <Beta3Layout>
                  <Beta3Dashboard />
                </Beta3Layout>
              </ProtectedRoute>
            } />
            <Route path="/beta3/settings" element={
              <ProtectedRoute>
                <Beta3Layout>
                  <Beta3Settings />
                </Beta3Layout>
              </ProtectedRoute>
            } />
            
            {/* 404 Page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
