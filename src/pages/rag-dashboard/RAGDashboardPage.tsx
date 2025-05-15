
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardProvider } from '@/components/rag-dashboard/providers/DashboardProvider';
import { DashboardHeader } from '@/components/rag-dashboard/dashboard/DashboardHeader';
import { ModulesGrid } from '@/components/rag-dashboard/dashboard/ModulesGrid';
import { DashboardFilters } from '@/components/rag-dashboard/dashboard/DashboardFilters';
import { DashboardDialogs } from '@/components/rag-dashboard/dashboard/DashboardDialogs';
import { StatisticsSection } from '@/components/rag-dashboard/analytics/StatisticsSection';
import { MetricsChartsSection } from '@/components/rag-dashboard/analytics/MetricsChartsSection';
import { SystemHealthSection } from '@/components/rag-dashboard/analytics/SystemHealthSection';

const RAGDashboardPage = () => {
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [batchOperationsOpen, setBatchOperationsOpen] = useState(false);
  const [ruleDialogOpen, setRuleDialogOpen] = useState(false);
  const [moduleDetailsOpen, setModuleDetailsOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);

  const handleOpenModuleDetails = (module: any) => {
    setSelectedModule(module);
    setModuleDetailsOpen(true);
  };

  const handleCreateRule = async (rule: any): Promise<any> => {
    console.log("Creating rule:", rule);
    return Promise.resolve({ success: true });
  };

  return (
    <DashboardProvider>
      <div className="container mx-auto px-4 py-6">
        <DashboardHeader 
          onBatchOperationsOpen={() => setBatchOperationsOpen(true)}
        />
        
        <Tabs 
          defaultValue="dashboard" 
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="mt-6"
        >
          <TabsList className="mb-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="space-y-4">
            <DashboardFilters />
            <ModulesGrid onModuleClick={handleOpenModuleDetails} />
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-6">
            <StatisticsSection />
            <div className="grid md:grid-cols-2 gap-6">
              <MetricsChartsSection />
              <SystemHealthSection />
            </div>
          </TabsContent>
        </Tabs>
        
        <DashboardDialogs 
          batchOperationsOpen={batchOperationsOpen}
          onBatchOperationsClose={() => setBatchOperationsOpen(false)}
          ruleDialogOpen={ruleDialogOpen}
          onRuleDialogClose={() => setRuleDialogOpen(false)}
          onCreateRule={handleCreateRule}
          moduleDetailsOpen={moduleDetailsOpen}
          onModuleDetailsClose={() => setModuleDetailsOpen(false)}
          selectedModule={selectedModule}
        />
      </div>
    </DashboardProvider>
  );
};

export default RAGDashboardPage;
