
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { AdvancedConfigField } from "./AdvancedConfigField";

interface AdvancedConfigSectionProps {
  config: Record<string, any>;
  onConfigUpdate: (key: string, value: any) => void;
}

export const AdvancedConfigSection: React.FC<AdvancedConfigSectionProps> = ({
  config,
  onConfigUpdate
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  return (
    <div className="space-y-4 pt-4">
      <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium">Advanced Configuration Options</h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="space-y-4 pt-4">
          {Object.entries(config).map(([key, value]) => (
            <div key={key}>
              <AdvancedConfigField
                configKey={key}
                configValue={value}
                onUpdate={onConfigUpdate}
              />
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
