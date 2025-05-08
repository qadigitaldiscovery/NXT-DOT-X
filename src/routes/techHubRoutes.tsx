
import { Route } from "react-router-dom";
import { TradingSystemLayout } from "@/components/layout/TradingSystemLayout";
import TechHubPersonas from "@/pages/TechHubPersonas";
import { Outlet } from "react-router-dom";
import TechHubApiManagement from "@/pages/APIsPage";

export const TechHubRoutes = () => {
  return (
    <Route path="/tech-hub" element={<TradingSystemLayout><Outlet /></TradingSystemLayout>}>
      <Route index element={<TechHubPersonas />} />
      <Route path="personas" element={<TechHubPersonas />} />
      <Route path="api-management" element={<TechHubApiManagement />} />
      <Route path="cloud-services" element={<div className="p-6 text-center">Cloud Services - Feature coming soon</div>} />
      <Route path="settings" element={<div className="p-6 text-center">Tech Hub Settings - Feature coming soon</div>} />
    </Route>
  );
};
