
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ServerCog, Shield, Users, Database } from 'lucide-react';

const AdminConsole = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">System Admin Console</h1>
      <p className="text-muted-foreground">System administration and configuration</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">System Health</CardTitle>
            <ServerCog className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">All systems operational</p>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Server Load</span>
                <span className="font-medium">24%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '24%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Security</CardTitle>
            <Shield className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Security status and configuration</p>
            <div className="mt-4 space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Last Security Scan</span>
                <span className="font-medium">Today, 09:45 AM</span>
              </div>
              <div className="flex justify-between">
                <span>Threats Detected</span>
                <span className="font-medium text-green-500">0</span>
              </div>
              <div className="flex justify-between">
                <span>SSL Certificate</span>
                <span className="font-medium text-green-500">Valid (expires in 234 days)</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">User Administration</CardTitle>
            <Users className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Manage system users and permissions</p>
            <div className="mt-4 space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Active Users</span>
                <span className="font-medium">187</span>
              </div>
              <div className="flex justify-between">
                <span>Admin Users</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex justify-between">
                <span>New Users (Last 7 Days)</span>
                <span className="font-medium">5</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Database Management</CardTitle>
            <Database className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Database administration and monitoring</p>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Database Storage</span>
                <span className="font-medium">1.7 TB / 2.0 TB</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <div className="flex justify-between text-sm">
                <span>Last Backup</span>
                <span className="font-medium">Today, 03:15 AM</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminConsole;
