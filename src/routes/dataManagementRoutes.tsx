
import React from 'react';
import { Route } from "react-router-dom";
import { PlatformLayout } from "@/components/layouts/PlatformLayout";
import { Users, Settings, BarChart3, FileUp, Database, Building, Calculator, LineChart, ArrowDownUp, FileDown, FileArchive, BrainCircuit, BookOpen, FileCog, ServerCog } from 'lucide-react';
import type { NavCategory } from "@/components/layout/sidebar/types";
import { navCategories } from "@/components/layout/sidebar/NavigationConfig";

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
import SupplierComparison from "@/pages/data-management/vendor-supplier-comparison";
import Suppliers from "@/pages/data-management/supplier-vendors";
import NewSupplier from "@/pages/data-management/supplier-vendors-new";
import DeploymentTest from "@/pages/data-management/DeploymentTest";
import BusinessRules from "@/pages/data-management/business-rules/BusinessRules";
import Strategy from "@/pages/data-management/business-rules/Strategy";
import AdminConsole from "@/pages/data-management/admin/AdminConsole";

export const DataManagementRoutes = () => {
  return [
    <Route key="data-management-index" path="/data-management" element={
      <PlatformLayout moduleTitle="Data Management Dashboard" useGlobalNavigation={true}>
        <DashboardHome />
      </PlatformLayout>
    } />,
    
    <Route key="data-management-deployment-test" path="/data-management/deployment-test" element={
      <PlatformLayout moduleTitle="Deployment Test" useGlobalNavigation={true}>
        <DeploymentTest />
      </PlatformLayout>
    } />,
    
    <Route key="data-management-settings" path="/data-management/settings" element={
      <PlatformLayout moduleTitle="Data Management Settings" useGlobalNavigation={true}>
        <DataManagementSettings />
      </PlatformLayout>
    } />,
    
    <Route key="data-management-suppliers" path="/data-management/suppliers" element={
      <PlatformLayout moduleTitle="Suppliers" useGlobalNavigation={true}>
        <Suppliers />
      </PlatformLayout>
    } />,
    
    <Route key="data-management-suppliers-new" path="/data-management/suppliers/new" element={
      <PlatformLayout moduleTitle="Add New Supplier" useGlobalNavigation={true}>
        <NewSupplier />
      </PlatformLayout>
    } />,
    
    <Route key="data-management-supplier-vendors" path="/data-management/supplier-vendors" element={
      <PlatformLayout moduleTitle="Suppliers" useGlobalNavigation={true}>
        <Suppliers />
      </PlatformLayout>
    } />,
    
    <Route key="data-management-supplier-vendors-new" path="/data-management/supplier-vendors/new" element={
      <PlatformLayout moduleTitle="Add New Supplier" useGlobalNavigation={true}>
        <NewSupplier />
      </PlatformLayout>
    } />,
    
    <Route key="data-management-customers" path="/data-management/customers" element={
      <PlatformLayout moduleTitle="Customers" useGlobalNavigation={true}>
        <CustomersPage />
      </PlatformLayout>
    } />,
    
    <Route key="data-management-supplier-costing" path="/data-management/supplier-costing" element={
      <PlatformLayout moduleTitle="Supplier Costing" useGlobalNavigation={true}>
        <SupplierCosting />
      </PlatformLayout>
    } />,
    
    <Route key="data-management-cost-management" path="/data-management/cost-management" element={
      <PlatformLayout moduleTitle="Cost Management" useGlobalNavigation={true}>
        <CostDashboard />
      </PlatformLayout>
    } />,
    
    <Route key="data-management-cost-analysis" path="/data-management/cost-analysis" element={
      <PlatformLayout moduleTitle="Cost Analysis" useGlobalNavigation={true}>
        <CostAnalysis />
      </PlatformLayout>
    } />,
    
    <Route key="data-management-pricing-competitor" path="/data-management/pricing/competitor-pricing" element={
      <PlatformLayout moduleTitle="Competitor Pricing" useGlobalNavigation={true}>
        <CompetitorPricing />
      </PlatformLayout>
    } />,
    
    <Route key="data-management-pricing-price-management" path="/data-management/pricing/price-management" element={
      <PlatformLayout moduleTitle="Price Management" useGlobalNavigation={true}>
        <PriceManagement />
      </PlatformLayout>
    } />,
    
    <Route key="data-management-uploads" path="/data-management/uploads" element={
      <PlatformLayout moduleTitle="File Uploads" useGlobalNavigation={true}>
        <UploadsPage />
      </PlatformLayout>
    } />,
    
    <Route key="data-management-uploads-new" path="/data-management/uploads/new" element={
      <PlatformLayout moduleTitle="New Upload" useGlobalNavigation={true}>
        <NewUploadPage />
      </PlatformLayout>
    } />,
    
    <Route key="data-management-documents" path="/data-management/documents" element={
      <PlatformLayout moduleTitle="Documents" useGlobalNavigation={true}>
        <DocumentsPage />
      </PlatformLayout>
    } />,
    
    <Route key="data-management-export-data" path="/data-management/export-data" element={
      <PlatformLayout moduleTitle="Export Data" useGlobalNavigation={true}>
        <ExportData />
      </PlatformLayout>
    } />,
    
    <Route key="data-management-insights" path="/data-management/insights" element={
      <PlatformLayout moduleTitle="Data Insights" useGlobalNavigation={true}>
        <DataInsights />
      </PlatformLayout>
    } />,
    
    <Route key="data-management-connections" path="/data-management/connections" element={
      <PlatformLayout moduleTitle="Data Connections" useGlobalNavigation={true}>
        <DataConnections />
      </PlatformLayout>
    } />,
    
    <Route key="data-management-vendor-supplier" path="/data-management/vendor-supplier-comparison" element={
      <PlatformLayout moduleTitle="Supplier Comparison" useGlobalNavigation={true}>
        <SupplierComparison />
      </PlatformLayout>
    } />,
    
    <Route key="data-management-business-rules" path="/data-management/business-rules" element={
      <PlatformLayout moduleTitle="Business Rules" useGlobalNavigation={true}>
        <BusinessRules />
      </PlatformLayout>
    } />,
    
    <Route key="data-management-strategy" path="/data-management/strategy" element={
      <PlatformLayout moduleTitle="Strategy & Decisions" useGlobalNavigation={true}>
        <Strategy />
      </PlatformLayout>
    } />,
    
    <Route key="data-management-admin-console" path="/data-management/admin-console" element={
      <PlatformLayout moduleTitle="System Admin Console" useGlobalNavigation={true}>
        <AdminConsole />
      </PlatformLayout>
    } />,
    
    <Route key="data-management-not-found" path="/data-management/*" element={
      <PlatformLayout moduleTitle="Not Found" useGlobalNavigation={true}>
        <NotFound />
      </PlatformLayout>
    } />
  ];
};
