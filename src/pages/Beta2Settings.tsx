
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const Beta2Settings = () => {
  const navigate = useNavigate();
  const [saving, setSaving] = React.useState(false);
  
  const handleSave = () => {
    setSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      toast.success('Program settings saved successfully');
    }, 800);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Program Settings</h1>
          <p className="text-muted-foreground">Configure your loyalty program settings.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate('/prototypes')}>
            Back to Selector
          </Button>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
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
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Member Communications</CardTitle>
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
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Tier Configuration</CardTitle>
          <CardDescription>Configure membership tiers and benefits</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="tier-system">Tier System</Label>
              <Select defaultValue="points-based">
                <SelectTrigger>
                  <SelectValue placeholder="Select tier system" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="points-based">Points Based</SelectItem>
                  <SelectItem value="visit-based">Visit Based</SelectItem>
                  <SelectItem value="spend-based">Spend Based</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tier-reset">Tier Reset Period</Label>
              <Select defaultValue="annual">
                <SelectTrigger>
                  <SelectValue placeholder="Select reset period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="never">Never</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="annual">Annual</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="birthday-bonus">Birthday Bonus</Label>
              <p className="text-sm text-muted-foreground">
                Offer bonus points on member birthdays
              </p>
            </div>
            <Switch id="birthday-bonus" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="referral-bonus">Referral Bonus</Label>
              <p className="text-sm text-muted-foreground">
                Reward members for successful referrals
              </p>
            </div>
            <Switch id="referral-bonus" defaultChecked />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline">Reset to Defaults</Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Beta2Settings;
