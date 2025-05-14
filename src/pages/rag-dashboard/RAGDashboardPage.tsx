
import React, { Suspense } from 'react';
import { PlatformLayout } from '@/components/layouts/PlatformLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import RAGDashboardGrid from '@/components/rag-dashboard/RAGDashboardGrid';
import ModuleStatusFilter from '@/components/rag-dashboard/ModuleStatusFilter';
import NotificationsPopover from '@/components/rag-dashboard/NotificationsPopover';
import OverviewStats from '@/components/rag-dashboard/OverviewStats';
import { DashboardProvider } from '@/components/rag-dashboard/providers/DashboardProvider';
import { ragDashboardNavigation } from '@/components/rag-dashboard/config/dashboardNavigation';
import { AlertCircle } from 'lucide-react';
import { useModules } from '@/hooks/useModules';
import { useAlerts } from '@/hooks/useAlerts';

const LoadingFallback = () => (
  <div className="w-full h-64 flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    const handleError = () => setHasError(true);
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return (
      <Card className="p-6 bg-red-50 border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center text-red-600">
            <AlertCircle className="mr-2" />
            Error Loading Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>There was an error loading the dashboard components. Please refresh the page or contact support.</p>
        </CardContent>
      </Card>
    );
  }

  return <>{children}</>;
};

const RAGDashboardPage = () => {
  const { modules, loading: modulesLoading, error: modulesError, refreshModules } = useModules();
  const { alerts, loading: alertsLoading, error: alertsError, resolveAlert } = useAlerts();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedStatus, setSelectedStatus] = React.useState<string | null>(null);

  const handleAddRule = async (rule: any) => {
    // Implementation would go here
    return { success: true };
  };

  const handleDeleteRule = async (id: string) => {
    // Implementation would go here
    return { success: true };
  };

  return (
    <PlatformLayout moduleTitle="RAG Status Dashboard" navCategories={ragDashboardNavigation}>
      <DashboardProvider 
        refreshModules={refreshModules} 
        resolveAlert={resolveAlert} 
        addRule={handleAddRule} 
        deleteRule={handleDeleteRule}
      >
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">RAG Status Dashboard</h1>
            <div className="flex items-center space-x-2">
              <ModuleStatusFilter
                selectedStatus={selectedStatus}
                onStatusSelect={setSelectedStatus}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
              <NotificationsPopover />
            </div>
          </div>
          
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback />}>
              {!modulesLoading && !alertsLoading && (
                <OverviewStats modules={modules} alerts={alerts} />
              )}
            </Suspense>
          </ErrorBoundary>
          
          <div className="mt-6">
            <ErrorBoundary>
              <Suspense fallback={<LoadingFallback />}>
                <RAGDashboardGrid />
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>
      </DashboardProvider>
    </PlatformLayout>
  );
};

export default RAGDashboardPage;
