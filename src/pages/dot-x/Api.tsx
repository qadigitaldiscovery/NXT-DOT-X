
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const DotXApi = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">API Integration</h1>
        <p className="text-muted-foreground">Manage DOT-X API connections and configurations</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>API Management</CardTitle>
          <CardDescription>Configure and manage API integrations</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            API integration features will be available in future releases.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DotXApi;
