
import React from 'react';
import ModuleDetailsDialog from '@/components/rag-dashboard/ModuleDetailsDialog';
import BatchOperationsDialog from '@/components/rag-dashboard/BatchOperationsDialog';
import { Module } from '@/hooks/useModules';
import { Alert } from '@/hooks/useAlerts';
import { StatusLog } from '@/hooks/useStatusLogs';
import { ThresholdRule } from '@/hooks/useThresholdRules';
import { CustomerImpact } from '@/hooks/useCustomerImpacts';

interface DashboardDialogsProps {
  isDetailsOpen: boolean;
  onDetailsClose: () => void;
  selectedModule: Module | null;
  logs: StatusLog[];
  moduleAlerts: Alert[];
  rules: ThresholdRule[];
  impacts: CustomerImpact[];
  logsLoading: boolean;
  alertsLoading: boolean;
  rulesLoading: boolean;
  impactsLoading: boolean;
  onResolveAlert: (id: string) => void;
  onAddRule: (rule: any) => Promise<any>;
  onDeleteRule: (id: string) => void;
  isBatchOperationsOpen: boolean;
  onBatchOperationsClose: () => void;
}

const DashboardDialogs: React.FC<DashboardDialogsProps> = ({
  isDetailsOpen,
  onDetailsClose,
  selectedModule,
  logs,
  moduleAlerts,
  rules,
  impacts,
  logsLoading,
  alertsLoading,
  rulesLoading,
  impactsLoading,
  onResolveAlert,
  onAddRule,
  onDeleteRule,
  isBatchOperationsOpen,
  onBatchOperationsClose
}) => {
  return (
    <>
      {/* Module Details Dialog */}
      <ModuleDetailsDialog
        isOpen={isDetailsOpen}
        onClose={onDetailsClose}
        module={selectedModule}
        statusLogs={logs}
        alerts={moduleAlerts}
        rules={rules}
        customerImpacts={impacts}
        logsLoading={logsLoading}
        alertsLoading={alertsLoading}
        rulesLoading={rulesLoading}
        impactsLoading={impactsLoading}
        onResolveAlert={onResolveAlert}
        onAddRule={onAddRule}
        onDeleteRule={onDeleteRule}
      />
      
      {/* Batch Operations Dialog */}
      <BatchOperationsDialog
        isOpen={isBatchOperationsOpen}
        onClose={onBatchOperationsClose}
      />
    </>
  );
};

export default DashboardDialogs;
