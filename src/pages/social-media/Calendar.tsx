
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const SocialMediaCalendar = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Post Calendar</h1>
        <p className="text-muted-foreground">Schedule and manage content publication</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Content Calendar</CardTitle>
          <CardDescription>Plan and schedule social media posts</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Content calendar features will be available in future releases.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialMediaCalendar;
