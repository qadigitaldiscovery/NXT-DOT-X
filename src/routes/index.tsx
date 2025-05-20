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

// Existing imports for customer management
import { CustomerForm } from "../components/customers/CustomerForm";

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
      <Route path="/" element={<RootHandler />} />
      <Route path="/landing" element={<Landing />} />
      <Route path="/unauthorized" element={<Navigate to="/landing" />} />

      {/* Protected Routes - All protected routes should be nested under DashboardLayout */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* Dashboard Routes */}
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

        {/* Data Management Redirects */}
        <Route 
          path="data-management/customers" 
          element={<Navigate to="/customer-management/directory" replace />} 
        />

        {/* Settings Routes */}
        <Route path="settings">
          <Route path="billing" element={<BillingPlaceholder />} />
        </Route>

        {/* Admin Routes */}
        {AdminRoutes()}
      </Route>

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/landing" replace />} />
    </Routes>
  );
}
