
import React from 'react';
import { useModules } from '@/hooks/useModules';
import { useStatusLogs } from '@/hooks/useStatusLogs';
import { useAlerts } from '@/hooks/useAlerts';
import { useThresholdRules } from '@/hooks/useThresholdRules';
import { useCustomerImpacts } from '@/hooks/useCustomerImpacts';
import OverviewStats from '@/components/rag-dashboard/OverviewStats';
import SharedDashboardLayout from '@/components/layout/SharedDashboardLayout';
import NotificationsPopover from '@/components/rag-dashboard/NotificationsPopover';
import RAGDashboardGrid from '@/components/rag-dashboard/RAGDashboardGrid';
import { useDashboardState } from '@/components/rag-dashboard/hooks/useDashboardState';
import { DashboardProvider } from '@/components/rag-dashboard/providers/DashboardProvider';
import { ragDashboardNavigation } from '@/components/rag-dashboard/config/dashboardNavigation';

// Import the components for our refactored dashboard
import DashboardHeader from '@/components/rag-dashboard/dashboard/DashboardHeader';
import DashboardFilters from '@/components/rag-dashboard/dashboard/DashboardFilters';
import ModulesGrid from '@/components/rag-dashboard/dashboard/ModulesGrid';
import DashboardDialogs from '@/components/rag-dashboard/dashboard/DashboardDialogs';

const RAGDashboard: React.FC = () => {
  // Fetch data
  const { modules, loading: modulesLoading, error: modulesError, updateModuleStatus, refreshModules } = useModules();
  const { alerts, loading: alertsLoading, error: alertsError, resolveAlert } = useAlerts();
  
  // Set up dashboard state
  const { 
    selectedStatus, 
    setSelectedStatus,
    searchQuery, 
    setSearchQuery,
    selectedModule,
    setSelectedModule,
    isDetailsOpen,
    setIsDetailsOpen,
    isBatchOperationsOpen,
    setIsBatchOperationsOpen,
    filteredModules,
    alertCountByModule,
    handleViewDetails
  } = useDashboardState(modules, alerts);
  
  // Fetch data for selected module
  const { logs, loading: logsLoading } = useStatusLogs(selectedModule?.id);
  const { rules, loading: rulesLoading, addRule, deleteRule } = useThresholdRules(selectedModule?.id);
  const { impacts, loading: impactsLoading } = useCustomerImpacts(selectedModule?.id);
  
  // Filter alerts for the selected module
  const moduleAlerts = React.useMemo(() => {
    return alerts.filter(alert => alert.module_id === selectedModule?.id);
  }, [alerts, selectedModule]);

  // Notifications area component
  const notificationArea = <NotificationsPopover />;

  return (
    <DashboardProvider 
      refreshModules={refreshModules}
      resolveAlert={resolveAlert}
      addRule={addRule}
      deleteRule={deleteRule}
    >
      <SharedDashboardLayout
        moduleTitle="RAG Dashboard"
        navCategories={ragDashboardNavigation}
        sidebarClassName="bg-gradient-to-b from-indigo-950 via-blue-950 to-slate-950"
        removeBottomToggle={true}
        showTopLeftToggle={true}
        notificationArea={notificationArea}
      >
        <div className="container mx-auto py-6 max-w-7xl">
          <DashboardHeader 
            onBatchOperationsOpen={() => setIsBatchOperationsOpen(true)}
          />
          
          {/* Overview Stats */}
          <OverviewStats modules={modules} alerts={alerts} />
          
          {/* KPI Dashboard Grid */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Key Performance Indicators</h2>
            <RAGDashboardGrid />
          </div>
          
          {/* Filters */}
          <DashboardFilters
            selectedStatus={selectedStatus}
            onStatusSelect={setSelectedStatus}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
          
          {/* Modules Grid */}
          <ModulesGrid
            modules={filteredModules}
            isLoading={modulesLoading}
            hasError={Boolean(modulesError)}
            alertCountByModule={alertCountByModule}
            onViewDetails={handleViewDetails}
          />
          
          {/* Dialogs */}
          <DashboardDialogs
            isDetailsOpen={isDetailsOpen}
            onDetailsClose={() => setIsDetailsOpen(false)}
            selectedModule={selectedModule}
            logs={logs}
            moduleAlerts={moduleAlerts}
            rules={rules}
            impacts={impacts}
            logsLoading={logsLoading}
            alertsLoading={alertsLoading}
            rulesLoading={rulesLoading}
            impactsLoading={impactsLoading}
            onResolveAlert={resolveAlert}
            onAddRule={addRule}
            onDeleteRule={deleteRule}
            isBatchOperationsOpen={isBatchOperationsOpen}
            onBatchOperationsClose={() => setIsBatchOperationsOpen(false)}
          />
        </div>
      </SharedDashboardLayout>
    </DashboardProvider>
  );
};

export default RAGDashboard;
