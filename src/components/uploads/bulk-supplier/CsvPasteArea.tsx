
import React from 'react';
import { Textarea } from "@/components/ui/textarea";

interface CsvPasteAreaProps {
  value: string;
  onChange: (value: string) => void;
  isUploading: boolean;
}

export function CsvPasteArea({ value, onChange, isUploading }: CsvPasteAreaProps) {
  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">
        Paste CSV content here. Make sure the first row contains headers.
      </p>
      <Textarea
        placeholder="name,code,contact_name,email,phone,website,payment_terms,status"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={isUploading}
        className="h-[200px] font-mono text-sm"
      />
    </div>
  );
}
