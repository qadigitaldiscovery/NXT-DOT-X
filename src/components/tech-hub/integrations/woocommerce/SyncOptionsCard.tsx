
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { Label } from "../../../../components/ui/label";
import { toast } from "sonner";

interface SyncOption {
  id: string;
  label: string;
  description: string;
}

const syncOptions: SyncOption[] = [
  {
    id: 'sync-products',
    label: 'Products',
    description: 'Sync product catalog, variations, and pricing'
  },
  {
    id: 'sync-orders',
    label: 'Orders',
    description: 'Sync order data, status updates, and fulfillment'
  },
  {
    id: 'sync-customers',
    label: 'Customers',
    description: 'Sync customer profiles and purchase history'
  }
];

const SyncOptionsCard: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  // In a real implementation, we would check the connection status from a parent component
  // or a context, but for now, we'll assume it's connected for the UI demo
  
  const handleSyncOptionToggle = (optionId: string) => {
    setSelectedOptions(prev => 
      prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };
  
  const handleStartSync = () => {
    if (selectedOptions.length === 0) {
      toast.warning("Please select at least one option to synchronize");
      return;
    }
    // TODO: Implement actual sync functionality
    toast.info(`Starting synchronization for: ${selectedOptions.join(', ')}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Import/Export Options</CardTitle>
        <CardDescription>
          Configure what data to synchronize between systems
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {syncOptions.map((option) => (
            <div key={option.id} className="flex items-start space-x-2">
              <input 
                type="checkbox" 
                id={option.id} 
                className="mt-1" 
                disabled={!isConnected} 
                checked={selectedOptions.includes(option.id)}
                onChange={() => handleSyncOptionToggle(option.id)}
                aria-label={option.label}
              />
              <div>
                <Label htmlFor={option.id} className="text-base">{option.label}</Label>
                <p className="text-sm text-muted-foreground">
                  {option.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="secondary" 
          disabled={!isConnected || selectedOptions.length === 0}
          onClick={handleStartSync}
        >
          Start Synchronization
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SyncOptionsCard;
