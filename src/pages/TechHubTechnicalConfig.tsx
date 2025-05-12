
import React from 'react';
import SystemTechnicalConfig from '@/components/master-dash/modules/SystemTechnicalConfig';

const TechHubTechnicalConfig: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">System Technical Configuration</h1>
      <p className="text-muted-foreground mb-6">
        Monitor and manage technical aspects of the system including database connections,
        API servers, cloud storage, and security settings.
      </p>
      
      <div className="mb-6">
        <SystemTechnicalConfig />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-slate-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-white">Technical Metrics</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-300">System Uptime</span>
              <span className="text-green-400">99.99%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Average Response Time</span>
              <span className="text-green-400">123ms</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">CPU Usage</span>
              <span className="text-amber-400">62%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Memory Usage</span>
              <span className="text-amber-400">71%</span>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-white">Recent Updates</h2>
          <div className="space-y-3">
            <div className="border-l-2 border-green-500 pl-3">
              <p className="text-white text-sm">Database backup completed</p>
              <p className="text-xs text-slate-400">Today, 08:30 AM</p>
            </div>
            <div className="border-l-2 border-amber-500 pl-3">
              <p className="text-white text-sm">API server #2 restarted</p>
              <p className="text-xs text-slate-400">Yesterday, 11:45 PM</p>
            </div>
            <div className="border-l-2 border-green-500 pl-3">
              <p className="text-white text-sm">Security patches applied</p>
              <p className="text-xs text-slate-400">May 11, 2025, 03:15 PM</p>
            </div>
            <div className="border-l-2 border-green-500 pl-3">
              <p className="text-white text-sm">System configuration updated</p>
              <p className="text-xs text-slate-400">May 10, 2025, 10:20 AM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechHubTechnicalConfig;
