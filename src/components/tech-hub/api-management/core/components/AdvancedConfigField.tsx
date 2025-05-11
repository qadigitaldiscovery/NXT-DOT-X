
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AdvancedConfigFieldProps {
  configKey: string;
  configValue: any;
  onUpdate: (key: string, value: any) => void;
}

export const AdvancedConfigField: React.FC<AdvancedConfigFieldProps> = ({
  configKey,
  configValue,
  onUpdate
}) => {
  // Determine the field type based on the value type
  const valueType = typeof configValue;
  
  switch (valueType) {
    case 'boolean':
      return (
        <div className="flex items-center space-x-2">
          <Switch 
            id={configKey} 
            checked={configValue} 
            onCheckedChange={(checked) => onUpdate(configKey, checked)} 
          />
          <Label htmlFor={configKey} className="capitalize">
            {configKey.replace(/_/g, ' ')}
          </Label>
        </div>
      );
      
    case 'number':
      if (configKey.includes('temperature') || (configValue >= 0 && configValue <= 1)) {
        return (
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor={configKey} className="capitalize">{configKey.replace(/_/g, ' ')}</Label>
              <span className="text-sm">{configValue.toFixed(1)}</span>
            </div>
            <Slider 
              id={configKey}
              min={0} 
              max={1} 
              step={0.1} 
              value={[configValue]} 
              onValueChange={(values) => onUpdate(configKey, values[0])} 
            />
          </div>
        );
      } else if (configKey.includes('max_tokens') || configKey.includes('limit')) {
        return (
          <div className="space-y-2">
            <Label htmlFor={configKey} className="capitalize">{configKey.replace(/_/g, ' ')}</Label>
            <Input
              id={configKey}
              type="number"
              value={configValue}
              onChange={(e) => onUpdate(configKey, parseInt(e.target.value) || 0)}
              className="w-full"
            />
          </div>
        );
      }
      // For other number types
      return (
        <div className="space-y-2">
          <Label htmlFor={configKey} className="capitalize">{configKey.replace(/_/g, ' ')}</Label>
          <Input
            id={configKey}
            type="number"
            value={configValue}
            onChange={(e) => onUpdate(configKey, parseFloat(e.target.value) || 0)}
            className="w-full"
          />
        </div>
      );
      
    case 'string':
      if (configKey === 'response_format') {
        return (
          <div className="space-y-2">
            <Label htmlFor={configKey} className="capitalize">{configKey.replace(/_/g, ' ')}</Label>
            <Select 
              value={configValue} 
              onValueChange={(value) => onUpdate(configKey, value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="json_object">JSON Object</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
      }
      // For other string types
      return (
        <div className="space-y-2">
          <Label htmlFor={configKey} className="capitalize">{configKey.replace(/_/g, ' ')}</Label>
          <Input
            id={configKey}
            type="text"
            value={configValue}
            onChange={(e) => onUpdate(configKey, e.target.value)}
            className="w-full"
          />
        </div>
      );
      
    default:
      return null;
  }
};
