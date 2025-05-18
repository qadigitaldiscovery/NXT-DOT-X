
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  User, Lock, Bell, Palette, Globe, Shield, 
  Save, RefreshCw, Trash2, Download
} from 'lucide-react';

// Mock user preferences
const mockUserPreferences = {
  notifications: {
    email: true,
    push: false,
    sms: false
  },
  appearance: {
    theme: 'system',
    compactMode: false,
    animationsEnabled: true
  },
  privacy: {
    shareData: false,
    allowTracking: false
  }
};

const Settings = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [userPrefs, setUserPrefs] = useState(mockUserPreferences);
  const [password, setPassword] = useState({ current: '', new: '', confirm: '' });
  const { toast } = useToast();

  const handleSaveAccount = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate successful save
    toast.success({
      title: "Account Updated",
      description: "Your account details have been successfully updated."
    });
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password.new !== password.confirm) {
      toast.error({
        title: "Password Error",
        description: "New passwords do not match. Please try again."
      });
      return;
    }
    
    if (password.new.length < 8) {
      toast.error({
        title: "Password Error",
        description: "Password must be at least 8 characters long."
      });
      return;
    }
    
    // Simulate successful password change
    toast.success({
      title: "Password Updated",
      description: "Your password has been successfully changed."
    });
    
    // Reset the form
    setPassword({ current: '', new: '', confirm: '' });
  };

  const toggleNotificationSetting = (key: keyof typeof userPrefs.notifications) => {
    setUserPrefs(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
  };

  const toggleAppearanceSetting = (key: keyof typeof userPrefs.appearance) => {
    setUserPrefs(prev => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        [key]: !prev.appearance[key]
      }
    }));
  };

  const togglePrivacySetting = (key: keyof typeof userPrefs.privacy) => {
    setUserPrefs(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: !prev.privacy[key]
      }
    }));
  };

  const handleExportData = () => {
    // Simulate export
    toast.success({
      title: "Data Export Requested",
      description: "Your data export is being processed. You will be notified when it's ready."
    });
  };

  const handleDeleteAccount = () => {
    // This would typically show a confirmation dialog
    toast.error({
      title: "Delete Account",
      description: "Please contact support to delete your account."
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="account" className="data-[state=active]:bg-muted data-[state=active]:text-foreground">
            <User className="mr-2 h-4 w-4" />
            Account
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-muted data-[state=active]:text-foreground">
            <Lock className="mr-2 h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-muted data-[state=active]:text-foreground">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="preferences" className="data-[state=active]:bg-muted data-[state=active]:text-foreground">
            <Palette className="mr-2 h-4 w-4" />
            Preferences
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Manage your personal account settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveAccount} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input type="text" id="firstName" defaultValue="John" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input type="text" id="lastName" defaultValue="Doe" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input type="email" id="email" defaultValue="john.doe@example.com" readOnly />
                </div>
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input type="text" id="username" defaultValue="johndoe" />
                </div>
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your account password for enhanced security
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input 
                    type="password" 
                    id="currentPassword" 
                    value={password.current}
                    onChange={(e) => setPassword(prev => ({ ...prev, current: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input 
                    type="password" 
                    id="newPassword" 
                    value={password.new}
                    onChange={(e) => setPassword(prev => ({ ...prev, new: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input 
                    type="password" 
                    id="confirmPassword" 
                    value={password.confirm}
                    onChange={(e) => setPassword(prev => ({ ...prev, confirm: e.target.value }))}
                  />
                </div>
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  Change Password
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>
                Add an extra layer of security to your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Two-factor authentication is currently disabled.
              </p>
              <Button variant="outline">
                <Shield className="mr-2 h-4 w-4" />
                Enable Two-Factor Authentication
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose how you receive updates and alerts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="emailNotifications">Email Notifications</Label>
                <Switch 
                  id="emailNotifications" 
                  checked={userPrefs.notifications.email}
                  onCheckedChange={() => toggleNotificationSetting('email')}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="pushNotifications">Push Notifications</Label>
                <Switch 
                  id="pushNotifications" 
                  checked={userPrefs.notifications.push}
                  onCheckedChange={() => toggleNotificationSetting('push')}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="smsNotifications">SMS Notifications</Label>
                <Switch 
                  id="smsNotifications" 
                  checked={userPrefs.notifications.sms}
                  onCheckedChange={() => toggleNotificationSetting('sms')}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize the look and feel of your application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="theme">Theme</Label>
                <Select defaultValue="system">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="system">System</SelectItem>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="compactMode">Compact Mode</Label>
                <Switch 
                  id="compactMode" 
                  checked={userPrefs.appearance.compactMode}
                  onCheckedChange={() => toggleAppearanceSetting('compactMode')}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="animationsEnabled">Animations Enabled</Label>
                <Switch 
                  id="animationsEnabled"
                  checked={userPrefs.appearance.animationsEnabled}
                  onCheckedChange={() => toggleAppearanceSetting('animationsEnabled')}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Regional Settings</CardTitle>
              <CardDescription>
                Set your preferred language and time zone
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="language">Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="timeZone">Time Zone</Label>
                <Select defaultValue="UTC">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a time zone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC">UTC</SelectItem>
                    <SelectItem value="EST">EST</SelectItem>
                    <SelectItem value="PST">PST</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>
                Control your data sharing and privacy options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="shareData">Share Usage Data</Label>
                <Switch 
                  id="shareData" 
                  checked={userPrefs.privacy.shareData}
                  onCheckedChange={() => togglePrivacySetting('shareData')}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="allowTracking">Allow Tracking</Label>
                <Switch 
                  id="allowTracking"
                  checked={userPrefs.privacy.allowTracking}
                  onCheckedChange={() => togglePrivacySetting('allowTracking')}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>
                Export or delete your personal data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={handleExportData}>
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </Button>
              <Button variant="destructive" onClick={handleDeleteAccount}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
