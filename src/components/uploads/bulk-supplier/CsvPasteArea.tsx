
import React from 'react';
import { Textarea } from "@/components/ui/textarea";

interface CsvPasteAreaProps {
  value: string;
  onChange: (value: string) => void;
  isUploading: boolean;
}

export function CsvPasteArea({ value, onChange, isUploading }: CsvPasteAreaProps) {
  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Paste your CSV content here, including the headers 'name,code,contact_name,email,phone,website,payment_terms,status' in the first row"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={isUploading}
        rows={10}
        className="font-mono text-sm"
      />
      <div className="text-sm text-muted-foreground">
        <p>Example format:</p>
        <pre className="bg-secondary/20 p-2 rounded-md overflow-auto mt-1">
          name,code,contact_name,email,phone,website,payment_terms,status{'\n'}
          Acme Supplies,ACME001,John Doe,john@acme.com,+1-555-123-4567,https://acme.com,Net 30,active{'\n'}
          GlobalTech,GTECH002,Jane Smith,jane@globaltech.com,+1-555-987-6543,https://globaltech.com,Net 45,active
        </pre>
      </div>
    </div>
  );
}
