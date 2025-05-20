
import { Navigate, RouteObject } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import MasterDash from "../pages/MasterDash";
import DataManagementDashboard from "../pages/DataManagementDashboard";

export const appRoutes: RouteObject[] = [
  /* Public root: decides where to send you */
  { path: "/", element: <Navigate to="/dashboard" replace /> },

  /* Dashboard area with its own layout + nested pages */
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <MasterDash /> },
      {
        path: 'data-management',
        element: <DataManagementDashboard />, 
      },
      {
        path: '/social-media',
        element: <div>Social Media Module</div>, // Replace with actual component
      },
      {
        path: '/brand-marketing',
        element: <div>Brand Marketing Module</div>, // Replace with actual component
      },
      {
        path: '/trading-system',
        element: <div>Trading System Module</div>, // Replace with actual component
      },
      {
        path: '/project-management',
        element: <div>Project Management Module</div>, // Replace with actual component
      },
      {
        path: '/dot-x',
        element: <div>DotX Module</div>, // Replace with actual component
      },
      {
        path: '/tech-hub',
        element: <div>Tech Hub Module</div>, // Replace with actual component
      },
      {
        path: '/communications',
        element: <div>Communications Module</div>, // Replace with actual component
      },
      {
        path: '/automation-workflow',
        element: <div>Automation Workflow Module</div>, // Replace with actual component
      },
      {
        path: '/operations',
        element: <div>Operations Module</div>, // Replace with actual component
      },
      {
        path: '/web-services',
        element: <div>Web Services Module</div>, // Replace with actual component
      },
    ],
  },
  /* Master dashboard shortcut */
  { path: "/master", element: <Navigate to="/dashboard" replace /> },

  /* Fallback: any unknown URL sends you home */
  { path: "*", element: <Navigate to="/" replace /> },
];
