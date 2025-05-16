import { Route } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import { PlatformLayout } from "@/components/layouts/PlatformLayout";
import { Users, Settings, BarChart3, FileUp, Home, Database, Truck, Building, Calculator, LineChart, ArrowDownUp, FileDown, FileArchive, BrainCircuit, Server } from 'lucide-react';
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
import DataManagementSettings from "@/pages/DataManagementSettings";
import NotFound from "@/pages/NotFound";

// Import Beta pages that need to be integrated
import DataInsights from "@/pages/data-management/insights/DataInsights";
import DataConnections from "@/pages/data-management/connections/DataConnections";
import ExportData from "@/pages/data-management/data/ExportData";
import CustomersPage from "@/pages/data-management/customers/CustomersPage";

export const dataNavCategories: NavCategory[] = [
  {
    name: "DATA MANAGEMENT",
    label: "DATA MANAGEMENT",
    items: [
      { label: 'Dashboard', icon: Database, path: '/data-management' },
      { label: 'Supplier Directory', icon: Truck, path: '/data-management/suppliers' },
      { label: 'Customer Directory', icon: Building, path: '/data-management/customers' },
      { label: 'Supplier Costing', icon: Calculator, path: '/data-management/supplier-costing' },
      { label: 'Cost Analysis', icon: BarChart3, path: '/data-management/cost-analysis' },
      { label: 'Cost Management', icon: Database, path: '/data-management/cost-management' },
      { label: 'Competitor Pricing', icon: LineChart, path: '/data-management/pricing/competitor-pricing' },
      { label: 'Price Management', icon: ArrowDownUp, path: '/data-management/pricing/price-management' },
      { label: 'File Uploads', icon: FileUp, path: '/data-management/uploads' },
      { label: 'Document Repository', icon: FileArchive, path: '/data-management/documents' },
      { label: 'Export Data', icon: FileDown, path: '/data-management/export-data' },
      { label: 'Data Insights', icon: BrainCircuit, path: '/data-management/insights' },
      { label: 'Data Connections', icon: Server, path: '/data-management/connections' },
      { label: 'Settings', icon: Settings, path: '/data-management/settings' }
    ]
  }
];

export const customerNavCategories: NavCategory[] = [
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
      <Route path="/data-management">
        {/* Main Dashboard */}
        <Route index element={
          <ProtectedRoute>
            <PlatformLayout moduleTitle="Data Management Dashboard" navCategories={dataNavCategories}>
              <DashboardHome />
            </PlatformLayout>
          </ProtectedRoute>
        } />
        
        {/* Settings Page */}
        <Route path="settings" element={
          <ProtectedRoute>
            <PlatformLayout moduleTitle="Data Management Settings" navCategories={dataNavCategories}>
              <DataManagementSettings />
            </PlatformLayout>
          </ProtectedRoute>
        } />
        
        {/* Supplier Management */}
        <Route path="suppliers" element={
          <ProtectedRoute>
            <PlatformLayout moduleTitle="Suppliers" navCategories={dataNavCategories}>
              <SuppliersPage />
            </PlatformLayout>
          </ProtectedRoute>
        } />
        
        {/* Customer Management */}
        <Route path="customers" element={
          <ProtectedRoute>
            <PlatformLayout moduleTitle="Customers" navCategories={dataNavCategories}>
              <CustomersPage />
            </PlatformLayout>
          </ProtectedRoute>
        } />
        
        <Route path="supplier-costing" element={
          <ProtectedRoute>
            <PlatformLayout moduleTitle="Supplier Costing" navCategories={dataNavCategories}>
              <SupplierCosting />
            </PlatformLayout>
          </ProtectedRoute>
        } />
        
        {/* Cost Management */}
        <Route path="cost-management" element={
          <ProtectedRoute>
            <PlatformLayout moduleTitle="Cost Management" navCategories={dataNavCategories}>
              <CostDashboard />
            </PlatformLayout>
          </ProtectedRoute>
        } />
        
        <Route path="cost-analysis" element={
          <ProtectedRoute>
            <PlatformLayout moduleTitle="Cost Analysis" navCategories={dataNavCategories}>
              <CostAnalysis />
            </PlatformLayout>
          </ProtectedRoute>
        } />
        
        {/* Pricing */}
        <Route path="pricing/competitor-pricing" element={
          <ProtectedRoute>
            <PlatformLayout moduleTitle="Competitor Pricing" navCategories={dataNavCategories}>
              <CompetitorPricing />
            </PlatformLayout>
          </ProtectedRoute>
        } />
        
        <Route path="pricing/price-management" element={
          <ProtectedRoute>
            <PlatformLayout moduleTitle="Price Management" navCategories={dataNavCategories}>
              <PriceManagement />
            </PlatformLayout>
          </ProtectedRoute>
        } />
        
        {/* File Uploads */}
        <Route path="uploads" element={
          <ProtectedRoute>
            <PlatformLayout moduleTitle="File Uploads" navCategories={dataNavCategories}>
              <UploadsPage />
            </PlatformLayout>
          </ProtectedRoute>
        } />
        
        <Route path="uploads/new" element={
          <ProtectedRoute>
            <PlatformLayout moduleTitle="New Upload" navCategories={dataNavCategories}>
              <NewUploadPage />
            </PlatformLayout>
          </ProtectedRoute>
        } />
        
        <Route path="uploads/holding" element={
          <ProtectedRoute>
            <PlatformLayout moduleTitle="Upload Holding" navCategories={dataNavCategories}>
              <UploadsPage />
            </PlatformLayout>
          </ProtectedRoute>
        } />
        
        <Route path="uploads/bulk-import" element={
          <ProtectedRoute>
            <PlatformLayout moduleTitle="Bulk Import" navCategories={dataNavCategories}>
              <UploadsPage />
            </PlatformLayout>
          </ProtectedRoute>
        } />
        
        {/* Document Repository */}
        <Route path="documents" element={
          <ProtectedRoute>
            <PlatformLayout moduleTitle="Documents" navCategories={dataNavCategories}>
              <DocumentsPage />
            </PlatformLayout>
          </ProtectedRoute>
        } />
        
        {/* Export Data - New integrated route */}
        <Route path="export-data" element={
          <ProtectedRoute>
            <PlatformLayout moduleTitle="Export Data" navCategories={dataNavCategories}>
              <ExportData />
            </PlatformLayout>
          </ProtectedRoute>
        } />
        
        {/* Data Insights - New integrated route */}
        <Route path="insights" element={
          <ProtectedRoute>
            <PlatformLayout moduleTitle="Data Insights" navCategories={dataNavCategories}>
              <DataInsights />
            </PlatformLayout>
          </ProtectedRoute>
        } />
        
        {/* Data Connections - New integrated route */}
        <Route path="connections" element={
          <ProtectedRoute>
            <PlatformLayout moduleTitle="Data Connections" navCategories={dataNavCategories}>
              <DataConnections />
            </PlatformLayout>
          </ProtectedRoute>
        } />
        
        {/* Catch-all for invalid Data Management routes */}
        <Route path="*" element={
          <ProtectedRoute>
            <PlatformLayout moduleTitle="Not Found" navCategories={dataNavCategories}>
              <NotFound />
            </PlatformLayout>
          </ProtectedRoute>
        } />
      </Route>
    </>
  );
};
