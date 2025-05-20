
import { Navigate, RouteObject } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import MasterDash from "../pages/MasterDash";

export const appRoutes: RouteObject[] = [
  /* Public root: decides where to send you */
  { path: "/", element: <Navigate to="/dashboard" replace /> },

  /* Dashboard area with its own layout + nested pages */
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <MasterDash /> },
    ],
  },

  /* Master dashboard shortcut */
  { path: "/master", element: <Navigate to="/dashboard" replace /> },

  /* Fallback: any unknown URL sends you home */
  { path: "*", element: <Navigate to="/" replace /> },
];
