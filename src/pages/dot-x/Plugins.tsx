
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const DotXPlugins = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Plugins</h1>
        <p className="text-muted-foreground">Manage DOT-X plugin extensions and modules</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Plugin Management</CardTitle>
          <CardDescription>Install and configure platform extensions</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Plugin management features will be available in future releases.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DotXPlugins;
