
import { Route } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import { TradingSystemLayout } from "@/components/layout/TradingSystemLayout";
import { PlatformLayout } from "@/components/layouts/PlatformLayout";
import { Users, Settings, BarChart3, FileUp, Home } from 'lucide-react';
import { NavCategory } from '@/components/layout/sidebar/types';

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

// Customer Management Pages
import CustomerDirectoryPage from "@/pages/customer-management/CustomerDirectoryPage";
import CustomerSettings from "@/pages/customer-management/CustomerSettings";
import NewCustomerPage from "@/pages/customer-management/NewCustomerPage";
import EditCustomerPage from "@/pages/customer-management/EditCustomerPage";

const customerNavCategories: NavCategory[] = [
  {
    name: "CUSTOMER MANAGEMENT",
    label: "CUSTOMER MANAGEMENT",
    items: [
      { label: 'Dashboard', icon: Home, path: '/customer-management' },
      { label: 'Customer Directory', icon: Users, path: '/customer-management/directory' },
      { label: 'Customer Settings', icon: Settings, path: '/customer-management/settings' },
      { label: 'Customer Analytics', icon: BarChart3, path: '/customer-analytics' },
      { label: 'Upload Files', icon: FileUp, path: '/data-management/uploads' }
    ]
  }
];

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
        <Route path="supplier-costing" element={<SupplierCosting />} />
        
        {/* Customer Management */}
        <Route path="customers" element={
          <PlatformLayout moduleTitle="Customer Directory" navCategories={customerNavCategories}>
            <CustomerDirectoryPage />
          </PlatformLayout>
        } />
        <Route path="customers/new" element={
          <PlatformLayout moduleTitle="New Customer" navCategories={customerNavCategories}>
            <NewCustomerPage />
          </PlatformLayout>
        } />
        <Route path="customers/:customerId" element={
          <PlatformLayout moduleTitle="Edit Customer" navCategories={customerNavCategories}>
            <EditCustomerPage />
          </PlatformLayout>
        } />
        <Route path="customers/settings" element={
          <PlatformLayout moduleTitle="Customer Settings" navCategories={customerNavCategories}>
            <CustomerSettings />
          </PlatformLayout>
        } />
        
        {/* Cost Management */}
        <Route path="cost-management" element={<CostDashboard />} />
        <Route path="cost-analysis" element={<CostAnalysis />} />
        
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
