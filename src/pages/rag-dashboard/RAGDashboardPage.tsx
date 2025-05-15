
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import RAGDashboardGrid from '@/components/rag-dashboard/RAGDashboardGrid';
// Changed import from named to default import
import PermissionGuard from '@/components/rag-dashboard/PermissionGuard';
import { useModules } from '@/hooks/useModules';
import { useKpiIndicators } from '@/hooks/useKpiIndicators';
import { useNotifications } from '@/hooks/useNotifications';
import { useAlerts } from '@/hooks/useAlerts';
import { useThresholdRules } from '@/hooks/useThresholdRules';
import { DashboardProvider } from '@/components/rag-dashboard/providers/DashboardProvider';
import { DashboardHeader } from '@/components/rag-dashboard/dashboard/DashboardHeader'; 

const RAGDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { modules, refreshModules } = useModules();
  const { alerts, resolveAlert } = useAlerts();
  const { rules, addRule, deleteRule } = useThresholdRules();
  
  // Added function to handle batch operations
  const handleBatchOperationsOpen = () => {
    console.log("Batch operations opened");
    // Implementation would go here in a real app
  };
  
  return (
    <PermissionGuard requiredPermission="user">
      <DashboardProvider 
        refreshModules={refreshModules}
        resolveAlert={resolveAlert}
        addRule={addRule}
        deleteRule={deleteRule}
      >
        <div className="container mx-auto px-4 py-6">
          <DashboardHeader onBatchOperationsOpen={handleBatchOperationsOpen} />
          <div className="mt-6">
            <RAGDashboardGrid />
          </div>
        </div>
      </DashboardProvider>
    </PermissionGuard>
  );
};

export default RAGDashboardPage;
