
import { Route } from "react-router-dom";
import TechHubPersonas from "@/pages/TechHubPersonas";
import { Outlet } from "react-router-dom";
import TechHubApiManagement from "@/pages/APIsPage";
import { TechHubLayout } from "@/components/layout/TechHubLayout";
import RequestyPage from "@/pages/RequestyPage";
import TechHubTechnicalConfig from "@/pages/TechHubTechnicalConfig";

export const TechHubRoutes = () => {
  return (
    <Route path="/tech-hub" element={<TechHubLayout><Outlet /></TechHubLayout>}>
      <Route index element={<TechHubPersonas />} />
      <Route path="personas" element={<TechHubPersonas />} />
      <Route path="technical-config" element={<TechHubTechnicalConfig />} />
      <Route path="api-management" element={<TechHubApiManagement />} />
      <Route path="api-management/requesty" element={<RequestyPage />} />
      <Route path="cloud-services" element={<Outlet />}>
        <Route index element={<div className="p-6 text-center">Cloud Services - Feature coming soon</div>} />
        <Route path="blackbox-ai" element={<div className="p-6">BlackBox AI Service</div>} />
      </Route>
      <Route path="settings" element={<div className="p-6 text-center">Tech Hub Settings - Feature coming soon</div>} />
    </Route>
  );
};
