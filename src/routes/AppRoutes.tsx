
import React from "react";
import { Routes, Route } from "react-router-dom";
import { VendorRoutes } from "./vendorRoutes";
import { DataManagementRoutes } from "./dataManagementRoutes";
import { SupplierManagementRoutes } from "./supplierManagementRoutes";
import { BetaRoutes } from "./betaRoutes";
import MasterDash from "@/pages/MasterDash";
import NotFound from "@/pages/NotFound";

// Auto-generated pages
import AIExtractPage from "@/pages/auto/AIExtractPage";
import CategoriesPage from "@/pages/auto/CategoriesPage";
import ContractsPage from "@/pages/auto/ContractsPage";
import EntitiesPage from "@/pages/auto/EntitiesPage";
import EventsPage from "@/pages/auto/EventsPage";
import FilesPage from "@/pages/auto/FilesPage";
import RequestsPage from "@/pages/auto/RequestsPage";
import RiskRegisterPage from "@/pages/auto/RiskRegisterPage";
import ScorecardsPage from "@/pages/auto/ScorecardsPage";
import WorkflowsPage from "@/pages/auto/WorkflowsPage";
import VendorsPage from "@/pages/auto/VendorsPage";
import ModuleAutoPage from "@/pages/auto/ModuleAutoPage";

// Dashboard V2
import DashboardV2Page from "@/pages/DashboardV2Page";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Master Dashboard at root path */}
      <Route path="/" element={<MasterDash />} />
      <Route path="/master" element={<MasterDash />} />
      
      {/* Beta Routes */}
      {BetaRoutes()}
      
      {/* Dashboard V2 */}
      <Route path="/dashboard/v2" element={<DashboardV2Page />} />
      <Route path="/dashboard/rag" element={<ModuleAutoPage />} />
      
      {/* Auto-generated page routes */}
      <Route path="/ai-extract" element={<AIExtractPage />} />
      <Route path="/ai-extract/*" element={<AIExtractPage />} />
      
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/categories/*" element={<CategoriesPage />} />
      
      <Route path="/contracts" element={<ContractsPage />} />
      <Route path="/contracts/*" element={<ContractsPage />} />
      
      <Route path="/entities" element={<EntitiesPage />} />
      <Route path="/entities/*" element={<EntitiesPage />} />
      
      <Route path="/events" element={<EventsPage />} />
      <Route path="/events/*" element={<EventsPage />} />
      
      <Route path="/files" element={<FilesPage />} />
      <Route path="/files/*" element={<FilesPage />} />
      
      <Route path="/requests" element={<RequestsPage />} />
      <Route path="/requests/*" element={<RequestsPage />} />
      
      <Route path="/risk-register" element={<RiskRegisterPage />} />
      <Route path="/risk-register/*" element={<RiskRegisterPage />} />
      
      <Route path="/scorecards" element={<ScorecardsPage />} />
      <Route path="/scorecards/*" element={<ScorecardsPage />} />
      
      <Route path="/workflows" element={<WorkflowsPage />} />
      <Route path="/workflows/*" element={<WorkflowsPage />} />
      
      <Route path="/vendors" element={<VendorsPage />} />
      <Route path="/vendors/*" element={<VendorsPage />} />
      
      {/* Social Media Routes */}
      <Route path="/social-media" element={<ModuleAutoPage />} />
      <Route path="/social-media/*" element={<ModuleAutoPage />} />
      
      {/* DOT-X Routes */}
      <Route path="/dot-x" element={<ModuleAutoPage />} />
      <Route path="/dot-x/*" element={<ModuleAutoPage />} />
      
      {/* Tech Hub Routes */}
      <Route path="/tech-hub/personas" element={<ModuleAutoPage />} />
      <Route path="/tech-hub/integrations/*" element={<ModuleAutoPage />} />
      <Route path="/tech-hub/cloud-services/*" element={<ModuleAutoPage />} />
      
      {/* Trading System Routes */}
      <Route path="/trading-system" element={<ModuleAutoPage />} />
      <Route path="/trading-system/*" element={<ModuleAutoPage />} />
      
      {/* Admin Routes */}
      <Route path="/admin/*" element={<ModuleAutoPage />} />
      
      {/* Brand Marketing Routes */}
      <Route path="/brand-marketing/*" element={<ModuleAutoPage />} />
      
      {/* AI Army Routes */}
      <Route path="/ai-army/*" element={<ModuleAutoPage />} />
      
      {/* Project Management Routes */}
      <Route path="/projects" element={<ModuleAutoPage />} />
      
      {/* All module routes */}
      {VendorRoutes()}
      {DataManagementRoutes()}
      {SupplierManagementRoutes()}
      
      {/* Catch-all route for undefined paths */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
