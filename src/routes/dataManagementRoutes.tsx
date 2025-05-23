
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
          <SimpleLayout>
            <DashboardHome />
          </SimpleLayout>
        </ProtectedRoute>
      } />
      
      <Route path="suppliers" element={
        <ProtectedRoute>
          <SimpleLayout>
            <SupplierPage />
          </SimpleLayout>
        </ProtectedRoute>
      } />
      
      <Route path="customers" element={
        <ProtectedRoute>
          <SimpleLayout>
            <CustomerPage />
          </SimpleLayout>
        </ProtectedRoute>
      } />
      
      <Route path="supplier-costing" element={
        <ProtectedRoute>
          <SimpleLayout>
            <SupplierCosting />
          </SimpleLayout>
        </ProtectedRoute>
      } />
      
      <Route path="cost-analysis" element={
        <ProtectedRoute>
          <SimpleLayout>
            <CostAnalysisPage />
          </SimpleLayout>
        </ProtectedRoute>
      } />
      
      <Route path="cost-management" element={
        <ProtectedRoute>
          <SimpleLayout>
            <CostManagementPage />
          </SimpleLayout>
        </ProtectedRoute>
      } />
      
      <Route path="pricing/competitor-pricing" element={
        <ProtectedRoute>
          <SimpleLayout>
            <CompetitorPricingPage />
          </SimpleLayout>
        </ProtectedRoute>
      } />
      
      <Route path="pricing/price-management" element={
        <ProtectedRoute>
          <SimpleLayout>
            <PriceManagementPage />
          </SimpleLayout>
        </ProtectedRoute>
      } />
      
      <Route path="uploads" element={
        <ProtectedRoute>
          <SimpleLayout>
            <UploadsPage />
          </SimpleLayout>
        </ProtectedRoute>
      } />
      
      <Route path="documents" element={
        <ProtectedRoute>
          <SimpleLayout>
            <DocumentsPage />
          </SimpleLayout>
        </ProtectedRoute>
      } />
      
      <Route path="export-data" element={
        <ProtectedRoute>
          <SimpleLayout>
            <ExportDataPage />
          </SimpleLayout>
        </ProtectedRoute>
      } />
      
      <Route path="insights" element={
        <ProtectedRoute>
          <SimpleLayout>
            <InsightsPage />
          </SimpleLayout>
        </ProtectedRoute>
      } />
      
      <Route path="connections" element={
        <ProtectedRoute>
          <SimpleLayout>
            <ConnectionsPage />
          </SimpleLayout>
        </ProtectedRoute>
      } />
      
      <Route path="settings" element={
        <ProtectedRoute>
          <SimpleLayout>
            <DataManagementSettings />
          </SimpleLayout>
        </ProtectedRoute>
      } />
      
      <Route path="*" element={
        <ProtectedRoute>
          <SimpleLayout>
            <NotFound />
          </SimpleLayout>
        </ProtectedRoute>
      } />
    </Routes>
  );
};
