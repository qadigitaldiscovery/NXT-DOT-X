
import React from 'react';
import RAGDashboardGrid from '@/components/rag-dashboard/RAGDashboardGrid';
import DashboardHeader from '@/components/rag-dashboard/dashboard/DashboardHeader';
import DashboardFilters from '@/components/rag-dashboard/dashboard/DashboardFilters';
import DashboardDialogs from '@/components/rag-dashboard/dashboard/DashboardDialogs';
import { DashboardProvider } from '@/components/rag-dashboard/providers/DashboardProvider';
import { useModules } from '@/hooks/useModules';
import { useAlerts } from '@/hooks/useAlerts';
import { useStatusLogs } from '@/hooks/useStatusLogs';
import { useThresholdRules } from '@/hooks/useThresholdRules';

const RAGDashboardPage: React.FC = () => {
  const { modules, loading, error, updateModuleStatus, refreshModules } = useModules();
  const { alerts, resolveAlert, getAlertsByModuleId } = useAlerts();
  const { logs, getLogsByModuleId } = useStatusLogs();
  const { rules, addRule, deleteRule, getRulesByModuleId } = useThresholdRules();

  return (
    <DashboardProvider
      refreshModules={refreshModules}
      resolveAlert={resolveAlert}
      addRule={addRule}
      deleteRule={deleteRule}
    >
      <div className="space-y-6">
        <DashboardHeader />
        <DashboardFilters 
          selectedStatus={null} 
          onStatusSelect={() => {}} 
          searchQuery="" 
          onSearchChange={() => {}}
        />
        <RAGDashboardGrid />
        <DashboardDialogs 
          isDetailsOpen={false}
          onDetailsClose={() => {}}
          selectedModule={null}
          logs={[]}
          alerts={[]}
          rules={[]}
          onUpdateStatus={() => {}}
          onResolveAlert={() => {}}
          onAddRule={() => {}}
          onDeleteRule={() => {}}
          isAddRuleOpen={false}
          onAddRuleClose={() => {}}
          onAddRuleOpen={() => {}}
          isAlertDetailsOpen={false}
          onAlertDetailsClose={() => {}}
          selectedAlert={null}
          isRuleDetailsOpen={false}
          onRuleDetailsClose={() => {}}
          selectedRule={null}
        />
      </div>
    </DashboardProvider>
  );
};

export default RAGDashboardPage;
