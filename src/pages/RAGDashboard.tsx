
import React, { useState, useEffect, useMemo } from 'react';
import { useModules, type Module } from '@/hooks/useModules';
import { useStatusLogs } from '@/hooks/useStatusLogs';
import { useAlerts } from '@/hooks/useAlerts';
import { useThresholdRules } from '@/hooks/useThresholdRules';
import { useCustomerImpacts } from '@/hooks/useCustomerImpacts';
import { useToast } from '@/components/ui/use-toast';
import OverviewStats from '@/components/rag-dashboard/OverviewStats';
import SharedDashboardLayout from '@/components/layout/SharedDashboardLayout';
import NotificationsPopover from '@/components/rag-dashboard/NotificationsPopover';
import { NavCategory } from '@/components/layout/sidebar/types';
import { Home, LineChart, BarChart3, Settings, AlertTriangle } from 'lucide-react';

// Import the new components
import DashboardHeader from '@/components/rag-dashboard/dashboard/DashboardHeader';
import DashboardFilters from '@/components/rag-dashboard/dashboard/DashboardFilters';
import ModulesGrid from '@/components/rag-dashboard/dashboard/ModulesGrid';
import DashboardDialogs from '@/components/rag-dashboard/dashboard/DashboardDialogs';

const RAGDashboard: React.FC = () => {
  const { toast } = useToast();
  const { modules, loading: modulesLoading, error: modulesError, updateModuleStatus } = useModules();
  const { alerts, loading: alertsLoading, error: alertsError, resolveAlert } = useAlerts();
  
  // State for filtering and search
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for module details dialog
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  // State for batch operations dialog
  const [isBatchOperationsOpen, setIsBatchOperationsOpen] = useState(false);
  
  // Fetch data for selected module
  const { logs, loading: logsLoading } = useStatusLogs(selectedModule?.id);
  const { rules, loading: rulesLoading, addRule, deleteRule } = useThresholdRules(selectedModule?.id);
  const { impacts, loading: impactsLoading } = useCustomerImpacts(selectedModule?.id);
  const moduleAlerts = useMemo(() => {
    return alerts.filter(alert => alert.module_id === selectedModule?.id);
  }, [alerts, selectedModule]);
  
  // Filter modules based on selected status and search query
  const filteredModules = useMemo(() => {
    return modules.filter(module => {
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
  }, [modules, selectedStatus, searchQuery]);
  
  // Count alerts by module
  const alertCountByModule = useMemo(() => {
    const counts: Record<string, number> = {};
    
    alerts.forEach(alert => {
      if (!alert.resolved) {
        counts[alert.module_id] = (counts[alert.module_id] || 0) + 1;
      }
    });
    
    return counts;
  }, [alerts]);
  
  const handleViewDetails = (module: Module) => {
    setSelectedModule(module);
    setIsDetailsOpen(true);
  };
  
  const handleResolveAlert = async (id: string) => {
    const result = await resolveAlert(id);
    
    if (result.success) {
      toast({
        title: "Alert resolved",
        description: "The alert has been marked as resolved.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Failed to resolve alert",
        description: "There was an error resolving the alert.",
      });
    }
  };
  
  const handleAddRule = async (rule: any) => {
    try {
      const result = await addRule(rule);
      
      toast({
        title: "Rule created",
        description: "The threshold rule has been created successfully.",
      });
      return result;
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Failed to create rule",
        description: "There was an error creating the threshold rule.",
      });
      throw err;
    }
  };
  
  const handleDeleteRule = async (id: string) => {
    const result = await deleteRule(id);
    
    if (result.success) {
      toast({
        title: "Rule deleted",
        description: "The threshold rule has been deleted.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Failed to delete rule",
        description: "There was an error deleting the threshold rule.",
      });
    }
  };

  // Define navigation categories for this module
  const navCategories: NavCategory[] = [
    {
      name: "RAG Dashboard",
      items: [
        { label: "Overview", path: "/dashboard/rag", icon: BarChart3 },
        { label: "Analytics", path: "/dashboard/rag/analytics", icon: LineChart },
        { label: "Alerts", path: "/dashboard/rag/alerts", icon: AlertTriangle },
        { label: "Settings", path: "/dashboard/rag/settings", icon: Settings, roles: ["admin"] }
      ]
    }
  ];

  // Notifications area component
  const notificationArea = <NotificationsPopover />;

  return (
    <SharedDashboardLayout
      moduleTitle="RAG Dashboard"
      navCategories={navCategories}
      sidebarClassName="bg-gradient-to-b from-indigo-950 via-blue-950 to-slate-950"
      removeBottomToggle={true}
      showTopLeftToggle={true}
      notificationArea={notificationArea}
    >
      <div className="container mx-auto py-6 max-w-7xl">
        <DashboardHeader onBatchOperationsOpen={() => setIsBatchOperationsOpen(true)} />
        
        {/* Overview Stats */}
        <OverviewStats modules={modules} alerts={alerts} />
        
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
          onResolveAlert={handleResolveAlert}
          onAddRule={handleAddRule}
          onDeleteRule={handleDeleteRule}
          isBatchOperationsOpen={isBatchOperationsOpen}
          onBatchOperationsClose={() => setIsBatchOperationsOpen(false)}
        />
      </div>
    </SharedDashboardLayout>
  );
};

export default RAGDashboard;
