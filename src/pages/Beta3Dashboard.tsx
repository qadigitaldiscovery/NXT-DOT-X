
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Beta3Dashboard = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Beta 3</h1>
          <p className="text-muted-foreground">This space is ready for future development.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate('/prototypes')}>
            Back to Selector
          </Button>
        </div>
      </div>
      
      {/* Placeholder content */}
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>This prototype is under development</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This prototype is currently being developed and will be available soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Beta3Dashboard;
