import { Route } from "react-router-dom";
import MasterDash from "@/pages/MasterDash";
import NotFound from "@/pages/NotFound";
import { AllAreaRoutes } from "./AllAreaRoutes";

export default function AppRoutes() {
  return (
    <>
      <Route path="/" element={<MasterDash />} />
      {AllAreaRoutes()}
      <Route path="*" element={<NotFound />} />
    </>
  );
}