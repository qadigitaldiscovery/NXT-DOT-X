
import React from "react";
import { Route } from "react-router-dom";
import DotXLayout from "../components/layout/DotXLayout";
import DotXDashboard from "../pages/dot-x/Dashboard";
import DotXDashboard2 from "../pages/dot-x/Dashboard2";
import DotXApi from "../pages/dot-x/Api";
import DotXDataServices from "../pages/dot-x/DataServices";
import DotXPlugins from "../pages/dot-x/Plugins";
import DotXSettings from "../pages/dot-x/Settings";
import NotFound from "../pages/NotFound";

export const DotXRoutes = () => {
  return [
    <Route 
      key="dot-x"
      path="/dot-x" 
      element={<DotXLayout />}
    >
      <Route index element={<DotXDashboard />} />
      <Route path="dot-x-2" element={<DotXDashboard2 />} />
      <Route path="api" element={<DotXApi />} />
      <Route path="data-services" element={<DotXDataServices />} />
      <Route path="plugins" element={<DotXPlugins />} />
      <Route path="settings" element={<DotXSettings />} />
      <Route path="command-center" element={<DotXDashboard />} />
      <Route path="agents" element={<DotXDashboard />} />
      <Route path="reports" element={<DotXDashboard />} />
      <Route path="knowledge" element={<DotXDashboard />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  ];
};
