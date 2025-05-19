import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

export function DefaultCustomerSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Default Settings</CardTitle>
        <CardDescription>Default settings for new customer profiles</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="defaultStatus">Default Status</Label>
            <Select defaultValue="active">
              <SelectTrigger id="defaultStatus">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="defaultCreditLimit">Default Credit Limit</Label>
            <Input id="defaultCreditLimit" type="number" defaultValue="1000" placeholder="e.g., 1000" />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="autoApprove">Auto-approve New Customers</Label>
              <p className="text-xs text-muted-foreground">Automatically approve new customer accounts</p>
            </div>
            <Switch id="autoApprove" defaultChecked={false} />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="emailNotifications">Email Notifications</Label>
              <p className="text-xs text-muted-foreground">Send welcome email to new customers</p>
            </div>
            <Switch id="emailNotifications" defaultChecked={true} />
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button>Save Settings</Button>
        </div>
      </CardContent>
    </Card>
  );
}
