
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SyncSetting } from './types';

interface SyncSettingItemProps {
  id: string;
  title: string;
  description: string;
  setting?: SyncSetting;
  isLoading: boolean;
  onToggle: (isEnabled: boolean) => void;
  onFrequencyChange: (frequency: string) => void;
}

const SyncSettingItem: React.FC<SyncSettingItemProps> = ({
  id,
  title,
  description,
  setting,
  isLoading,
  onToggle,
  onFrequencyChange
}) => {
  const isEnabled = setting?.is_enabled ?? false;
  const frequency = setting?.sync_frequency || 'daily';
  const lastSyncedAt = setting?.last_synced_at;

  return (
    <div className="border p-4 rounded-md">
      <div className="flex items-start space-x-3">
        <Checkbox 
          id={`sync-${id}`} 
          checked={isEnabled}
          onCheckedChange={(checked) => onToggle(checked === true)}
          disabled={isLoading}
        />
        <div className="flex-1">
          <Label htmlFor={`sync-${id}`} className="text-base font-medium">{title}</Label>
          <p className="text-sm text-muted-foreground">{description}</p>
          
          {isEnabled && (
            <div className="mt-2">
              <div className="flex items-center space-x-2">
                <Label htmlFor={`${id}-sync-frequency`} className="text-sm w-32">Sync frequency:</Label>
                <Select 
                  value={frequency} 
                  onValueChange={(value) => onFrequencyChange(value)}
                  disabled={isLoading}
                >
                  <SelectTrigger id={`${id}-sync-frequency`} className="w-36">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {lastSyncedAt && (
                <p className="text-xs text-muted-foreground mt-1">
                  Last synced: {new Date(lastSyncedAt).toLocaleString()}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SyncSettingItem;
