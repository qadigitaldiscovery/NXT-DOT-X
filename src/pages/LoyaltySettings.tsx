
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const LoyaltySettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Program Settings</h1>
        <p className="text-muted-foreground">Configure your loyalty program settings.</p>
      </div>
      
      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="tiers">Member Tiers</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integration">Integrations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Program Details</CardTitle>
              <CardDescription>Basic configuration for your loyalty program</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="program-name">Program Name</Label>
                <Input id="program-name" defaultValue="Premium Rewards Club" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="point-name">Point Name</Label>
                <Input id="point-name" defaultValue="Stars" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="conversion-rate">Points Conversion Rate</Label>
                <Select defaultValue="10">
                  <SelectTrigger>
                    <SelectValue placeholder="Select rate" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">$1 = 5 points</SelectItem>
                    <SelectItem value="10">$1 = 10 points</SelectItem>
                    <SelectItem value="20">$1 = 20 points</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <Switch id="program-active" defaultChecked />
                <Label htmlFor="program-active">Program Active</Label>
              </div>
              
              <div className="pt-4">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tiers" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Member Tiers</CardTitle>
              <CardDescription>Configure membership levels and benefits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <h3 className="font-semibold mb-2">Bronze</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Point Threshold</Label>
                      <Input defaultValue="0" />
                    </div>
                    <div>
                      <Label>Multiplier</Label>
                      <Input defaultValue="1x" />
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="font-semibold mb-2">Silver</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Point Threshold</Label>
                      <Input defaultValue="1000" />
                    </div>
                    <div>
                      <Label>Multiplier</Label>
                      <Input defaultValue="1.2x" />
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="font-semibold mb-2">Gold</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Point Threshold</Label>
                      <Input defaultValue="5000" />
                    </div>
                    <div>
                      <Label>Multiplier</Label>
                      <Input defaultValue="1.5x" />
                    </div>
                  </div>
                </div>
                
                <Button variant="outline">
                  Add New Tier
                </Button>
                
                <div className="pt-4">
                  <Button>Save Tier Settings</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure member notifications and emails</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="welcome-email">Welcome Email</Label>
                  <p className="text-sm text-muted-foreground">
                    Send welcome email to new members
                  </p>
                </div>
                <Switch id="welcome-email" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="points-update">Points Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Notify members when points balance changes
                  </p>
                </div>
                <Switch id="points-update" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="reward-expiry">Reward Expiry Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Alert members before rewards expire
                  </p>
                </div>
                <Switch id="reward-expiry" defaultChecked />
              </div>
              
              <div className="pt-4">
                <Button>Save Notification Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="integration" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Integration Settings</CardTitle>
              <CardDescription>Connect your loyalty program with other services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-md p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">POS Integration</h3>
                    <p className="text-sm text-muted-foreground">Connect with your Point of Sale system</p>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">CRM Integration</h3>
                    <p className="text-sm text-muted-foreground">Connect with your Customer Relationship Management system</p>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Email Marketing</h3>
                    <p className="text-sm text-muted-foreground">Connect with your email marketing platform</p>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
              </div>
              
              <div className="pt-4">
                <Button>Save Integration Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LoyaltySettings;
