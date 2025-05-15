
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const DotXSettings = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">DOT-X Settings</h1>
        <p className="text-muted-foreground">Configure DOT-X platform preferences</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Platform Settings</CardTitle>
          <CardDescription>Configure global DOT-X preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Settings configuration will be available in future releases.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DotXSettings;
