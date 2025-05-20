
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
import { CustomerDirectory } from "../components/customers/CustomerDirectory";

// Temporary placeholder for pages
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="p-6 text-white">
    <h1 className="text-2xl font-semibold mb-4">{title}</h1>
    <p>This page is under development.</p>
  </div>
);

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
          index
          element={
            <ProtectedRoute>
              <CustomerDirectory />
            </ProtectedRoute>
          }
        />
        <Route
          path="directory"
          element={
            <ProtectedRoute>
              <CustomerDirectory />
            </ProtectedRoute>
          }
        />
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
          path="history"
          element={
            <ProtectedRoute>
              <PlaceholderPage title="Customer Interaction History" />
            </ProtectedRoute>
          }
        />
        <Route
          path="analytics"
          element={
            <ProtectedRoute>
              <PlaceholderPage title="Customer Analytics" />
            </ProtectedRoute>
          }
        />
        <Route
          path="settings"
          element={
            <ProtectedRoute>
              <PlaceholderPage title="Customer Settings" />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Admin Routes - all sidebar links */}
      <Route path="/admin/users" element={<ProtectedRoute><PlaceholderPage title="User Management" /></ProtectedRoute>} />
      <Route path="/admin/roles" element={<ProtectedRoute><PlaceholderPage title="Roles & Permissions" /></ProtectedRoute>} />
      <Route path="/admin/security" element={<ProtectedRoute><PlaceholderPage title="Security Settings" /></ProtectedRoute>} />
      <Route path="/admin/reporting" element={<ProtectedRoute><PlaceholderPage title="Reporting Dashboard" /></ProtectedRoute>} />
      <Route path="/admin/localization" element={<ProtectedRoute><PlaceholderPage title="Localization Settings" /></ProtectedRoute>} />
      <Route path="/admin/documentation" element={<ProtectedRoute><PlaceholderPage title="Documentation Center" /></ProtectedRoute>} />
      <Route path="/admin/database" element={<ProtectedRoute><PlaceholderPage title="Database Administration" /></ProtectedRoute>} />
      <Route path="/admin/system-settings" element={<ProtectedRoute><PlaceholderPage title="System Settings" /></ProtectedRoute>} />
      
      {/* Account Routes */}
      <Route path="/settings/billing" element={<ProtectedRoute><PlaceholderPage title="Billing Information" /></ProtectedRoute>} />

      {/* Data Management Routes */}
      <Route
        path="/data-management/customers"
        element={
          <ProtectedRoute>
            <Navigate to="/customer-management/directory" replace />
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
