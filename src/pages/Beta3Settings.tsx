
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Beta3Settings = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Beta 3 prototype settings</p>
        </div>
        <Button variant="outline" onClick={() => navigate('/beta3')}>
          Back to Dashboard
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Settings options will be available once this prototype is developed.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Beta3Settings;
