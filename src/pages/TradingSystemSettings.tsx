
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const TradingSystemSettings = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Trading System settings and configuration</p>
        </div>
        <Button variant="outline" onClick={() => navigate('/trading-system')}>
          Back to Dashboard
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Trading System Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Trading System settings options will be available in future releases.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TradingSystemSettings;
