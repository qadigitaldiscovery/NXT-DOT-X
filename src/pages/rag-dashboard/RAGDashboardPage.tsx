
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import RAGDashboardGridContainer from '@/components/rag-dashboard/RAGDashboardGridContainer';
import PermissionGuard from '@/components/rag-dashboard/PermissionGuard';
import { useModules } from '@/hooks/useModules';
import { useNotifications } from '@/hooks/useNotifications';
import { useAlerts } from '@/hooks/useAlerts';
import { useThresholdRules } from '@/hooks/useThresholdRules';
import { DashboardProvider } from '@/components/rag-dashboard/providers/DashboardProvider';
import { PlatformLayout } from '@/components/layouts/PlatformLayout';
import { ragDashboardNavigation } from '@/components/rag-dashboard/config/dashboardNavigation';

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
        <PlatformLayout moduleTitle="RAG Dashboard" navCategories={ragDashboardNavigation}>
          <RAGDashboardGridContainer />
        </PlatformLayout>
      </DashboardProvider>
    </PermissionGuard>
  );
};

export default RAGDashboardPage;
