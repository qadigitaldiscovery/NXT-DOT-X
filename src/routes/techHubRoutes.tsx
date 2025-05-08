
import { Route } from "react-router-dom";
import { TradingSystemLayout } from "@/components/layout/TradingSystemLayout";
import TechHubPersonas from "@/pages/TechHubPersonas";

export const TechHubRoutes = () => {
  return (
    <Route path="/tech-hub" element={<TradingSystemLayout />}>
      <Route path="personas" element={<TechHubPersonas />} />
    </Route>
  );
};
