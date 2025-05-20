import { lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";
import ProtectedRoute   from "@/components/ProtectedRoute";
import RootHandler      from "@/components/RootHandler";
import DashboardLayout  from "@/components/layout/DashboardLayout";
import { SupplierRoutes } from "./suppliers";   // ← keep your existing factory

/* ---- lazy pages ---- */
const MasterDash        = lazy(() => import("@/pages/MasterDash"));
const RAGDashboardPage  = lazy(() => import("@/pages/rag-dashboard/RAGDashboardPage"));
const PrototypeSelector = lazy(() => import("@/pages/PrototypeSelector"));

/* ---- helper wrapper ---- */
const withAuth = (element: React.ReactNode) => (
  <ProtectedRoute>{element}</ProtectedRoute>
);

/* ---- single route array ---- */
export const appRoutes: RouteObject[] = [
  { path: "/",          element: <RootHandler /> },
  { path: "/master",    element: withAuth(<MasterDash />) },
  { path: "/dashboard/rag", element: withAuth(<RAGDashboardPage />) },
  { path: "/prototypes",    element: withAuth(<PrototypeSelector />) },

  /* dashboard layout with all nested pages inside it */
  {
    path: "/dashboard/*",
    element: withAuth(<DashboardLayout />),
  },

  /* supplier area – reuse your old factory unchanged */
  {
    path: "/beta1/suppliers/*",
    element: withAuth(<SupplierRoutes />),
  },

  /* fallback */
  { path: "*", element: <Navigate to="/" replace /> },
];
