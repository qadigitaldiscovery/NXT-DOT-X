
import React from "react";
import { Route } from "react-router-dom";
import { Outlet } from "react-router-dom";
import TechHubPersonas from "@/pages/TechHubPersonas";
import TechHubApiManagement from "@/pages/APIsPage";
import TechHubTechnicalConfig from "@/pages/TechHubTechnicalConfig";
import RequestyPage from "@/pages/RequestyPage";
import TechHubLayout from "@/components/layout/TechHubLayout";
import OdooIntegrationWrapper from "@/components/integrations/odoo/OdooIntegrationWrapper";
import WooCommerceWrapper from "@/components/integrations/woocommerce/WooCommerceWrapper";
import BlackBoxAIService from "@/components/cloud-services/BlackBoxAIService";
import NotFound from "@/pages/NotFound";

export const TechHubRoutes = () => {
  return [
    <Route 
      key="tech-hub-layout"
      path="/tech-hub" 
      element={<TechHubLayout />}
    >
      <Route index element={<TechHubPersonas />} />
      <Route path="personas" element={<TechHubPersonas />} />
      <Route path="technical-config" element={<TechHubTechnicalConfig />} />
      <Route path="api-management" element={<TechHubApiManagement />} />
      <Route path="api-management/requesty" element={<RequestyPage />} />
      <Route path="integrations" element={<Outlet />}>
        <Route index element={<div className="p-6 text-center">Select an integration from the menu</div>} />
        <Route path="odoo" element={<OdooIntegrationWrapper />} />
        <Route path="woocommerce" element={<WooCommerceWrapper />} />
      </Route>
      <Route path="cloud-services" element={<Outlet />}>
        <Route index element={<div className="p-6 text-center">Cloud Services - Feature coming soon</div>} />
        <Route path="blackbox-ai" element={<BlackBoxAIService />} />
      </Route>
      <Route path="settings" element={<div className="p-6 text-center">Tech Hub Settings - Feature coming soon</div>} />
      <Route path="database" element={<div className="p-6 text-center">Database Admin - Feature coming soon</div>} />
      <Route path="documentation" element={<div className="p-6 text-center">Documentation - Feature coming soon</div>} />
      <Route path="activity" element={<div className="p-6 text-center">Activity Logs - Feature coming soon</div>} />
      <Route path="support" element={<div className="p-6 text-center">Tech Hub Support - Feature coming soon</div>} />
      <Route path="rag-dashboard" element={<div className="p-6 text-center">RAG Dashboard - Feature coming soon</div>} />
      <Route path="*" element={<NotFound />} />
    </Route>
  ];
};
