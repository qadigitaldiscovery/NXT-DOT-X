
import { Route, Routes } from "react-router-dom";
import RootHandler from "../components/RootHandler";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import MasterDash from "../pages/MasterDash";
import ProtectedRoute from "../components/ProtectedRoute";
import PrototypeSelector from "../pages/PrototypeSelector";
import RAGDashboardPage from "../pages/rag-dashboard/RAGDashboardPage";
import { SupplierRoutes } from "./suppliers";

export function AppRoutes() {
  console.log("🚗 Rendering AppRoutes");
  return (
    <Routes>
      {/* Root Route - redirects based on auth state */}
      <Route path="/" element={<RootHandler />} />
      
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

      {/* Supplier Routes */}
      <Route path="/beta1/suppliers/*" element={
        <ProtectedRoute>
          <SupplierRoutes />
        </ProtectedRoute>
      } />

      {/* Fallback - catch any other routes */}
      <Route path="*" element={<RootHandler />} />
    </Routes>
  );
}
