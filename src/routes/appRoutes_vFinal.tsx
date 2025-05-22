
import { Routes, Route } from "react-router-dom";
import MasterDash from "@/pages/MasterDash";
import MasterCopy1 from "@/pages/MasterCopy-1";
import SideBarHeaderTemplate from "@/pages/SideBarHeaderTemplate";
import TestMasterDash from "@/pages/TestMasterDash";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import NoSidebarLayout from "@/components/layout/NoSidebarLayout";
import WebDevModule from "@/pages/WebDevModule";

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
      
      {/* WebDev Module */}
      <Route path="/webdev" element={<WebDevModule />} />
      
      {/* Test Master Dashboard with No Sidebar */}
      <Route path="/test-master" element={<NoSidebarLayout />}>
        <Route index element={<TestMasterDash />} />
      </Route>

      {/* Dashboard Layout */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<MasterDash />} />
      </Route>
      
      {/* Catch-all route for 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
