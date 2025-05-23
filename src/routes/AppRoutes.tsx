
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { SimpleLayout } from '@/components/layouts/SimpleLayout';

// Import pages
import MasterDash from '@/pages/MasterDash';
import Landing from '@/pages/Landing';

// Import all module routes
import { DataManagementRoutes } from './dataManagementRoutes';
import { AdminRoutes } from './adminRoutes';
import { TechHubRoutes } from './techHubRoutes';
import { LoyaltyRoutes } from './loyaltyRoutes';
import { TradingSystemRoutes } from './tradingSystemRoutes';
import { DotXRoutes } from './dotXRoutes';
import { SupplierManagementRoutes } from './supplierManagementRoutes';
import { CustomerManagementRoutes } from './customerManagementRoutes';
import { BrandMarketingRoutes } from './brandMarketingRoutes';
import { SocialMediaRoutes } from './socialMediaRoutes';
import { ProjectManagementRoutes } from './projectManagementRoutes';
import { RAGDashboardRoutes } from './ragDashboardRoutes';
import { VendorRoutes } from './vendorRoutes';
import { ContractsRoutes } from './contractsRoutes';
import { CategoriesRoutes } from './categoriesRoutes';
import { EntitiesRoutes } from './entitiesRoutes';
import { ScorecardsRoutes } from './scorecardsRoutes';
import { WorkflowsRoutes } from './workflowsRoutes';
import { AIExtractRoutes } from './aiExtractRoutes';
import { FilesRoutes } from './filesRoutes';
import { EventsRoutes } from './eventsRoutes';
import { RiskRegisterRoutes } from './riskRegisterRoutes';
import { RequestsRoutes } from './requestsRoutes';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Root redirect to master dashboard */}
      <Route path="/" element={<Navigate to="/master" replace />} />
      
      {/* Landing page (no security) */}
      <Route path="/landing" element={<Landing />} />
      
      {/* Master Dashboard (no security) */}
      <Route path="/master" element={
        <SimpleLayout>
          <MasterDash />
        </SimpleLayout>
      } />
      
      {/* All module routes (no security restrictions) */}
      <Route path="/data-management/*" element={
        <SimpleLayout>
          <DataManagementRoutes />
        </SimpleLayout>
      } />
      
      <Route path="/admin/*" element={
        <SimpleLayout>
          <AdminRoutes />
        </SimpleLayout>
      } />
      
      <Route path="/tech-hub/*" element={
        <SimpleLayout>
          <TechHubRoutes />
        </SimpleLayout>
      } />
      
      <Route path="/loyalty/*" element={
        <SimpleLayout>
          <LoyaltyRoutes />
        </SimpleLayout>
      } />
      
      <Route path="/trading-system/*" element={
        <SimpleLayout>
          <TradingSystemRoutes />
        </SimpleLayout>
      } />
      
      <Route path="/dot-x/*" element={
        <SimpleLayout>
          <DotXRoutes />
        </SimpleLayout>
      } />
      
      <Route path="/supplier-management/*" element={
        <SimpleLayout>
          <SupplierManagementRoutes />
        </SimpleLayout>
      } />
      
      <Route path="/customer-management/*" element={
        <SimpleLayout>
          <CustomerManagementRoutes />
        </SimpleLayout>
      } />
      
      <Route path="/brand-marketing/*" element={
        <SimpleLayout>
          <BrandMarketingRoutes />
        </SimpleLayout>
      } />
      
      <Route path="/social-media/*" element={
        <SimpleLayout>
          <SocialMediaRoutes />
        </SimpleLayout>
      } />
      
      <Route path="/project-management/*" element={
        <SimpleLayout>
          <ProjectManagementRoutes />
        </SimpleLayout>
      } />
      
      <Route path="/rag-dashboard/*" element={
        <SimpleLayout>
          <RAGDashboardRoutes />
        </SimpleLayout>
      } />
      
      <Route path="/vendors/*" element={
        <SimpleLayout>
          <VendorRoutes />
        </SimpleLayout>
      } />
      
      <Route path="/contracts/*" element={
        <SimpleLayout>
          <ContractsRoutes />
        </SimpleLayout>
      } />
      
      <Route path="/categories/*" element={
        <SimpleLayout>
          <CategoriesRoutes />
        </SimpleLayout>
      } />
      
      <Route path="/entities/*" element={
        <SimpleLayout>
          <EntitiesRoutes />
        </SimpleLayout>
      } />
      
      <Route path="/scorecards/*" element={
        <SimpleLayout>
          <ScorecardsRoutes />
        </SimpleLayout>
      } />
      
      <Route path="/workflows/*" element={
        <SimpleLayout>
          <WorkflowsRoutes />
        </SimpleLayout>
      } />
      
      <Route path="/ai-extract/*" element={
        <SimpleLayout>
          <AIExtractRoutes />
        </SimpleLayout>
      } />
      
      <Route path="/files/*" element={
        <SimpleLayout>
          <FilesRoutes />
        </SimpleLayout>
      } />
      
      <Route path="/events/*" element={
        <SimpleLayout>
          <EventsRoutes />
        </SimpleLayout>
      } />
      
      <Route path="/risk-register/*" element={
        <SimpleLayout>
          <RiskRegisterRoutes />
        </SimpleLayout>
      } />
      
      <Route path="/requests/*" element={
        <SimpleLayout>
          <RequestsRoutes />
        </SimpleLayout>
      } />
      
      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/master" replace />} />
    </Routes>
  );
};

export default AppRoutes;
