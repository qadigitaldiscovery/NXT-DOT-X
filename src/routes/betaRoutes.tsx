import React from "react";
import Beta1Dashboard from "../pages/Beta1Dashboard";
import Beta2Dashboard from "../pages/Beta2Dashboard";
import Beta2Analytics from "../pages/Beta2Analytics";
import ModuleAutoPage from "../pages/auto/ModuleAutoPage";

export const BetaRoutes = [
  {
    path: "/beta1/dashboard",
    element: <Beta1Dashboard />,
  },
  {
    path: "/beta1/*",
    element: <ModuleAutoPage />,
  },
  {
    path: "/beta2/dashboard",
    element: <Beta2Dashboard />,
  },
  {
    path: "/beta2/analytics",
    element: <Beta2Analytics />,
  },
  {
    path: "/beta2/members",
    element: <ModuleAutoPage />,
  },
  {
    path: "/beta2/rewards",
    element: <ModuleAutoPage />,
  },
  {
    path: "/beta2/settings",
    element: <ModuleAutoPage />,
  },
  {
    path: "/beta2/*",
    element: <ModuleAutoPage />,
  },
];
