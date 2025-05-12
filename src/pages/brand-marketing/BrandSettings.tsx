
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Settings, Bell, Shield, Database } from 'lucide-react';

const BrandSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Brand Settings</h1>
        <p className="text-muted-foreground mt-2">
          Configure your brand marketing preferences and settings
        </p>
      </div>
      
      <Tabs defaultValue="general">
        <TabsList className="grid grid-cols-4 w-full max-w-md">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="data">Data</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                General Brand Settings
              </CardTitle>
              <CardDescription>Manage your brand's general settings and appearance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="brand-name">Brand Name</Label>
                <Input id="brand-name" defaultValue="NXT Level Tech" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="brand-description">Brand Description</Label>
                <Input id="brand-description" defaultValue="Next generation technology solutions" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="brand-website">Brand Website</Label>
                <Input id="brand-website" defaultValue="https://nxtleveltech.com" />
              </div>
              <div className="flex items-center space-x-2 pt-4">
                <Switch id="auto-updates" />
                <Label htmlFor="auto-updates">Enable automatic brand analytics updates</Label>
              </div>
              <Button className="mt-4">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Notification Settings
              </CardTitle>
              <CardDescription>Configure when and how you receive brand-related notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="not-analytics" defaultChecked />
                <Label htmlFor="not-analytics">Analytics Reports</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="not-mentions" defaultChecked />
                <Label htmlFor="not-mentions">Brand Mentions</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="not-reviews" defaultChecked />
                <Label htmlFor="not-reviews">Reviews & Ratings</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="not-trends" />
                <Label htmlFor="not-trends">Market Trends</Label>
              </div>
              <Button className="mt-4">Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Security Settings
              </CardTitle>
              <CardDescription>Manage brand security and access controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="sec-2fa" defaultChecked />
                <Label htmlFor="sec-2fa">Two-factor authentication for brand reports</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="sec-sensitive" defaultChecked />
                <Label htmlFor="sec-sensitive">Protect sensitive brand data</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="sec-ip" />
                <Label htmlFor="sec-ip">IP restrictions for brand dashboard</Label>
              </div>
              <Button className="mt-4">Update Security Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="data" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2" />
                Data Management
              </CardTitle>
              <CardDescription>Manage brand data and analytics storage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="data-aggregation" defaultChecked />
                <Label htmlFor="data-aggregation">Aggregate brand analytics data</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="data-retention" defaultChecked />
                <Label htmlFor="data-retention">Extended data retention (12 months)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="data-integrations" />
                <Label htmlFor="data-integrations">Enable third-party data integrations</Label>
              </div>
              <div className="pt-4">
                <Button variant="outline" className="mr-2">Export All Brand Data</Button>
                <Button variant="destructive">Delete Brand Data</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BrandSettings;
