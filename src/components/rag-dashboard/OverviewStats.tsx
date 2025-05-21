
import { KpiCard } from './KpiCard';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { type Module } from '@/context/ModulesContext';

interface OverviewStatsProps {
  modules: Module[];
  alerts: any[];
}

const OverviewStats: React.FC<OverviewStatsProps> = ({ modules, alerts }) => {
  // Count modules by status
  const healthyCount = modules.filter(m => m.isEnabled).length;
  const warningCount = modules.filter(m => !m.isEnabled && m.isVisible).length;
  const criticalCount = modules.filter(m => !m.isEnabled && !m.isVisible).length;

  // Count alerts
  const totalAlerts = alerts.length;
  const criticalAlerts = alerts.filter(a => a.severity === 'critical').length;
  const resolvedAlerts = alerts.filter(a => a.resolved).length;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
      <KpiCard 
        title="Healthy Systems"
        value={healthyCount}
        icon={<CheckCircle className="h-5 w-5 text-green-500" />}
        trend={{ 
          value: healthyCount / modules.length * 100, 
          isUpward: true, 
          isPositive: true 
        }}
        description="Systems operating normally" 
      />
      
      <KpiCard 
        title="Systems With Warnings" 
        value={warningCount}
        icon={<AlertTriangle className="h-5 w-5 text-amber-500" />}
        trend={{ 
          value: warningCount / modules.length * 100, 
          isUpward: false, 
          isPositive: false 
        }}
        description="Systems with minor issues"
      />
      
      <KpiCard 
        title="Critical Systems"
        value={criticalCount}
        icon={<XCircle className="h-5 w-5 text-red-500" />} 
        trend={{ 
          value: criticalCount / modules.length * 100, 
          isUpward: false, 
          isPositive: false 
        }}
        description="Systems with major problems"
      />

      <KpiCard 
        title="Total Alerts" 
        value={totalAlerts}
        isLoading={!alerts}
        description="All system alerts"
      />

      <KpiCard 
        title="Critical Alerts" 
        value={criticalAlerts}
        isLoading={!alerts}
        description="Highest priority alerts"
      />

      <KpiCard 
        title="Resolved Alerts" 
        value={resolvedAlerts}
        isLoading={!alerts}
        description="Fixed and cleared alerts"
      />
    </div>
  );
};

export default OverviewStats;
