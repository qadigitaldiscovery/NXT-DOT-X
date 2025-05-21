import { jsx as _jsx } from "react/jsx-runtime";
import { Route } from "react-router-dom";
import { PlatformLayout } from "@/components/layouts/PlatformLayout";
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
        _jsx(Route, { path: "/data-management", element: _jsx(PlatformLayout, { moduleTitle: "Data Management Dashboard", useGlobalNavigation: true, children: _jsx(DashboardHome, {}) }) }, "data-management-index"),
        _jsx(Route, { path: "/data-management/deployment-test", element: _jsx(PlatformLayout, { moduleTitle: "Deployment Test", useGlobalNavigation: true, children: _jsx(DeploymentTest, {}) }) }, "data-management-deployment-test"),
        _jsx(Route, { path: "/data-management/settings", element: _jsx(PlatformLayout, { moduleTitle: "Data Management Settings", useGlobalNavigation: true, children: _jsx(DataManagementSettings, {}) }) }, "data-management-settings"),
        _jsx(Route, { path: "/data-management/suppliers", element: _jsx(PlatformLayout, { moduleTitle: "Suppliers", useGlobalNavigation: true, children: _jsx(Suppliers, {}) }) }, "data-management-suppliers"),
        _jsx(Route, { path: "/data-management/suppliers/new", element: _jsx(PlatformLayout, { moduleTitle: "Add New Supplier", useGlobalNavigation: true, children: _jsx(NewSupplier, {}) }) }, "data-management-suppliers-new"),
        _jsx(Route, { path: "/data-management/supplier-vendors", element: _jsx(PlatformLayout, { moduleTitle: "Suppliers", useGlobalNavigation: true, children: _jsx(Suppliers, {}) }) }, "data-management-supplier-vendors"),
        _jsx(Route, { path: "/data-management/supplier-vendors/new", element: _jsx(PlatformLayout, { moduleTitle: "Add New Supplier", useGlobalNavigation: true, children: _jsx(NewSupplier, {}) }) }, "data-management-supplier-vendors-new"),
        _jsx(Route, { path: "/data-management/customers", element: _jsx(PlatformLayout, { moduleTitle: "Customers", useGlobalNavigation: true, children: _jsx(CustomersPage, {}) }) }, "data-management-customers"),
        _jsx(Route, { path: "/data-management/supplier-costing", element: _jsx(PlatformLayout, { moduleTitle: "Supplier Costing", useGlobalNavigation: true, children: _jsx(SupplierCosting, {}) }) }, "data-management-supplier-costing"),
        _jsx(Route, { path: "/data-management/cost-management", element: _jsx(PlatformLayout, { moduleTitle: "Cost Management", useGlobalNavigation: true, children: _jsx(CostDashboard, {}) }) }, "data-management-cost-management"),
        _jsx(Route, { path: "/data-management/cost-analysis", element: _jsx(PlatformLayout, { moduleTitle: "Cost Analysis", useGlobalNavigation: true, children: _jsx(CostAnalysis, {}) }) }, "data-management-cost-analysis"),
        _jsx(Route, { path: "/data-management/pricing/competitor-pricing", element: _jsx(PlatformLayout, { moduleTitle: "Competitor Pricing", useGlobalNavigation: true, children: _jsx(CompetitorPricing, {}) }) }, "data-management-pricing-competitor"),
        _jsx(Route, { path: "/data-management/pricing/price-management", element: _jsx(PlatformLayout, { moduleTitle: "Price Management", useGlobalNavigation: true, children: _jsx(PriceManagement, {}) }) }, "data-management-pricing-price-management"),
        _jsx(Route, { path: "/data-management/uploads", element: _jsx(PlatformLayout, { moduleTitle: "File Uploads", useGlobalNavigation: true, children: _jsx(UploadsPage, {}) }) }, "data-management-uploads"),
        _jsx(Route, { path: "/data-management/uploads/new", element: _jsx(PlatformLayout, { moduleTitle: "New Upload", useGlobalNavigation: true, children: _jsx(NewUploadPage, {}) }) }, "data-management-uploads-new"),
        _jsx(Route, { path: "/data-management/documents", element: _jsx(PlatformLayout, { moduleTitle: "Documents", useGlobalNavigation: true, children: _jsx(DocumentsPage, {}) }) }, "data-management-documents"),
        _jsx(Route, { path: "/data-management/export-data", element: _jsx(PlatformLayout, { moduleTitle: "Export Data", useGlobalNavigation: true, children: _jsx(ExportData, {}) }) }, "data-management-export-data"),
        _jsx(Route, { path: "/data-management/insights", element: _jsx(PlatformLayout, { moduleTitle: "Data Insights", useGlobalNavigation: true, children: _jsx(DataInsights, {}) }) }, "data-management-insights"),
        _jsx(Route, { path: "/data-management/connections", element: _jsx(PlatformLayout, { moduleTitle: "Data Connections", useGlobalNavigation: true, children: _jsx(DataConnections, {}) }) }, "data-management-connections"),
        _jsx(Route, { path: "/data-management/vendor-supplier-comparison", element: _jsx(PlatformLayout, { moduleTitle: "Supplier Comparison", useGlobalNavigation: true, children: _jsx(SupplierComparison, {}) }) }, "data-management-vendor-supplier"),
        _jsx(Route, { path: "/data-management/business-rules", element: _jsx(PlatformLayout, { moduleTitle: "Business Rules", useGlobalNavigation: true, children: _jsx(BusinessRules, {}) }) }, "data-management-business-rules"),
        _jsx(Route, { path: "/data-management/strategy", element: _jsx(PlatformLayout, { moduleTitle: "Strategy & Decisions", useGlobalNavigation: true, children: _jsx(Strategy, {}) }) }, "data-management-strategy"),
        _jsx(Route, { path: "/data-management/admin-console", element: _jsx(PlatformLayout, { moduleTitle: "System Admin Console", useGlobalNavigation: true, children: _jsx(AdminConsole, {}) }) }, "data-management-admin-console"),
        _jsx(Route, { path: "/data-management/*", element: _jsx(PlatformLayout, { moduleTitle: "Not Found", useGlobalNavigation: true, children: _jsx(NotFound, {}) }) }, "data-management-not-found")
    ];
};
