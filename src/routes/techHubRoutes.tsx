
import { Route } from "react-router-dom";
import { TradingSystemLayout } from "@/components/layout/TradingSystemLayout";
import TechHubPersonas from "@/pages/TechHubPersonas";
import { Outlet } from "react-router-dom";

export const TechHubRoutes = () => {
  return (
    <Route path="/tech-hub" element={<TradingSystemLayout><Outlet /></TradingSystemLayout>}>
      <Route path="personas" element={<TechHubPersonas />} />
    </Route>
  );
};
