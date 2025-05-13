
import React from 'react';
import { Button } from '@/components/ui/button';
import PermissionGuard from '@/components/rag-dashboard/PermissionGuard';

interface DashboardHeaderProps {
  onBatchOperationsOpen: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onBatchOperationsOpen }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">System Status Dashboard</h1>
      
      <PermissionGuard requiredPermission={['modules.edit', 'modules.all']}>
        <Button onClick={onBatchOperationsOpen}>
          Batch Operations
        </Button>
      </PermissionGuard>
    </div>
  );
};

export default DashboardHeader;
