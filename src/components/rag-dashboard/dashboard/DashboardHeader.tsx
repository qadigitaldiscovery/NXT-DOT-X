import React from 'react';
import { RefreshCw, Settings } from 'lucide-react';
import { useDashboard } from '../providers/DashboardProvider';
import { cn } from '@/lib/utils';

interface DashboardHeaderProps {
  onBatchOperationsOpen: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onBatchOperationsOpen
}) => {
  const { refreshData: handleRefresh, loading: isRefreshing } = useDashboard();

  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-2xl font-bold">System Status Dashboard</h1>
      <div className="flex items-center space-x-3">
        <a 
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (!isRefreshing) handleRefresh();
          }}
          className={cn(
            "inline-flex items-center justify-center rounded-md text-sm font-medium", 
            "border border-input py-2 px-4 hover:bg-accent hover:text-accent-foreground",
            isRefreshing && "opacity-50 pointer-events-none"
          )}
          aria-label="Refresh dashboard data"
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} aria-hidden="true" />
          Refresh
        </a>
        <a 
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onBatchOperationsOpen();
          }}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4"
          aria-label="Open batch operations"
        >
          <Settings className="mr-2 h-4 w-4" aria-hidden="true" />
          Batch Operations
        </a>
      </div>
    </div>
  );
};

// Keep the default export for backward compatibility
export default DashboardHeader;
