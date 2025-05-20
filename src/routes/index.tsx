/** src/routes/index.tsx */
import { lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";
import ProtectedRoute   from "@/components/ProtectedRoute";
import RootHandler      from "@/components/RootHandler";
import DashboardLayout  from "@/components/layout/DashboardLayout";
import { SupplierRoutes } from "./suppliers";   // your existing factory

/* lazy-loaded pages */
const MasterDash        = lazy(() => import("@/pages/MasterDash"));
const RAGDashboardPage  = lazy(() => import("@/pages/rag-dashboard/RAGDashboardPage"));
const PrototypeSelector = lazy(() => import("@/pages/PrototypeSelector"));

/* helper to wrap routes that require auth */
const withAuth = (element: React.ReactNode) => (
  <ProtectedRoute>{element}</ProtectedRoute>
);

/* definitive app route tree */
export const appRoutes: RouteObject[] = [
  /* public */
  { path: "/", element: <RootHandler /> },

  /* dashboard area with its own layout and nested pages */
  {
    path: "/dashboard",
    element: withAuth(<DashboardLayout />),
    children: [
      { index: true,     element: <MasterDash /> },         // /dashboard
      { path: "rag",     element: <RAGDashboardPage /> },   // /dashboard/rag
      { path: "prototypes", element: <PrototypeSelector /> },// /dashboard/prototypes
      {
        path: "beta1/suppliers/*",
        element: <SupplierRoutes />,                        // /dashboard/beta1/suppliers/*
      },
      // …add more nested dashboard pages here as needed
    ],
  },

  /* catch-all → redirect to home */
  { path: "*", element: <Navigate to="/" replace /> },
];
