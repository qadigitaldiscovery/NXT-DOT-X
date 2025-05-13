
import React from 'react';
import { Button } from '@/components/ui/button';
import PermissionGuard from '@/components/rag-dashboard/PermissionGuard';
import { AlertTriangle, BarChart3, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DashboardHeaderProps {
  onBatchOperationsOpen: () => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onBatchOperationsOpen,
  onRefresh,
  isRefreshing = false
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <div>
        <h1 className="text-3xl font-bold">System Status Dashboard</h1>
        <p className="text-muted-foreground mt-1">Monitor and manage system health with RAG indicators</p>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {onRefresh && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onRefresh} 
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
        )}
        
        <Link to="/dashboard/rag/analytics">
          <Button variant="outline" size="sm">
            <BarChart3 className="h-4 w-4 mr-1" />
            Analytics
          </Button>
        </Link>
        
        <PermissionGuard requiredPermission={['modules.edit', 'modules.all']}>
          <Button onClick={onBatchOperationsOpen} size="sm">
            <AlertTriangle className="h-4 w-4 mr-1" />
            Batch Operations
          </Button>
        </PermissionGuard>
      </div>
    </div>
  );
};

export default DashboardHeader;
