
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const Beta1Settings = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Beta 1 Settings</h1>
      <p className="text-muted-foreground">Manage your application preferences</p>
      
      <Card>
        <CardHeader>
          <CardTitle>User Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name</Label>
            <Input id="displayName" defaultValue="Admin User" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" defaultValue="admin@example.com" />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="darkMode">Dark Mode</Label>
            <Switch id="darkMode" />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications">Email Notifications</Label>
            <Switch id="notifications" defaultChecked />
          </div>
          
          <Button className="mt-4">Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Beta1Settings;
