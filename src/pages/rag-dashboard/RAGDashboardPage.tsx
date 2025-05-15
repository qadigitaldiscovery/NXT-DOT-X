
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import RAGDashboardGrid from '@/components/rag-dashboard/RAGDashboardGrid';
import { PermissionGuard } from '@/components/rag-dashboard/PermissionGuard';
import { useModules } from '@/hooks/useModules';
import { useKpiIndicators } from '@/hooks/useKpiIndicators';
import { useNotifications } from '@/hooks/useNotifications';
import { useAlerts } from '@/hooks/useAlerts';
import { useThresholdRules } from '@/hooks/useThresholdRules';
import { DashboardProvider } from '@/components/rag-dashboard/providers/DashboardProvider';
import { DashboardHeader } from '@/components/rag-dashboard/dashboard/DashboardHeader'; 

const RAGDashboardPage: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <PermissionGuard requiredRole="user">
      <DashboardProvider>
        <div className="container mx-auto px-4 py-6">
          <DashboardHeader />
          <div className="mt-6">
            <RAGDashboardGrid />
          </div>
        </div>
      </DashboardProvider>
    </PermissionGuard>
  );
};

export default RAGDashboardPage;
