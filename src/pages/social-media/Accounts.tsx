
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const SocialMediaAccounts = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Social Media Accounts</h1>
        <p className="text-muted-foreground">Manage connected social media profiles</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Account Management</CardTitle>
          <CardDescription>Connect and manage social media accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Social media account management features will be available in future releases.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialMediaAccounts;
