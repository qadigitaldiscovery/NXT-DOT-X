
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Save } from 'lucide-react';

export const DefaultCustomerSettings = () => {
  const [settings, setSettings] = useState({
    defaultStatus: 'active',
    defaultAccountType: 'standard',
    defaultCurrency: 'USD',
    defaultPaymentTerms: 'Net 30'
  });

  const handleChange = (field: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving default customer settings:', settings);
    toast.success('Default customer settings saved successfully');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="defaultStatus">Default Status</Label>
          <Select 
            value={settings.defaultStatus}
            onValueChange={(value) => handleChange('defaultStatus', value)}
          >
            <SelectTrigger id="defaultStatus">
              <SelectValue placeholder="Select default status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="defaultAccountType">Default Account Type</Label>
          <Select 
            value={settings.defaultAccountType}
            onValueChange={(value) => handleChange('defaultAccountType', value)}
          >
            <SelectTrigger id="defaultAccountType">
              <SelectValue placeholder="Select default account type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
              <SelectItem value="enterprise">Enterprise</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="defaultCurrency">Default Currency</Label>
          <Select 
            value={settings.defaultCurrency}
            onValueChange={(value) => handleChange('defaultCurrency', value)}
          >
            <SelectTrigger id="defaultCurrency">
              <SelectValue placeholder="Select default currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">US Dollar (USD)</SelectItem>
              <SelectItem value="EUR">Euro (EUR)</SelectItem>
              <SelectItem value="GBP">British Pound (GBP)</SelectItem>
              <SelectItem value="JPY">Japanese Yen (JPY)</SelectItem>
              <SelectItem value="CAD">Canadian Dollar (CAD)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="defaultPaymentTerms">Default Payment Terms</Label>
          <Input
            id="defaultPaymentTerms"
            value={settings.defaultPaymentTerms}
            onChange={(e) => handleChange('defaultPaymentTerms', e.target.value)}
            placeholder="e.g., Net 30"
          />
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  );
};
