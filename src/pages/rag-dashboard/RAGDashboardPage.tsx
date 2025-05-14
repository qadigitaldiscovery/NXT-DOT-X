
import React from 'react';
import { RAGDashboardGrid } from '@/components/rag-dashboard/RAGDashboardGrid';
import { DashboardProvider } from '@/components/rag-dashboard/providers/DashboardProvider';
import { DashboardHeader } from '@/components/rag-dashboard/dashboard/DashboardHeader';
import { DashboardFilters } from '@/components/rag-dashboard/dashboard/DashboardFilters';
import { ModulesGrid } from '@/components/rag-dashboard/dashboard/ModulesGrid';
import { DashboardDialogs } from '@/components/rag-dashboard/dashboard/DashboardDialogs';

/**
 * RAG Dashboard Page Component
 * 
 * Main page for the RAG Dashboard displaying system status
 * and module performance metrics
 */
const RAGDashboardPage = () => {
  return (
    <DashboardProvider>
      <div className="container mx-auto px-4 py-6 space-y-6">
        <DashboardHeader />
        <DashboardFilters />
        <ModulesGrid />
        <DashboardDialogs />
      </div>
    </DashboardProvider>
  );
};

export default RAGDashboardPage;
