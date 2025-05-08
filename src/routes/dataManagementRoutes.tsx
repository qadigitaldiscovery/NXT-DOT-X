
import { Route, Navigate } from "react-router-dom";
import PermissionGuard from "@/components/PermissionGuard";
import { DashboardLayout } from '@/components/layout/DashboardLayout';

// Import Data Management pages
import DataManagementDashboard from "@/pages/DataManagementDashboard";
import SupplierCosting from "@/pages/SupplierCosting";
import CostAnalysis from "@/pages/CostAnalysis";
import CompetitorPricing from "@/pages/CompetitorPricing";
import PriceManagement from "@/pages/PriceManagement";
import ExportData from "@/pages/ExportData";
import SuppliersPage from "@/pages/SuppliersPage";
import NewSupplierPage from "@/pages/NewSupplierPage";
import EditSupplierPage from "@/pages/EditSupplierPage";
import SupplierCostsPage from "@/pages/SupplierCostsPage";
import UploadsPage from "@/pages/UploadsPage";
import NewUploadPage from "@/pages/NewUploadPage";
import DataManagementSettings from "@/pages/DataManagementSettings";
import APIsPage from "@/pages/APIsPage";

export const DataManagementRoutes = () => {
  return (
    <>
      {/* Data Management Module Routes */}
      <Route path="/data-management" element={
        <PermissionGuard requiredPermission="modules.data">
          <DashboardLayout>
            <DataManagementDashboard />
          </DashboardLayout>
        </PermissionGuard>
      } />
      
      <Route path="/data-management/supplier-costing" element={
        <PermissionGuard requiredPermission="modules.data">
          <DashboardLayout>
            <SupplierCosting />
          </DashboardLayout>
        </PermissionGuard>
      } />
      
      {/* Direct path for supplier-costing for backward compatibility */}
      <Route path="/supplier-costing" element={
        <PermissionGuard requiredPermission="modules.data">
          <DashboardLayout>
            <SupplierCosting />
          </DashboardLayout>
        </PermissionGuard>
      } />
      
      <Route path="/data-management/suppliers" element={
        <PermissionGuard requiredPermission="modules.data">
          <DashboardLayout>
            <SuppliersPage />
          </DashboardLayout>
        </PermissionGuard>
      } />
      
      <Route path="/data-management/suppliers/new" element={
        <PermissionGuard requiredPermission="modules.data">
          <DashboardLayout>
            <NewSupplierPage />
          </DashboardLayout>
        </PermissionGuard>
      } />
      
      <Route path="/data-management/suppliers/:id" element={
        <PermissionGuard requiredPermission="modules.data">
          <DashboardLayout>
            <EditSupplierPage />
          </DashboardLayout>
        </PermissionGuard>
      } />
      
      <Route path="/data-management/suppliers/:id/costs" element={
        <PermissionGuard requiredPermission="modules.data">
          <DashboardLayout>
            <SupplierCostsPage />
          </DashboardLayout>
        </PermissionGuard>
      } />
      
      <Route path="/data-management/uploads" element={
        <PermissionGuard requiredPermission="modules.data">
          <DashboardLayout>
            <UploadsPage />
          </DashboardLayout>
        </PermissionGuard>
      } />
      
      <Route path="/data-management/uploads/new" element={
        <PermissionGuard requiredPermission="modules.data">
          <DashboardLayout>
            <NewUploadPage />
          </DashboardLayout>
        </PermissionGuard>
      } />
      
      <Route path="/data-management/cost-analysis" element={
        <PermissionGuard requiredPermission="modules.data">
          <DashboardLayout>
            <CostAnalysis />
          </DashboardLayout>
        </PermissionGuard>
      } />
      
      <Route path="/data-management/competitor-pricing" element={
        <PermissionGuard requiredPermission="modules.data">
          <DashboardLayout>
            <CompetitorPricing />
          </DashboardLayout>
        </PermissionGuard>
      } />
      
      <Route path="/data-management/price-management" element={
        <PermissionGuard requiredPermission="modules.data">
          <DashboardLayout>
            <PriceManagement />
          </DashboardLayout>
        </PermissionGuard>
      } />
      
      <Route path="/data-management/exports" element={
        <PermissionGuard requiredPermission="modules.data">
          <DashboardLayout>
            <ExportData />
          </DashboardLayout>
        </PermissionGuard>
      } />
      
      <Route path="/data-management/settings" element={
        <PermissionGuard requiredPermission="modules.data">
          <DashboardLayout>
            <DataManagementSettings />
          </DashboardLayout>
        </PermissionGuard>
      } />
      
      <Route path="/data-management/apis" element={
        <PermissionGuard requiredPermission="modules.data">
          <DashboardLayout>
            <APIsPage />
          </DashboardLayout>
        </PermissionGuard>
      } />
      
      {/* Legacy routes for Data Management - redirect to new structure */}
      <Route path="/beta1" element={<Navigate to="/data-management" replace />} />
      <Route path="/cost-analysis" element={<Navigate to="/data-management/cost-analysis" replace />} />
      <Route path="/competitor-pricing" element={<Navigate to="/data-management/competitor-pricing" replace />} />
      <Route path="/price-management" element={<Navigate to="/data-management/price-management" replace />} />
      <Route path="/export-data" element={<Navigate to="/data-management/exports" replace />} />
    </>
  );
};
