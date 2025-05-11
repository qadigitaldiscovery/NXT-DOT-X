
import React from 'react';
import { Label } from "@/components/ui/label";

interface ModelOption {
  value: string;
  label: string;
}

interface ModelSelectorProps {
  modelOptions: ModelOption[];
  selectedModel: string;
  onModelChange: (value: string) => void;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({
  modelOptions,
  selectedModel,
  onModelChange
}) => {
  if (modelOptions.length === 0) {
    return null;
  }
  
  return (
    <div className="space-y-2 pt-4">
      <Label>Preferred Model</Label>
      <div className="grid grid-cols-2 gap-2">
        {modelOptions.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <input
              type="radio"
              id={option.value}
              name="model"
              value={option.value}
              checked={selectedModel === option.value}
              onChange={() => onModelChange(option.value)}
              className="h-4 w-4 text-blue-600"
            />
            <Label htmlFor={option.value} className="text-sm cursor-pointer">
              {option.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};
