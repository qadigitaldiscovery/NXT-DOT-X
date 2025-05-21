import { RouteObject } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import MasterDash from "../pages/MasterDash";
import { Navigate } from "react-router-dom";
import RootHandler from "../components/RootHandler";

// Module dashboards
import DataManagementDashboard from "../pages/data-management/Dashboard";
import CustomerManagementDirectory from "../pages/data-management/CustomerManagementDirectory";
import SupplierManagementDirectory from "../pages/data-management/SupplierManagementDirectory";
import PriceManagement from "../pages/data-management/PriceManagement";
import CostManagement from "../pages/data-management/CostManagement";

// Import other module dashboards and their sub-pages
// ...

export const appRoutes: RouteObject[] = [
  // Root handler deciding initial redirection
  { 
    path: "/", 
    element: <RootHandler /> 
  },

  // Main dashboard with nested routing structure
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      // MasterDash is the main hub showing all modules
      { 
        index: true, 
        element: <MasterDash /> 
      },
      
      // Data Management Module and its children
      {
        path: "data-management",
        children: [
          // Data Management Dashboard (module home)
          { 
            index: true, 
            element: <DataManagementDashboard /> 
          },
          // Customer Management Directory (sub-module)
          { 
            path: "customer-management", 
            element: <CustomerManagementDirectory /> 
          },
          // Supplier Management Directory (sub-module)
          { 
            path: "supplier-management", 
            element: <SupplierManagementDirectory /> 
          },
          // Price Management (sub-module)
          { 
            path: "price-management", 
            element: <PriceManagement /> 
          },
          // Cost Management (sub-module)
          { 
            path: "cost-management", 
            element: <CostManagement /> 
          },
          // Other data management sub-modules...
        ]
      },
      
      // Tech Hub Module and its children
      {
        path: "tech-hub",
        children: [
          // Tech Hub Dashboard (module home)
          { 
            index: true, 
            element: <TechHubDashboard /> 
          },
          // API Management (sub-module)
          { 
            path: "api-management", 
            element: <ApiManagementDashboard />,
            children: [
              // Further nested sub-features
              { path: "requesty", element: <RequestyPage /> }
            ]
          },
          // Integrations (sub-module with further nesting)
          {
            path: "integrations",
            children: [
              { index: true, element: <IntegrationsHome /> },
              { path: "odoo", element: <OdooIntegration /> },
              { path: "woocommerce", element: <WooCommerceIntegration /> }
            ]
          },
          // Other tech hub sub-modules...
        ]
      },
      
      // Social Media Module and its children
      {
        path: "social-media",
        children: [
          // Social Media Dashboard (module home)
          { 
            index: true, 
            element: <SocialMediaDashboard /> 
          },
          // Accounts management (sub-module)
          { 
            path: "accounts", 
            element: <SocialMediaAccounts /> 
          },
          // Calendar (sub-module)
          { 
            path: "calendar", 
            element: <SocialMediaCalendar /> 
          },
          // Other social media sub-modules...
        ]
      },
      
      // Add other top-level modules following the same pattern
      // ...
    ]
  },

  // Shortcut to dashboard
  { 
    path: "/master", 
    element: <Navigate to="/dashboard" replace /> 
  },

  // Fallback route
  { 
    path: "*", 
    element: <Navigate to="/" replace /> 
  },
];