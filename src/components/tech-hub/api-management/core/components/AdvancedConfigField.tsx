
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface AdvancedConfigFieldProps {
  configKey: string;
  configLabel?: string;
  type: "string" | "number" | "boolean" | "select";
  value: any;
  onUpdate: (key: string, value: any) => void;
  options?: string[];
  className?: string;
}

export function AdvancedConfigField({
  configKey,
  configLabel,
  type,
  value,
  onUpdate,
  options = [],
  className
}: AdvancedConfigFieldProps) {
  const handleCheckboxChange = (checked: boolean) => {
    onUpdate(configKey, checked);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = type === "number" ? Number(e.target.value) : e.target.value;
    onUpdate(configKey, newValue);
  };

  const handleSelectChange = (values: string) => {
    onUpdate(configKey, values);
  };

  const label = configLabel || configKey;

  return (
    <div className={cn("space-y-1", className)}>
      {type !== "boolean" && (
        <Label htmlFor={`config-${configKey}`} className="text-sm">
          {label}
        </Label>
      )}

      {type === "boolean" && (
        <div className="flex items-center space-x-2">
          <Checkbox
            id={`config-${configKey}`}
            checked={value}
            onCheckedChange={handleCheckboxChange}
          />
          <Label htmlFor={`config-${configKey}`} className="text-sm">
            {label}
          </Label>
        </div>
      )}

      {type === "string" && (
        <Input
          id={`config-${configKey}`}
          value={value || ""}
          onChange={handleInputChange}
          className="h-8 text-sm"
        />
      )}

      {type === "number" && (
        <Input
          id={`config-${configKey}`}
          type="number"
          value={value || 0}
          onChange={handleInputChange}
          className="h-8 text-sm"
        />
      )}

      {type === "select" && options.length > 0 && (
        <Select value={value} onValueChange={handleSelectChange}>
          <SelectTrigger id={`config-${configKey}`} className="h-8 text-sm">
            <SelectValue placeholder={`Select ${label}`} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
