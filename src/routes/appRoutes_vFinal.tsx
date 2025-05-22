
import { Routes, Route } from "react-router-dom";
import MasterDash from "@/pages/MasterDash";
import MasterCopy1 from "@/pages/MasterCopy-1";
import SideBarHeaderTemplate from "@/pages/SideBarHeaderTemplate";
import TestMasterDash from "@/pages/TestMasterDash";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import NoSidebarLayout from "@/components/layout/NoSidebarLayout";

// Import other layouts
import CustomerManagementLayout from "@/components/layout/CustomerManagementLayout";
import SupplierManagementLayout from "@/components/layout/SupplierManagementLayout";
import TechHubLayout from "@/components/layout/TechHubLayout";
import LoyaltyLayout from "@/components/layout/LoyaltyLayout";
import AdminLayout from "@/components/layout/AdminLayout";

// Not found component
const NotFound = () => (
  <div className="flex items-center justify-center h-screen bg-gray-100">
    <div className="text-center p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-xl mb-4">Page Not Found</p>
      <p className="text-gray-600 mb-6">The page you are looking for does not exist.</p>
    </div>
  </div>
);

export default function AppRoutes() {
  return (
    <Routes>
      {/* Root Routes */}
      <Route path="/" element={<MasterDash />} />
      <Route path="/master" element={<MasterDash />} />
      <Route path="/master-copy" element={<MasterCopy1 />} />
      <Route path="/sidebar-template" element={<SideBarHeaderTemplate />} />
      
      {/* Test Master Dashboard with No Sidebar */}
      <Route path="/test-master" element={<NoSidebarLayout />}>
        <Route index element={<TestMasterDash />} />
      </Route>

      {/* Dashboard Layout */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<MasterDash />} />
      </Route>

      {/* Customer Management Routes */}
      <Route path="/customer-management/*" element={<CustomerManagementLayout />} />
      
      {/* Supplier Management Routes */}
      <Route path="/supplier-management/*" element={<SupplierManagementLayout />} />
      
      {/* Tech Hub Routes */}
      <Route path="/tech-hub/*" element={<TechHubLayout />} />

      {/* Loyalty Program Routes */}
      <Route path="/loyalty/*" element={<LoyaltyLayout />} />

      {/* Admin Routes */}
      <Route path="/admin/*" element={<AdminLayout />} />
      
      {/* Catch-all route for 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
