
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import RootHandler from "../components/RootHandler";
import Landing from "../pages/Landing";
import ProtectedRoute from "../components/ProtectedRoute";
import MasterDash from "../pages/MasterDash";
import RAGDashboardPage from "../pages/rag-dashboard/RAGDashboardPage";
import PrototypeSelector from "../pages/PrototypeSelector";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { AdminRoutes } from "./adminRoutes";
import { CustomerForm } from "../components/customers/CustomerForm";
import TradingSystemLayout from "../components/layout/TradingSystemLayout";
import { CustomerManagementLayout } from "../components/layout/CustomerManagementLayout";
import { SidebarProvider } from "@/components/ui/sidebar";
import Beta1Dashboard from "../pages/Beta1Dashboard";

// Temporary placeholder for Billing
function BillingPlaceholder() {
  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-semibold mb-4">Billing Page</h1>
      <p>Billing information will go here.</p>
    </div>
  );
}

export function AppRoutes() {
  console.log("🚗 Rendering AppRoutes");
  return (
    <Routes>
      {/* Public Routes */}
<<<<<<< Updated upstream
      <Route path="/landing" element={<Landing />} />
      <Route path="/unauthorized" element={<Navigate to="/landing" />} />

      {/* Root Route - redirects or shows landing page if needed */}
      <Route path="/" element={<RootHandler />} />

      {/* Protected Routes - All protected routes should be nested under DashboardLayout */}
      <Route
=======
      <Route path="/" element={<RootHandler />} />
      <Route path="/landing" element={<Landing />} />
      <Route path="/unauthorized" element={<Navigate to="/landing" />} />

      {/* Protected Routes */}
      <Route
        path="/"
>>>>>>> Stashed changes
        element={
          <ProtectedRoute>
            <SidebarProvider>
              <DashboardLayout />
            </SidebarProvider>
          </ProtectedRoute>
        }
      >
        {/* Dashboard Routes */}
<<<<<<< Updated upstream
        <Route path="/master" element={<MasterDash />} />
        <Route path="/dashboard/rag" element={<RAGDashboardPage />} />
        <Route path="/prototypes" element={<PrototypeSelector />} />
=======
        <Route path="master" element={<MasterDash />} />
        <Route path="dashboard">
          <Route path="rag" element={<RAGDashboardPage />} />
        </Route>
        <Route path="prototypes" element={<PrototypeSelector />} />

        {/* Customer Management Routes */}
        <Route path="customer-management">
          <Route path="new" element={<CustomerForm />} />
          <Route path="edit/:id" element={<CustomerForm isEditing={true} />} />
          <Route path="directory" element={
            <div className="p-8">
              <h1 className="text-2xl font-bold mb-6">Customer Directory</h1>
              {/* Customer list would go here */}
            </div>
          } />
        </Route>

        {/* Admin Routes */}
        {AdminRoutes()}

        {/* Settings Routes */}
        <Route path="settings">
          <Route path="billing" element={<BillingPlaceholder />} />
        </Route>
      </Route>

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/landing" replace />} />
>>>>>>> Stashed changes

        {/* Trading System Routes - with its own layout */}
        <Route path="/trading-system/*" element={<TradingSystemLayout />} />
        
        {/* Beta routes */}
        <Route path="/beta1" element={<Beta1Dashboard />} />

        {/* Data Management Redirects */}
        <Route 
          path="/data-management/customers" 
          element={<Navigate to="/customer-management/directory" replace />} 
        />

        {/* Settings Routes */}
        <Route path="/settings">
          <Route path="billing" element={<BillingPlaceholder />} />
        </Route>

        {/* Admin Routes */}
        {AdminRoutes()}
      </Route>
      
      {/* Customer Management Routes with their dedicated layout */}
      <Route
        element={
          <ProtectedRoute>
            <SidebarProvider>
              <CustomerManagementLayout />
            </SidebarProvider>
          </ProtectedRoute>
        }
      >
        <Route path="/customer-management">
          <Route path="new" element={<CustomerForm />} />
          <Route path="edit/:id" element={<CustomerForm isEditing={true} />} />
          <Route path="directory" element={
            <div className="p-8">
              <h1 className="text-2xl font-bold mb-6">Customer Directory</h1>
              {/* Customer list would go here */}
            </div>
          } />
        </Route>
      </Route>

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/landing" replace />} />
    </Routes>
  );
}
