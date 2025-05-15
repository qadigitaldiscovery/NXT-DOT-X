
import React from 'react';
import { RAGDashboardGrid } from '@/components/rag-dashboard/RAGDashboardGrid';
import { DashboardHeader } from '@/components/rag-dashboard/dashboard/DashboardHeader';
import { DashboardFilters } from '@/components/rag-dashboard/dashboard/DashboardFilters';
import { DashboardDialogs } from '@/components/rag-dashboard/dashboard/DashboardDialogs';
import { DashboardProvider } from '@/components/rag-dashboard/providers/DashboardProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RAGDashboardPage: React.FC = () => {
  return (
    <DashboardProvider>
      <div className="space-y-6">
        <DashboardHeader />
        <DashboardFilters />
        <RAGDashboardGrid />
        <DashboardDialogs />
      </div>
    </DashboardProvider>
  );
};

export default RAGDashboardPage;
