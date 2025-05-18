
import { useState, ChangeEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';

interface AdvancedConfigFieldProps {
  configKey: string;
  label: string;
  type?: 'text' | 'number' | 'boolean' | 'select';
  value: any;
  onChange: (key: string, value: any) => void;
  options?: string[];
  description?: string;
}

export const AdvancedConfigField = ({
  configKey,
  label,
  type = 'text',
  value,
  onChange,
  options,
  description
}: AdvancedConfigFieldProps) => {
  const handleValueChange = (newValue: any) => {
    onChange(configKey, newValue);
  };

  // Boolean toggle handler
  const handleBooleanChange = (checked: boolean) => {
    handleValueChange(checked);
  };

  // Text/number input handler
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = type === 'number' ? parseFloat(e.target.value) : e.target.value;
    handleValueChange(val);
  };

  // Select handler
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    handleValueChange(e.target.value);
  };

  return (
    <Card className="p-3 mb-3">
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium">{label}</label>
          
          {type === 'boolean' ? (
            <Switch 
              checked={value} 
              onCheckedChange={handleBooleanChange} 
            />
          ) : type === 'select' && options ? (
            <select
              id={configKey}
              value={value}
              onChange={handleSelectChange}
              className="border rounded p-1 text-sm"
            >
              {options.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          ) : (
            <Input
              id={configKey}
              value={value}
              onChange={handleInputChange}
              type={type}
              className="w-40 text-sm"
            />
          )}
        </div>
        
        {description && (
          <p className="text-xs text-gray-500">{description}</p>
        )}
      </div>
    </Card>
  );
};
