
import React from 'react';
import RAGDashboardGridContainer from '@/components/rag-dashboard/RAGDashboardGridContainer';

export default function RAGDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            System Status Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Monitor and manage system alerts and performance
          </p>
        </div>
        <RAGDashboardGridContainer />
      </div>
    </div>
  );
}
