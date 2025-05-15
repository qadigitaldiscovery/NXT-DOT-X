
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardProvider } from '@/components/rag-dashboard/providers/DashboardProvider';
// Import correctly - either as a named import or as a default import
import DashboardHeader from '@/components/rag-dashboard/dashboard/DashboardHeader';
import ModulesGrid from '@/components/rag-dashboard/dashboard/ModulesGrid';
import DashboardFilters from '@/components/rag-dashboard/dashboard/DashboardFilters';
import { DashboardDialogs } from '@/components/rag-dashboard/dashboard/DashboardDialogs';
import StatisticsSection from '@/components/rag-dashboard/analytics/StatisticsSection';
import MetricsChartsSection from '@/components/rag-dashboard/analytics/MetricsChartsSection';
import SystemHealthSection from '@/components/rag-dashboard/analytics/SystemHealthSection';

const RAGDashboardPage = () => {
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [batchOperationsOpen, setBatchOperationsOpen] = useState(false);
  const [ruleDialogOpen, setRuleDialogOpen] = useState(false);
  const [moduleDetailsOpen, setModuleDetailsOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);
  // Add state for filter functionality
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

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
            <DashboardFilters 
              selectedStatus={selectedStatus}
              onStatusSelect={setSelectedStatus}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
            <ModulesGrid 
              onViewDetails={handleOpenModuleDetails}
              modules={[]} 
              isLoading={false} 
              hasError={false} 
              alertCountByModule={{}} 
            />
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-6">
            <StatisticsSection 
              healthScore={85}
              healthTrend="stable"
              avgResponseTime={120}
              modulesCount={8}
              operationalCount={7}
              errorRate={0.5}
              healthLoading={false}
            />
            <div className="grid md:grid-cols-2 gap-6">
              <MetricsChartsSection />
              <SystemHealthSection 
                healthScore={85}
                healthLoading={false}
                pieData={[
                  { name: 'Operational', value: 7, color: '#10b981' },
                  { name: 'Degraded', value: 1, color: '#f59e0b' },
                  { name: 'Outage', value: 0, color: '#ef4444' }
                ]}
                chartTheme="dark"
              />
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
