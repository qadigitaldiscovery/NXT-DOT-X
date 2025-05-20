/** SINGLE SOURCE OF TRUTH – ROUTES */
import { lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";
import ProtectedRoute   from "@/components/ProtectedRoute";
import RootHandler      from "@/components/RootHandler";
import DashboardLayout  from "@/components/layout/DashboardLayout";
import { SupplierRoutes } from "./suppliers";     // keep your old factory

/* lazy top-level pages */
const MasterDash        = lazy(() => import("@/pages/MasterDash"));
const RAGDashboardPage  = lazy(() => import("@/pages/rag-dashboard/RAGDashboardPage"));
const PrototypeSelector = lazy(() => import("@/pages/PrototypeSelector"));

/* auth wrapper helper */
const withAuth = (el: React.ReactNode) => <ProtectedRoute>{el}</ProtectedRoute>;

/* definitive route array */
export const appRoutes: RouteObject[] = [
  { path: "/",          element: <RootHandler /> },
  { path: "/master",    element: withAuth(<MasterDash />) },
  { path: "/dashboard/rag", element: withAuth(<RAGDashboardPage />) },
  { path: "/prototypes",    element: withAuth(<PrototypeSelector />) },

  /* dashboard layout wrapper */
  {
    path: "/dashboard/*",
    element: withAuth(<DashboardLayout />),
  },

  /* suppliers subtree (unchanged) */
  {
    path: "/beta1/suppliers/*",
    element: withAuth(<SupplierRoutes />),
  },

  /* fallback → home */
  { path: "*", element: <Navigate to="/" replace /> },
];
