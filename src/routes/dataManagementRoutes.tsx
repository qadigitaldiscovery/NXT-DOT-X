
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import { SimpleLayout } from "@/components/layout/SimpleLayout";

// Data Management Pages
import DashboardHome from "@/pages/data-management/DashboardHome";
import SupplierPage from "@/pages/data-management/SupplierPage";
import CustomerPage from "@/pages/data-management/CustomerPage";
import SupplierCosting from "@/pages/data-management/SupplierCosting";
import CostAnalysisPage from "@/pages/data-management/CostAnalysisPage";
import CostManagementPage from "@/pages/data-management/CostManagementPage";
import CompetitorPricingPage from "@/pages/data-management/pricing/CompetitorPricingPage";
import PriceManagementPage from "@/pages/data-management/pricing/PriceManagementPage";
import UploadsPage from "@/pages/data-management/UploadsPage";
import DocumentsPage from "@/pages/data-management/documents/DocumentsPage";
import ExportDataPage from "@/pages/data-management/ExportDataPage";
import InsightsPage from "@/pages/data-management/InsightsPage";
import ConnectionsPage from "@/pages/data-management/ConnectionsPage";
import DataManagementSettings from "@/pages/DataManagementSettings";
import NotFound from "@/pages/NotFound";

export const DataManagementRoutes = () => {
  return (
    <Routes>
      <Route index element={
        <ProtectedRoute>
          <DashboardHome />
        </ProtectedRoute>
      } />
      
      <Route path="suppliers" element={
        <ProtectedRoute>
          <SupplierPage />
        </ProtectedRoute>
      } />
      
      <Route path="customers" element={
        <ProtectedRoute>
          <CustomerPage />
        </ProtectedRoute>
      } />
      
      <Route path="supplier-costing" element={
        <ProtectedRoute>
          <SupplierCosting />
        </ProtectedRoute>
      } />
      
      <Route path="cost-analysis" element={
        <ProtectedRoute>
          <CostAnalysisPage />
        </ProtectedRoute>
      } />
      
      <Route path="cost-management" element={
        <ProtectedRoute>
          <CostManagementPage />
        </ProtectedRoute>
      } />
      
      <Route path="pricing/competitor-pricing" element={
        <ProtectedRoute>
          <CompetitorPricingPage />
        </ProtectedRoute>
      } />
      
      <Route path="pricing/price-management" element={
        <ProtectedRoute>
          <PriceManagementPage />
        </ProtectedRoute>
      } />
      
      <Route path="uploads" element={
        <ProtectedRoute>
          <UploadsPage />
        </ProtectedRoute>
      } />
      
      <Route path="documents" element={
        <ProtectedRoute>
          <DocumentsPage />
        </ProtectedRoute>
      } />
      
      <Route path="export-data" element={
        <ProtectedRoute>
          <ExportDataPage />
        </ProtectedRoute>
      } />
      
      <Route path="insights" element={
        <ProtectedRoute>
          <InsightsPage />
        </ProtectedRoute>
      } />
      
      <Route path="connections" element={
        <ProtectedRoute>
          <ConnectionsPage />
        </ProtectedRoute>
      } />
      
      <Route path="settings" element={
        <ProtectedRoute>
          <DataManagementSettings />
        </ProtectedRoute>
      } />
      
      <Route path="*" element={
        <ProtectedRoute>
          <NotFound />
        </ProtectedRoute>
      } />
    </Routes>
  );
};
