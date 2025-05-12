
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { type Alert } from '@/hooks/useAlerts';
import { type Module } from '@/hooks/useModules';
import StatusGauge from './StatusGauge';
import { AlertCircle, AlertTriangle, CheckCircle } from 'lucide-react';

type OverviewStatsProps = {
  modules: Module[];
  alerts: Alert[];
}

export default function OverviewStats({ modules, alerts }: OverviewStatsProps) {
  const greenCount = modules.filter(m => m.status === 'green').length;
  const orangeCount = modules.filter(m => m.status === 'orange').length;
  const redCount = modules.filter(m => m.status === 'red').length;
  
  const unresolvedAlerts = alerts.filter(a => !a.resolved).length;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Operational</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold">{greenCount}</span>
            <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded-full">
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Degraded</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold">{orangeCount}</span>
            <div className="bg-amber-100 dark:bg-amber-900/20 p-2 rounded-full">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Outage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold">{redCount}</span>
            <div className="bg-red-100 dark:bg-red-900/20 p-2 rounded-full">
              <AlertCircle className="h-5 w-5 text-red-500" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Active Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold">{unresolvedAlerts}</span>
            <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-full">
              <AlertCircle className="h-5 w-5 text-blue-500" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
