import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from '@/lib/utils';

interface AdvancedConfigFieldProps {
  label: string;
  type: 'toggle' | 'text' | 'textarea' | 'select' | 'multiselect';
  value?: boolean | string | string[];
  onChange?: (value: boolean | string | string[]) => void;
  options?: string[];
  className?: string;
}

export const AdvancedConfigField: React.FC<AdvancedConfigFieldProps> = ({
  label,
  type,
  value,
  onChange,
  options,
  className
}) => {
  const handleToggleChange = (checked: boolean) => {
    onChange && onChange(checked);
  };

  const handleValueChange = (values: string[]) => {
    onChange && onChange(values);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Label htmlFor={label}>{label}</Label>
      {type === 'toggle' && (
        <Switch 
          id={label} 
          checked={typeof value === 'boolean' ? value : false} 
          onCheckedChange={handleToggleChange} 
        />
      )}
      {type === 'text' && (
        <Input 
          type="text" 
          id={label} 
          value={typeof value === 'string' ? value : ''} 
          onChange={(e) => onChange && onChange(e.target.value)} 
        />
      )}
      {type === 'textarea' && (
        <Input
          as="textarea"
          id={label}
          value={typeof value === 'string' ? value : ''}
          onChange={(e) => onChange && onChange(e.target.value)}
        />
      )}
      {type === 'select' && options && (
        <select 
          id={label} 
          value={typeof value === 'string' ? value : ''} 
          onChange={(e) => onChange && onChange(e.target.value)}
          className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      )}
      {type === 'multiselect' && options && (
        <select
          id={label}
          multiple
          value={Array.isArray(value) ? value : []}
          onChange={(e) => {
            const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
            handleValueChange(selectedOptions);
          }}
          className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      )}
    </div>
  );
};
