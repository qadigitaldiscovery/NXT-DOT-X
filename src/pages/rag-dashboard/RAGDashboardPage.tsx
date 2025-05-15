
import React from 'react';
import { RAGDashboardGrid } from '@/components/rag-dashboard/RAGDashboardGrid';
import { DashboardProvider } from '@/components/rag-dashboard/providers/DashboardProvider';

const RAGDashboardPage: React.FC = () => {
  return (
    <DashboardProvider>
      <RAGDashboardGrid />
    </DashboardProvider>
  );
};

export default RAGDashboardPage;
