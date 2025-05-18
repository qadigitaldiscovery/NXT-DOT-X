import React from 'react';
import { Route, Routes } from "react-router-dom";
import { PlatformLayout } from '@/components/layouts/PlatformLayout';
import { Users, Settings, BarChart3, FileUp, Home, Database, Building, Calculator, LineChart, ArrowDownUp, FileDown, FileArchive, BrainCircuit, Server } from 'lucide-react';
import type { NavCategory } from '@/components/layout/sidebar/types';
import { navCategories as globalNavCategories } from '@/components/layout/sidebar/NavigationConfig';

// Data Management Pages
import DashboardHome from '@/pages/data-management/DashboardHome';
import CostDashboard from '@/pages/data-management/cost-management/CostDashboard';
import CostAnalysis from '@/pages/data-management/cost-management/CostAnalysis';
import SupplierCosting from '@/pages/data-management/cost-management/SupplierCosting';
import CompetitorPricing from '@/pages/data-management/pricing/CompetitorPricing';
import PriceManagement from '@/pages/data-management/pricing/PriceManagement';
import UploadsPage from '@/pages/UploadsPage';
import NewUploadPage from '@/pages/NewUploadPage';
import DocumentsPage from '@/pages/data-management/documents/DocumentsPage';
import SuppliersPage from '@/pages/SuppliersPage';
import DataManagementSettings from '@/pages/DataManagementSettings';
import NotFound from '@/pages/NotFound';

// Import Beta pages that need to be integrated
import DataInsights from '@/pages/data-management/insights/DataInsights';
import DataConnections from '@/pages/data-management/connections/DataConnections';
import ExportData from '@/pages/data-management/data/ExportData';
import CustomersPage from '@/pages/data-management/customers/CustomersPage';
import SupplierComparison from '@/pages/data-management/vendor-supplier-comparison';
import Suppliers from '@/pages/data-management/supplier-vendors';
import NewSupplier from '@/pages/data-management/supplier-vendors-new';
import DeploymentTest from '@/pages/data-management/DeploymentTest';

// Filter the data management category from global navigation
const dataManagementCategory = globalNavCategories.find(category => category.label === "Data Management");

export const dataNavCategories: NavCategory[] = dataManagementCategory ? [dataManagementCategory] : [
  {
    name: "DATA MANAGEMENT",
    label: "DATA MANAGEMENT",
    items: [
      { label: 'Dashboard', icon: Database, path: '/data-management' },
      { label: 'Suppliers', icon: Building, path: '/data-management/suppliers' },
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

export const DataManagementRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={
        <PlatformLayout moduleTitle="Data Management Dashboard" useGlobalNavigation={true}>
          <DashboardHome />
        </PlatformLayout>
      } />
      
      <Route path="deployment-test" element={
        <PlatformLayout moduleTitle="Deployment Test" useGlobalNavigation={true}>
          <DeploymentTest />
        </PlatformLayout>
      } />
      
      <Route path="settings" element={
        <PlatformLayout moduleTitle="Data Management Settings" useGlobalNavigation={true}>
          <DataManagementSettings />
        </PlatformLayout>
      } />
      
      <Route path="suppliers" element={
        <PlatformLayout moduleTitle="Suppliers" useGlobalNavigation={true}>
          <Suppliers />
        </PlatformLayout>
      } />
      
      <Route path="suppliers/new" element={
        <PlatformLayout moduleTitle="Add New Supplier" useGlobalNavigation={true}>
          <NewSupplier />
        </PlatformLayout>
      } />
      
      <Route path="supplier-vendors" element={
        <PlatformLayout moduleTitle="Suppliers" useGlobalNavigation={true}>
          <Suppliers />
        </PlatformLayout>
      } />
      
      <Route path="supplier-vendors/new" element={
        <PlatformLayout moduleTitle="Add New Supplier" useGlobalNavigation={true}>
          <NewSupplier />
        </PlatformLayout>
      } />
      
      <Route path="customers" element={
        <PlatformLayout moduleTitle="Customers" useGlobalNavigation={true}>
          <CustomersPage />
        </PlatformLayout>
      } />
      
      <Route path="supplier-costing" element={
        <PlatformLayout moduleTitle="Supplier Costing" useGlobalNavigation={true}>
          <SupplierCosting />
        </PlatformLayout>
      } />
      
      <Route path="cost-management" element={
        <PlatformLayout moduleTitle="Cost Management" useGlobalNavigation={true}>
          <CostDashboard />
        </PlatformLayout>
      } />
      
      <Route path="cost-analysis" element={
        <PlatformLayout moduleTitle="Cost Analysis" useGlobalNavigation={true}>
          <CostAnalysis />
        </PlatformLayout>
      } />
      
      <Route path="pricing/competitor-pricing" element={
        <PlatformLayout moduleTitle="Competitor Pricing" useGlobalNavigation={true}>
          <CompetitorPricing />
        </PlatformLayout>
      } />
      
      <Route path="pricing/price-management" element={
        <PlatformLayout moduleTitle="Price Management" useGlobalNavigation={true}>
          <PriceManagement />
        </PlatformLayout>
      } />
      
      <Route path="uploads" element={
        <PlatformLayout moduleTitle="File Uploads" useGlobalNavigation={true}>
          <UploadsPage />
        </PlatformLayout>
      } />
      
      <Route path="uploads/new" element={
        <PlatformLayout moduleTitle="New Upload" useGlobalNavigation={true}>
          <NewUploadPage />
        </PlatformLayout>
      } />
      
      <Route path="uploads/holding" element={
        <PlatformLayout moduleTitle="Upload Holding" useGlobalNavigation={true}>
          <UploadsPage />
        </PlatformLayout>
      } />
      
      <Route path="uploads/bulk-import" element={
        <PlatformLayout moduleTitle="Bulk Import" useGlobalNavigation={true}>
          <UploadsPage />
        </PlatformLayout>
      } />
      
      <Route path="documents" element={
        <PlatformLayout moduleTitle="Documents" useGlobalNavigation={true}>
          <DocumentsPage />
        </PlatformLayout>
      } />
      
      <Route path="export-data" element={
        <PlatformLayout moduleTitle="Export Data" useGlobalNavigation={true}>
          <ExportData />
        </PlatformLayout>
      } />
      
      <Route path="insights" element={
        <PlatformLayout moduleTitle="Data Insights" useGlobalNavigation={true}>
          <DataInsights />
        </PlatformLayout>
      } />
      
      <Route path="connections" element={
        <PlatformLayout moduleTitle="Data Connections" useGlobalNavigation={true}>
          <DataConnections />
        </PlatformLayout>
      } />
      
      <Route path="vendor-supplier-comparison" element={
        <PlatformLayout moduleTitle="Supplier Comparison" useGlobalNavigation={true}>
          <SupplierComparison />
        </PlatformLayout>
      } />
      
      <Route path="*" element={
        <PlatformLayout moduleTitle="Not Found" useGlobalNavigation={true}>
          <NotFound />
        </PlatformLayout>
      } />
    </Routes>
  );
};
