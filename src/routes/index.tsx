
import { Route, Routes } from "react-router-dom";
import RootHandler from "../components/RootHandler";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import MasterDash from "../pages/MasterDash";
import ProtectedRoute from "../components/ProtectedRoute";
import PrototypeSelector from "../pages/PrototypeSelector";
import RAGDashboardPage from "../pages/rag-dashboard/RAGDashboardPage";
import { CustomerForm } from "../components/customers/CustomerForm";
import Landing from "../pages/Landing";

export function AppRoutes() {
  console.log("🚗 Rendering AppRoutes");
  return (
    <Routes>
      {/* Root Route - redirects based on auth state */}
      <Route path="/" element={<RootHandler />} />
      
      {/* Landing Page */}
      <Route path="/landing" element={<Landing />} />
      
      {/* Master Dashboard */}
      <Route path="/master" element={
        <ProtectedRoute>
          <MasterDash />
        </ProtectedRoute>
      } />
      
      {/* RAG Dashboard */}
      <Route path="/dashboard/rag" element={
        <ProtectedRoute>
          <RAGDashboardPage />
        </ProtectedRoute>
      } />
      
      {/* Prototype Selector */}
      <Route path="/prototypes" element={
        <ProtectedRoute>
          <PrototypeSelector />
        </ProtectedRoute>
      } />
      
      {/* Main Dashboard Layout */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      } />

      {/* Customer Management Routes */}
      <Route path="/customer-management">
        <Route path="new" element={
          <ProtectedRoute>
            <CustomerForm />
          </ProtectedRoute>
        } />
        <Route path="edit/:id" element={
          <ProtectedRoute>
            <CustomerForm isEditing={true} />
          </ProtectedRoute>
        } />
        <Route path="directory" element={
          <ProtectedRoute>
            <div className="p-8">
              <h1 className="text-2xl font-bold mb-6">Customer Directory</h1>
              {/* Customer list would go here */}
            </div>
          </ProtectedRoute>
        } />
      </Route>

      {/* Fallback - catch any other routes */}
      <Route path="*" element={<RootHandler />} />
    </Routes>
  );
}
