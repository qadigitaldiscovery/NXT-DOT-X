
import React from 'react';
import { DashboardProvider } from '@/components/rag-dashboard/providers/DashboardProvider';
import RAGDashboardGrid from '@/components/rag-dashboard/RAGDashboardGrid';
import { Button } from '@/components/ui/button';
import ModuleStatusFilter from '@/components/rag-dashboard/ModuleStatusFilter';
import { PlusCircle } from 'lucide-react';
import PermissionGuard from '@/components/rag-dashboard/PermissionGuard';
import SharedDashboardLayout from '@/components/layout/SharedDashboardLayout';
import { ragDashboardNavigation } from '@/components/rag-dashboard/config/dashboardNavigation';

const RAGDashboardPage = () => {
  const [showBatchOperations, setShowBatchOperations] = React.useState(false);

  const refreshModules = async (): Promise<{ success: boolean }> => {
    // Placeholder for actual implementation
    return { success: true };
  };

  const resolveAlert = async (id: string): Promise<{ success: boolean }> => {
    // Placeholder for actual implementation
    return { success: true };
  };

  const addRule = async (data: any): Promise<{ success: boolean }> => {
    // Placeholder for actual implementation
    return { success: true };
  };

  const deleteRule = async (id: string): Promise<{ success: boolean }> => {
    // Placeholder for actual implementation
    return { success: true };
  };

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
        notificationArea={
          <PermissionGuard requiredRole="admin">
            <Button 
              size="sm" 
              className="ml-2" 
              onClick={() => setShowBatchOperations(true)}
            >
              <PlusCircle className="w-4 h-4 mr-1" />
              Add Alert Rule
            </Button>
          </PermissionGuard>
        }
      >
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Module Status</h1>
            <ModuleStatusFilter />
          </div>
          <RAGDashboardGrid />
        </div>
      </SharedDashboardLayout>
    </DashboardProvider>
  );
};

export default RAGDashboardPage;
