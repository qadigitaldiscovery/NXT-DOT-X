
import React from 'react';
import { DashboardProvider } from '@/components/rag-dashboard/providers/DashboardProvider';
import { RAGDashboardGrid } from '@/components/rag-dashboard/RAGDashboardGrid';
import PermissionGuard from '@/components/PermissionGuard';

const RAGDashboardPage: React.FC = () => {
  return (
    <PermissionGuard requiredPermission="modules.rag">
      <DashboardProvider>
        <div className="container mx-auto px-4 py-6">
          <RAGDashboardGrid />
        </div>
      </DashboardProvider>
    </PermissionGuard>
  );
};

export default RAGDashboardPage;
