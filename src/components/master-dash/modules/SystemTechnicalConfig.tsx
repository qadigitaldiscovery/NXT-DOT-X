
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Database, Server } from 'lucide-react';

export default function SystemTechnicalConfig() {
  // System components data
  const systemComponents = [
    { 
      id: 'system-security', 
      name: 'System Security', 
      icon: <Shield className="h-5 w-5 text-green-500" />, 
      status: 'Online'
    },
    { 
      id: 'database', 
      name: 'Database', 
      icon: <Database className="h-5 w-5 text-green-500" />, 
      status: 'Online'
    },
    { 
      id: 'server', 
      name: 'Server Status', 
      icon: <Server className="h-5 w-5 text-green-500" />, 
      status: 'Online'
    }
  ];

  return (
    <Card className="mt-8 bg-black/20 border-slate-800">
      <CardHeader>
        <CardTitle className="text-white">System Technical Configuration</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {systemComponents.map(component => (
            <div key={component.id} 
                 className="flex items-center p-4 rounded-md bg-gradient-to-r from-slate-800 to-slate-700 border border-slate-700">
              <div className="p-2 mr-4 bg-slate-900 rounded-md">
                {component.icon}
              </div>
              <div>
                <h3 className="font-medium text-white">{component.name}</h3>
                <div className="flex items-center mt-1">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-xs text-green-400">{component.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
