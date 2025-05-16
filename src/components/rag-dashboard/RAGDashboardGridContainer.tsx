
import React, { useState } from 'react';
import RAGDashboardGrid from './RAGDashboardGrid';
import { useModules } from '@/hooks/useModules';
import { useAlerts } from '@/hooks/useAlerts';
import ModuleStatusFilter from './ModuleStatusFilter'; // Fixed import
import { useDashboardState } from './hooks/useDashboardState';
import OverviewStats from './OverviewStats';
import ModulesGrid from './dashboard/ModulesGrid';
import ModuleDetailsDialog from './ModuleDetailsDialog';
import BatchOperationsDialog from './BatchOperationsDialog';
import { useStatusLogs } from '@/hooks/useStatusLogs';
import { useThresholdRules } from '@/hooks/useThresholdRules';
import { useCustomerImpacts } from '@/hooks/useCustomerImpacts';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const RAGDashboardGridContainer: React.FC = () => {
  const { modules, loading: modulesLoading, error: modulesError, refreshModules } = useModules();
  const { alerts, loading: alertsLoading, error: alertsError, resolveAlert } = useAlerts();
  const { logs, getLogsByModuleId, loading: logsLoading } = useStatusLogs();
  const { rules, loading: rulesLoading, addRule, deleteRule } = useThresholdRules();
  const { impacts, loading: impactsLoading } = useCustomerImpacts();

  const {
    selectedStatus,
    setSelectedStatus,
    searchQuery,
    setSearchQuery,
    filteredModules,
    alertCountByModule,
    selectedModule,
    setSelectedModule,
    isDetailsOpen,
    setIsDetailsOpen,
    isBatchOperationsOpen,
    setIsBatchOperationsOpen,
    handleViewDetails
  } = useDashboardState(modules || [], alerts || []);

  // State for module-specific data
  const [moduleStatusLogs, setModuleStatusLogs] = useState<any[]>([]);
  const [moduleAlerts, setModuleAlerts] = useState<any[]>([]);
  const [moduleRules, setModuleRules] = useState<any[]>([]);
  const [moduleImpacts, setModuleImpacts] = useState<any[]>([]);

  // Handle opening module details
  const onViewDetails = async (module: any) => {
    setSelectedModule(module);
    
    // Fetch module specific data
    const statusLogs = await getLogsByModuleId(module.id);
    setModuleStatusLogs(statusLogs);
    
    setModuleAlerts((alerts || []).filter(alert => alert.module_id === module.id));
    setModuleRules((rules || []).filter(rule => rule.module_id === module.id));
    setModuleImpacts((impacts || []).filter(impact => impact.module_id === module.id));
    
    setIsDetailsOpen(true);
  };

  // Handle batch operations dialog
  const handleBatchOperationsOpen = () => {
    setIsBatchOperationsOpen(true);
  };

  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">System Status Dashboard</h1>
        <div className="flex items-center space-x-3">
          <button 
            className="px-4 py-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={refreshModules}
          >
            Refresh
          </button>
          <button 
            className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md"
            onClick={handleBatchOperationsOpen}
          >
            Batch Operations
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search modules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <ModuleStatusFilter 
            selectedStatus={selectedStatus} 
            onStatusSelect={setSelectedStatus}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>
      </div>

      {/* Stats Overview */}
      <OverviewStats modules={modules || []} alerts={alerts || []} />

      {/* Modules Grid */}
      <h2 className="text-lg font-semibold mb-4">Monitored Services</h2>
      <ModulesGrid 
        modules={filteredModules}
        isLoading={modulesLoading}
        hasError={!!modulesError}
        alertCountByModule={alertCountByModule}
        onViewDetails={onViewDetails}
      />

      {/* Module Details Dialog */}
      <ModuleDetailsDialog 
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        module={selectedModule}
        statusLogs={moduleStatusLogs}
        alerts={moduleAlerts}
        rules={moduleRules}
        customerImpacts={moduleImpacts}
        logsLoading={logsLoading}
        alertsLoading={alertsLoading}
        rulesLoading={rulesLoading}
        impactsLoading={impactsLoading}
        onResolveAlert={resolveAlert}
        onAddRule={addRule}
        onDeleteRule={deleteRule}
      />

      {/* Batch Operations Dialog */}
      <BatchOperationsDialog
        isOpen={isBatchOperationsOpen}
        onClose={() => setIsBatchOperationsOpen(false)}
        modules={modules || []}
      />
    </div>
  );
};

export default RAGDashboardGridContainer;
