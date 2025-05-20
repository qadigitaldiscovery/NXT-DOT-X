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
      {/* Root Route - redirects or shows landing page if needed */}
      <Route path="/" element={<RootHandler />} />

      {/* Landing Page */}
      <Route path="/landing" element={<Landing />} />

      {/* Master Dashboard */}
      <Route
        path="/master"
        element={
          <ProtectedRoute>
            <MasterDash />
          </ProtectedRoute>
        }
      />

      {/* RAG Dashboard */}
      <Route
        path="/dashboard/rag"
        element={
          <ProtectedRoute>
            <RAGDashboardPage />
          </ProtectedRoute>
        }
      />

      {/* Prototype Selector */}
      <Route
        path="/prototypes"
        element={
          <ProtectedRoute>
            <PrototypeSelector />
          </ProtectedRoute>
        }
      />

      {/* Main Dashboard Layout */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      />

      {/* Customer Management Routes */}
      <Route path="/customer-management">
        <Route
          path="new"
          element={
            <ProtectedRoute>
              <CustomerForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="edit/:id"
          element={
            <ProtectedRoute>
              <CustomerForm isEditing={true} />
            </ProtectedRoute>
          }
        />
        <Route
          path="directory"
          element={
            <ProtectedRoute>
              <div className="p-8">
                <h1 className="text-2xl font-bold mb-6">Customer Directory</h1>
                {/* Customer list would go here */}
              </div>
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Alias or redirect for data-management references from the sidebar */}
      <Route
        path="/data-management/customers"
        element={
          <ProtectedRoute>
            <Navigate to="/customer-management/directory" replace />
          </ProtectedRoute>
        }
      />

      {/* Alias or placeholder for /settings/billing */}
      <Route
        path="/settings/billing"
        element={
          <ProtectedRoute>
            <BillingPlaceholder />
          </ProtectedRoute>
        }
      />

      {/* Include the AdminRoutes array so /admin/... works properly */}
      {AdminRoutes()}

      {/* Fallback - catch any other routes */}
      <Route path="*" element={<RootHandler />} />
    </Routes>
  );
}
