
import React from 'react';
import { DashboardProvider } from '@/components/rag-dashboard/providers/DashboardProvider';
import RAGDashboardGrid from '@/components/rag-dashboard/RAGDashboardGrid';
import PermissionGuard from '@/components/PermissionGuard';

const RAGDashboardPage: React.FC = () => {
  // Mock functions that return Promises with the expected return types
  const refreshModules = async (): Promise<{ success: boolean }> => {
    console.log('Refreshing modules');
    return Promise.resolve({ success: true });
  };
  
  const resolveAlert = async (id: string): Promise<any> => {
    console.log(`Resolving alert with ID: ${id}`);
    return Promise.resolve({ success: true });
  };
  
  const addRule = async (rule: any): Promise<any> => {
    return Promise.resolve({ success: true, ruleId: 'new-rule-id' });
  };
  
  const deleteRule = async (id: string): Promise<any> => {
    return Promise.resolve({ success: true });
  };

  return (
    <PermissionGuard requiredPermission="modules.rag">
      <DashboardProvider
        refreshModules={refreshModules}
        resolveAlert={resolveAlert}
        addRule={addRule}
        deleteRule={deleteRule}
      >
        <div className="container mx-auto px-4 py-6">
          <RAGDashboardGrid />
        </div>
      </DashboardProvider>
    </PermissionGuard>
  );
};

export default RAGDashboardPage;
