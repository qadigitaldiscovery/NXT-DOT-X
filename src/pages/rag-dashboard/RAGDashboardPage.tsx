
import React, { useState, useEffect } from 'react';
import RAGDashboardGrid from '@/components/rag-dashboard/RAGDashboardGrid';
import { DashboardProvider } from '@/components/rag-dashboard/providers/DashboardProvider';
import DashboardHeader from '@/components/rag-dashboard/dashboard/DashboardHeader';
import DashboardFilters from '@/components/rag-dashboard/dashboard/DashboardFilters';
import ModulesGrid from '@/components/rag-dashboard/dashboard/ModulesGrid';
import DashboardDialogs from '@/components/rag-dashboard/dashboard/DashboardDialogs';
import { useModules, type Module } from '@/hooks/useModules';
import { useAlerts, type Alert } from '@/hooks/useAlerts';
import { useThresholdRules } from '@/hooks/useThresholdRules';
import { useStatusLogs, type StatusLog } from '@/hooks/useStatusLogs';
import { useCustomerImpacts, type CustomerImpact } from '@/hooks/useCustomerImpacts';

/**
 * RAG Dashboard Page Component
 * 
 * Main page for the RAG Dashboard displaying system status
 * and module performance metrics
 */
const RAGDashboardPage = () => {
  // Fetch data and methods from hooks
  const { modules, loading: modulesLoading, error: modulesError, updateModuleStatus, refreshModules } = useModules();
  const { alerts, resolveAlert, getAlertsByModuleId } = useAlerts();
  const { rules, addRule, deleteRule, getRulesByModuleId } = useThresholdRules();
  const { logs, getLogsByModuleId } = useStatusLogs();
  const { impacts, getImpactsByModuleId } = useCustomerImpacts();

  // Local state for filtering and module details
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
  const [isBatchOperationsOpen, setIsBatchOperationsOpen] = useState<boolean>(false);
  
  // Filtered modules based on status and search query
  const filteredModules = modules.filter(module => {
    // Filter by status if selected
    if (selectedStatus && module.status !== selectedStatus) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !module.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  // Calculate alert counts by module
  const alertCountByModule = React.useMemo(() => {
    const counts: Record<string, number> = {};
    alerts.forEach(alert => {
      if (!alert.resolved) {
        counts[alert.module_id] = (counts[alert.module_id] || 0) + 1;
      }
    });
    return counts;
  }, [alerts]);

  // State for selected module details
  const [moduleAlerts, setModuleAlerts] = useState<Alert[]>([]);
  const [moduleRules, setModuleRules] = useState([]);
  const [moduleLogs, setModuleLogs] = useState<StatusLog[]>([]);
  const [moduleImpacts, setModuleImpacts] = useState<CustomerImpact[]>([]);
  const [detailsLoading, setDetailsLoading] = useState({
    alerts: false,
    rules: false,
    logs: false,
    impacts: false
  });
  
  // Handle opening module details
  const handleViewModuleDetails = (module: Module) => {
    setSelectedModule(module);
    setIsDetailsOpen(true);
    
    // Load module-specific data
    if (module?.id) {
      // Alerts
      setDetailsLoading(prev => ({ ...prev, alerts: true }));
      getAlertsByModuleId(module.id)
        .then(setModuleAlerts)
        .finally(() => setDetailsLoading(prev => ({ ...prev, alerts: false })));
      
      // Rules
      setDetailsLoading(prev => ({ ...prev, rules: true }));
      getRulesByModuleId(module.id)
        .then(setModuleRules)
        .finally(() => setDetailsLoading(prev => ({ ...prev, rules: false })));
      
      // Status logs
      setDetailsLoading(prev => ({ ...prev, logs: true }));
      getLogsByModuleId(module.id)
        .then(setModuleLogs)
        .finally(() => setDetailsLoading(prev => ({ ...prev, logs: false })));
      
      // Customer impacts
      setDetailsLoading(prev => ({ ...prev, impacts: true }));
      getImpactsByModuleId(module.id)
        .then(setModuleImpacts)
        .finally(() => setDetailsLoading(prev => ({ ...prev, impacts: false })));
    }
  };
  
  return (
    <DashboardProvider 
      refreshModules={refreshModules} 
      resolveAlert={resolveAlert} 
      addRule={addRule} 
      deleteRule={deleteRule}
    >
      <div className="container mx-auto px-4 py-6 space-y-6">
        <DashboardHeader 
          onBatchOperationsOpen={() => setIsBatchOperationsOpen(true)} 
        />
        <DashboardFilters 
          selectedStatus={selectedStatus}
          onStatusSelect={setSelectedStatus}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <ModulesGrid 
          modules={filteredModules}
          isLoading={modulesLoading}
          hasError={!!modulesError}
          alertCountByModule={alertCountByModule}
          onViewDetails={handleViewModuleDetails}
        />
        <DashboardDialogs 
          isDetailsOpen={isDetailsOpen}
          onDetailsClose={() => setIsDetailsOpen(false)}
          selectedModule={selectedModule}
          logs={moduleLogs}
          moduleAlerts={moduleAlerts}
          rules={moduleRules}
          impacts={moduleImpacts}
          logsLoading={detailsLoading.logs}
          alertsLoading={detailsLoading.alerts}
          rulesLoading={detailsLoading.rules}
          impactsLoading={detailsLoading.impacts}
          onResolveAlert={resolveAlert}
          onAddRule={addRule}
          onDeleteRule={deleteRule}
          isBatchOperationsOpen={isBatchOperationsOpen}
          onBatchOperationsClose={() => setIsBatchOperationsOpen(false)}
        />
      </div>
    </DashboardProvider>
  );
};

export default RAGDashboardPage;
