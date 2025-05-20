/** src/routes/index.tsx */
import { lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";
import ProtectedRoute   from "@/components/ProtectedRoute";
import RootHandler      from "@/components/RootHandler";
import DashboardLayout  from "@/components/layout/DashboardLayout";
import { SupplierRoutes } from "./suppliers";           // your existing factory
import { AllAreaRoutes }  from "./AllAreaRoutes";      // aggregator of all other *Routes()

/* lazy-loaded pages */
const MasterDash        = lazy(() => import("@/pages/MasterDash"));
const RAGDashboardPage  = lazy(() => import("@/pages/rag-dashboard/RAGDashboardPage"));
const PrototypeSelector = lazy(() => import("@/pages/PrototypeSelector"));

/* Wrap any element that needs auth */
const withAuth = (el: React.ReactNode) => (
  <ProtectedRoute>{el}</ProtectedRoute>
);

export const appRoutes: RouteObject[] = [
  /* Public root: decides where to send you */
  { path: "/", element: <RootHandler /> },

  /* Dashboard area with its own layout + nested pages */
  {
    path: "/dashboard",
    element: withAuth(<DashboardLayout />),
    children: [
      { index: true,          element: <MasterDash /> },         // /dashboard
      { path: "rag",          element: <RAGDashboardPage /> },   // /dashboard/rag
      { path: "prototypes",   element: <PrototypeSelector /> },   // /dashboard/prototypes
      {
        path: "beta1/suppliers/*",
        element: <SupplierRoutes />,                            // /dashboard/beta1/suppliers/*
      },

      /* Spread in every other area’s routes here */
      ...AllAreaRoutes(),
    ],
  },

  /* Fallback: any unknown URL sends you home */
  { path: "*", element: <Navigate to="/" replace /> },
];
