import { Routes, Route, Navigate } from "react-router-dom";

// Layouts
import DashboardLayout from "../components/layout/DashboardLayout";

// Core Pages
import RootHandler from "../components/RootHandler";
import MasterDash from "../pages/MasterDash";

// Explicitly managed route modules
import { DataManagementRoutes } from "./dataManagementRoutes";
import { SocialMediaRoutes } from "./socialMediaRoutes";
import { TechHubRoutes } from "./techHubRoutes";
import { DotXRoutes } from "./dotXRoutes";

// Legacy grouped routes
import { AllAreaRoutes } from "./AllAreaRoutes";

// Fallback UI
const NotFound = () => (
  <div className="p-10 text-center text-red-600 text-xl">
    404 – Page Not Found
  </div>
);

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RootHandler />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<MasterDash />} />
        {AllAreaRoutes()}
        {DataManagementRoutes()}
        {SocialMediaRoutes()}
        {TechHubRoutes()}
        {DotXRoutes()}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}