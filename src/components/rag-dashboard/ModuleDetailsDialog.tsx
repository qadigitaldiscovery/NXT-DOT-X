import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { type Module } from '@/hooks/useModules';
import { type StatusLog } from '@/hooks/useStatusLogs';
import { type Alert } from '@/hooks/useAlerts';
import { type ThresholdRule } from '@/hooks/useThresholdRules';
import { type CustomerImpact } from '@/hooks/useCustomerImpacts';
import StatusGauge from './StatusGauge';
import StatusTimeline from './StatusTimeline';
import AlertsList from './AlertsList';
import ThresholdRulesList from './ThresholdRulesList';
import CustomerImpactsList from './CustomerImpactsList';
import RuleForm from './RuleForm';

type ModuleDetailsDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  module: Module | null;
  statusLogs: StatusLog[];
  alerts: Alert[];
  rules: ThresholdRule[];
  customerImpacts: CustomerImpact[];
  logsLoading: boolean;
  alertsLoading: boolean;
  rulesLoading: boolean;
  impactsLoading: boolean;
  onResolveAlert: (id: string) => void;
  onAddRule: (rule: Omit<ThresholdRule, 'id' | 'created_at' | 'condition' | 'operator'> & { condition: string }) => Promise<any>;
  onDeleteRule: (id: string) => void;
}

export default function ModuleDetailsDialog({
  isOpen,
  onClose,
  module,
  statusLogs,
  alerts,
  rules,
  customerImpacts,
  logsLoading,
  alertsLoading,
  rulesLoading,
  impactsLoading,
  onResolveAlert,
  onAddRule,
  onDeleteRule
}: ModuleDetailsDialogProps) {
  const [activeTab, setActiveTab] = useState('status');
  
  if (!module) return null;

  const unresolved = alerts.filter(a => !a.resolved);
  const resolvedCount = alerts.length - unresolved.length;
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <StatusGauge status={module.status} size="lg" showLabel />
            <div>
              <DialogTitle className="text-2xl">{module.name}</DialogTitle>
              <DialogDescription className="mt-1">{module.description}</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="status">Status History</TabsTrigger>
            <TabsTrigger value="alerts" className="relative">
              Alerts
              {unresolved.length > 0 && (
                <span className="absolute top-0 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                  {unresolved.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="rules">Threshold Rules</TabsTrigger>
            <TabsTrigger value="impact">Customer Impact</TabsTrigger>
          </TabsList>
          
          <div className="mt-4">
            <TabsContent value="status">
              <StatusTimeline logs={statusLogs} loading={logsLoading} />
            </TabsContent>
            
            <TabsContent value="alerts">
              <AlertsList
                alerts={alerts}
                onResolve={onResolveAlert}
                loading={alertsLoading}
              />
            </TabsContent>
            
            <TabsContent value="rules">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ThresholdRulesList
                  rules={rules}
                  onDeleteRule={onDeleteRule}
                  loading={rulesLoading}
                />
                <RuleForm
                  module={module}
                  onAddRule={onAddRule}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="impact">
              <CustomerImpactsList
                impacts={customerImpacts}
                loading={impactsLoading}
              />
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
