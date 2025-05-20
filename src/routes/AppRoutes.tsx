
import { RouteObject } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import MasterDash from "../pages/MasterDash";
import { AllAreaRoutes } from "./AllAreaRoutes";
import { Navigate } from "react-router-dom";
import { DotXLayout } from "../components/layout/DotXLayout";
import DotXDashboard from "../pages/dot-x/Dashboard"; 
import DotXDashboard2 from "../pages/dot-x/Dashboard2";
import DotXApi from "../pages/dot-x/Api";
import DotXDataServices from "../pages/dot-x/DataServices";
import DotXPlugins from "../pages/dot-x/Plugins";
import DotXSettings from "../pages/dot-x/Settings";

export const appRoutes: RouteObject[] = [
  /* Public root: decides where to send you */
  { path: "/", element: <Navigate to="/dashboard" replace /> },

  /* Dashboard area with its own layout + nested pages */
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <MasterDash /> },
      ...AllAreaRoutes(),
    ],
  },

  /* Master dashboard shortcut */
  { path: "/master", element: <Navigate to="/dashboard" replace /> },

  /* DOT-X routes */
  {
    path: "/dot-x",
    element: <DotXLayout />,
    children: [
      { index: true, element: <DotXDashboard /> },
      { path: "dot-x-2", element: <DotXDashboard2 /> },
      { path: "api", element: <DotXApi /> },
      { path: "data-services", element: <DotXDataServices /> },
      { path: "plugins", element: <DotXPlugins /> },
      { path: "settings", element: <DotXSettings /> },
      { path: "command-center", element: <DotXDashboard /> }, // Add command center route
      { path: "agents", element: <DotXDashboard /> }, // Add agents route
      { path: "reports", element: <DotXDashboard /> }, // Add reports route
      { path: "knowledge", element: <DotXDashboard /> } // Add knowledge route
    ],
  },

  /* Fallback: any unknown URL sends you home */
  { path: "*", element: <Navigate to="/" replace /> },
];
