
import React, { useState } from 'react';
import { Settings as SettingsIcon, User, Bell, Lock, Database, Globe } from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const { toast } = useToast();
  const [profileData, setProfileData] = useState({
    name: "Admin User",
    email: "admin@nxtleveltech.com",
    company: "NXT LEVEL TECH",
    role: "Administrator"
  });
  
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    weekly: true,
    marketing: false
  });

  const [appearance, setAppearance] = useState({
    compactView: false,
    showTotals: true,
    enableAnimations: true,
    highContrastMode: false
  });

  const [dataSync, setDataSync] = useState({
    autoSync: true,
    syncInterval: "60",
    syncOnStartup: true
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully."
    });
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleAppearanceChange = (key: keyof typeof appearance) => {
    setAppearance(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleDataSyncUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Data sync settings updated",
      description: "Your data synchronization preferences have been saved."
    });
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center mb-6">
        <SettingsIcon className="h-6 w-6 mr-2 text-primary" />
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>
      
      <div className="mb-6">
        <p className="text-muted-foreground">
          Configure your DOT-X Data Management Platform settings and preferences.
        </p>
      </div>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">Appearance</span>
          </TabsTrigger>
          <TabsTrigger value="data" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span className="hidden sm:inline">Data Sync</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your account profile details and information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate}>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="name">Name</Label>
                    <Input 
                      id="name" 
                      value={profileData.name} 
                      onChange={e => setProfileData({...profileData, name: e.target.value})} 
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={profileData.email} 
                      onChange={e => setProfileData({...profileData, email: e.target.value})} 
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="company">Company</Label>
                    <Input 
                      id="company" 
                      value={profileData.company} 
                      onChange={e => setProfileData({...profileData, company: e.target.value})} 
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="role">Role</Label>
                    <Input 
                      id="role" 
                      value={profileData.role} 
                      onChange={e => setProfileData({...profileData, role: e.target.value})}
                      disabled 
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleProfileUpdate}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Manage how you receive notifications and alerts.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch 
                    checked={notifications.email}
                    onCheckedChange={() => handleNotificationChange('email')} 
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive push notifications on your device
                    </p>
                  </div>
                  <Switch 
                    checked={notifications.push}
                    onCheckedChange={() => handleNotificationChange('push')} 
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Weekly Reports</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive weekly summary reports
                    </p>
                  </div>
                  <Switch 
                    checked={notifications.weekly}
                    onCheckedChange={() => handleNotificationChange('weekly')} 
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Marketing Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive marketing and product updates
                    </p>
                  </div>
                  <Switch 
                    checked={notifications.marketing}
                    onCheckedChange={() => handleNotificationChange('marketing')} 
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => toast({
                  title: "Notification settings updated",
                  description: "Your notification preferences have been saved."
                })}
              >
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize how the DOT-X platform looks and feels.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Compact View</Label>
                    <p className="text-sm text-muted-foreground">
                      Display more data with a compact layout
                    </p>
                  </div>
                  <Switch 
                    checked={appearance.compactView}
                    onCheckedChange={() => handleAppearanceChange('compactView')} 
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show Totals</Label>
                    <p className="text-sm text-muted-foreground">
                      Display summary totals at the bottom of tables
                    </p>
                  </div>
                  <Switch 
                    checked={appearance.showTotals}
                    onCheckedChange={() => handleAppearanceChange('showTotals')} 
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Animations</Label>
                    <p className="text-sm text-muted-foreground">
                      Show animations for transitions and data loading
                    </p>
                  </div>
                  <Switch 
                    checked={appearance.enableAnimations}
                    onCheckedChange={() => handleAppearanceChange('enableAnimations')} 
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>High Contrast Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Increase contrast for better visibility
                    </p>
                  </div>
                  <Switch 
                    checked={appearance.highContrastMode}
                    onCheckedChange={() => handleAppearanceChange('highContrastMode')} 
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => toast({
                title: "Appearance settings updated",
                description: "Your display preferences have been saved."
              })}>
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="data">
          <Card>
            <CardHeader>
              <CardTitle>Data Synchronization</CardTitle>
              <CardDescription>
                Configure how and when data synchronizes with external systems.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleDataSyncUpdate}>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Automatic Synchronization</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically sync data with ERP systems
                      </p>
                    </div>
                    <Switch 
                      checked={dataSync.autoSync}
                      onCheckedChange={() => setDataSync({...dataSync, autoSync: !dataSync.autoSync})} 
                    />
                  </div>
                  <Separator />
                  <div className="grid gap-3">
                    <Label htmlFor="syncInterval">Sync Interval (minutes)</Label>
                    <Input 
                      id="syncInterval" 
                      type="number"
                      value={dataSync.syncInterval} 
                      onChange={e => setDataSync({...dataSync, syncInterval: e.target.value})}
                      disabled={!dataSync.autoSync} 
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Sync on Startup</Label>
                      <p className="text-sm text-muted-foreground">
                        Perform data sync when application starts
                      </p>
                    </div>
                    <Switch 
                      checked={dataSync.syncOnStartup}
                      onCheckedChange={() => setDataSync({...dataSync, syncOnStartup: !dataSync.syncOnStartup})} 
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset to Defaults</Button>
              <Button onClick={handleDataSyncUpdate}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your account security and password.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-3">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Two-factor Authentication</h3>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account by enabling two-factor authentication.
                </p>
                <Button variant="outline">Enable 2FA</Button>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Sessions</h3>
                <p className="text-sm text-muted-foreground">
                  Manage your active sessions and sign out from other devices.
                </p>
                <Button variant="outline">Manage Sessions</Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => toast({
                title: "Security settings updated",
                description: "Your password has been changed successfully."
              })}>
                Update Password
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
