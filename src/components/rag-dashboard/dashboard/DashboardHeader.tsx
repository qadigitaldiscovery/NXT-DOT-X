
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Settings } from 'lucide-react';
import { useDashboardContext } from '../providers/DashboardProvider';

interface DashboardHeaderProps {
  onBatchOperationsOpen: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onBatchOperationsOpen
}) => {
  const { handleRefresh, isRefreshing } = useDashboardContext();

  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-2xl font-bold">System Status Dashboard</h1>
      <div className="flex items-center space-x-3">
        <Button 
          variant="outline" 
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
        <Button onClick={onBatchOperationsOpen}>
          <Settings className="mr-2 h-4 w-4" />
          Batch Operations
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
