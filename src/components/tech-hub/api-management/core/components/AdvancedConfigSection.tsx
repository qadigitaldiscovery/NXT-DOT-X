
import React from 'react';
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { AdvancedConfigField } from "./AdvancedConfigField";
import { cn } from "@/lib/utils";

export interface AdvancedConfigSectionProps {
  title: string;
  description?: string;
  config: Record<string, any>;
  onUpdate: (key: string, value: any) => void;
  fieldDefinitions: Array<{
    key: string;
    label?: string;
    type: "string" | "number" | "boolean" | "select";
    options?: string[];
  }>;
  className?: string;
}

export function AdvancedConfigSection({
  title,
  description,
  config,
  onUpdate,
  fieldDefinitions,
  className,
}: AdvancedConfigSectionProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <div>
        <Label className="text-base">{title}</Label>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      <Separator />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fieldDefinitions.map((field) => (
          <AdvancedConfigField
            key={field.key}
            configKey={field.key}
            configLabel={field.label}
            type={field.type}
            value={config[field.key]}
            onUpdate={onUpdate}
            options={field.options}
          />
        ))}
      </div>
    </div>
  );
}
