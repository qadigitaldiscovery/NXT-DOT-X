
import React from 'react';
import { Label } from "@/components/ui/label";
import { SAMPLE_CSV } from './SampleCsvSection';

interface CsvPasteAreaProps {
  value: string;
  onChange: (value: string) => void;
  isUploading: boolean;
}

export function CsvPasteArea({ value, onChange, isUploading }: CsvPasteAreaProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="csv-text">Paste CSV Content</Label>
      <textarea
        id="csv-text"
        className="min-h-[200px] w-full rounded-md border border-input bg-background p-3 text-sm font-mono"
        placeholder={SAMPLE_CSV}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={isUploading}
      />
    </div>
  );
}
