import React, { useState, useEffect, useMemo } from 'react';
import { useModules, type Module } from '@/hooks/useModules';
import { useStatusLogs } from '@/hooks/useStatusLogs';
import { useAlerts } from '@/hooks/useAlerts';
import { useThresholdRules } from '@/hooks/useThresholdRules';
import { useCustomerImpacts } from '@/hooks/useCustomerImpacts';
import { useToast } from '@/components/ui/use-toast';
import ModuleCard from '@/components/rag-dashboard/ModuleCard';
import ModuleStatusFilter from '@/components/rag-dashboard/ModuleStatusFilter';
import ModuleDetailsDialog from '@/components/rag-dashboard/ModuleDetailsDialog';
import OverviewStats from '@/components/rag-dashboard/OverviewStats';
import SharedDashboardLayout from '@/components/layout/SharedDashboardLayout';
import { NavCategory } from '@/components/layout/sidebar/types';
import { ChevronLeft, ChevronRight, Home, LineChart, BarChart3, Settings, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const RAGDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { modules, loading: modulesLoading, error: modulesError, updateModuleStatus } = useModules();
  const { alerts, loading: alertsLoading, error: alertsError, resolveAlert } = useAlerts();
  
  // State for filtering and search
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for module details dialog
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
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

  // Custom navigation footer with back, home, and forward buttons
  const navigationFooter = (
    <div className="flex items-center justify-between w-full">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => navigate(-1)}
        className="text-blue-200 hover:text-white hover:bg-indigo-900 rounded-lg w-10 h-10"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => navigate('/')}
        className="text-blue-200 hover:text-white hover:bg-indigo-900 rounded-lg w-10 h-10"
      >
        <Home className="h-5 w-5" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => navigate(1)}
        className="text-blue-200 hover:text-white hover:bg-indigo-900 rounded-lg w-10 h-10"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );

  return (
    <SharedDashboardLayout
      moduleTitle="RAG Dashboard"
      navCategories={navCategories}
      customFooterContent={navigationFooter}
      sidebarClassName="bg-gradient-to-b from-indigo-950 via-blue-950 to-slate-950"
      removeBottomToggle={false}
      showTopLeftToggle={true}
    >
      <div className="container mx-auto py-6 max-w-7xl">
        <h1 className="text-3xl font-bold mb-6">System Status Dashboard</h1>
        
        {/* Overview Stats */}
        <OverviewStats modules={modules} alerts={alerts} />
        
        {/* Filters */}
        <ModuleStatusFilter
          selectedStatus={selectedStatus}
          onStatusSelect={setSelectedStatus}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        
        {modulesLoading ? (
          <div className="py-8 text-center">Loading modules...</div>
        ) : modulesError ? (
          <div className="py-8 text-center text-red-500">
            Error loading modules. Please refresh and try again.
          </div>
        ) : filteredModules.length === 0 ? (
          <div className="py-8 text-center">No modules match the current filters.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModules.map((module) => (
              <ModuleCard
                key={module.id}
                module={module}
                alertCount={alertCountByModule[module.id] || 0}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}
        
        {/* Module Details Dialog */}
        <ModuleDetailsDialog
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          module={selectedModule}
          statusLogs={logs}
          alerts={moduleAlerts}
          rules={rules}
          customerImpacts={impacts}
          logsLoading={logsLoading}
          alertsLoading={alertsLoading}
          rulesLoading={rulesLoading}
          impactsLoading={impactsLoading}
          onResolveAlert={handleResolveAlert}
          onAddRule={handleAddRule}
          onDeleteRule={handleDeleteRule}
        />
      </div>
    </SharedDashboardLayout>
  );
};

export default RAGDashboard;
