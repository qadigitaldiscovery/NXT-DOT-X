
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SupplierCosting from "./pages/SupplierCosting";
import CostAnalysis from "./pages/CostAnalysis";
import CompetitorPricing from "./pages/CompetitorPricing";
import PriceManagement from "./pages/PriceManagement";
import ExportData from "./pages/ExportData";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";
import PrototypeSelector from "./pages/PrototypeSelector";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Landing Page (Login) */}
          <Route path="/landing" element={<Landing />} />
          
          {/* Prototype Selector */}
          <Route path="/prototypes" element={
            <ProtectedRoute>
              <PrototypeSelector />
            </ProtectedRoute>
          } />
          
          {/* Beta 1 Dashboard Routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/supplier-costing" element={
            <ProtectedRoute>
              <DashboardLayout>
                <SupplierCosting />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/cost-analysis" element={
            <ProtectedRoute>
              <DashboardLayout>
                <CostAnalysis />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/competitor-pricing" element={
            <ProtectedRoute>
              <DashboardLayout>
                <CompetitorPricing />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/price-management" element={
            <ProtectedRoute>
              <DashboardLayout>
                <PriceManagement />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/export-data" element={
            <ProtectedRoute>
              <DashboardLayout>
                <ExportData />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Settings />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          
          {/* Root redirect - send to prototypes page when logged in */}
          <Route index element={
            localStorage.getItem('isAuthenticated') === 'true' ? 
            <Navigate to="/prototypes" replace /> : 
            <Navigate to="/landing" replace />
          } />
          
          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
