
import { Route } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import { TradingSystemLayout } from "@/components/layout/TradingSystemLayout";

// Data Management Pages
import DashboardHome from "@/pages/data-management/DashboardHome";
import CostDashboard from "@/pages/data-management/cost-management/CostDashboard";
import CostAnalysis from "@/pages/data-management/cost-management/CostAnalysis";
import SupplierCosting from "@/pages/data-management/cost-management/SupplierCosting";
import CompetitorPricing from "@/pages/data-management/pricing/CompetitorPricing";
import PriceManagement from "@/pages/data-management/pricing/PriceManagement";
import UploadsPage from "@/pages/UploadsPage";
import NewUploadPage from "@/pages/NewUploadPage";
import DocumentsPage from "@/pages/data-management/documents/DocumentsPage";
import SuppliersPage from "@/pages/SuppliersPage";
import NotFound from "@/pages/NotFound";

export const DataManagementRoutes = () => {
  return (
    <>
      {/* Data Management Module Routes */}
      <Route
        path="/data-management"
        element={
          <ProtectedRoute>
            <TradingSystemLayout />
          </ProtectedRoute>
        }
      >
        {/* Main Dashboard */}
        <Route index element={<DashboardHome />} />
        
        {/* Supplier Management */}
        <Route path="suppliers" element={<SuppliersPage />} />
        
        {/* Cost Management */}
        <Route path="cost-management" element={<CostDashboard />} />
        <Route path="cost-analysis" element={<CostAnalysis />} />
        <Route path="supplier-costing" element={<SupplierCosting />} />
        
        {/* Pricing */}
        <Route path="pricing/competitor-pricing" element={<CompetitorPricing />} />
        <Route path="pricing/price-management" element={<PriceManagement />} />
        
        {/* File Uploads */}
        <Route path="uploads" element={<UploadsPage />} />
        <Route path="uploads/new" element={<NewUploadPage />} />
        <Route path="uploads/holding" element={<UploadsPage />} />
        <Route path="uploads/bulk-import" element={<UploadsPage />} />
        
        {/* Document Repository */}
        <Route path="documents" element={<DocumentsPage />} />
        
        {/* Catch-all for invalid Data Management routes */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </>
  );
};
