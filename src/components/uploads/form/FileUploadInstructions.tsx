
import React from 'react';
import { UploadCloud } from 'lucide-react';

interface FileUploadInstructionsProps {
  isUploading: boolean;
}

export function FileUploadInstructions({ isUploading }: FileUploadInstructionsProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <UploadCloud className="h-10 w-10 text-muted-foreground mb-2" />
      <p className="text-sm text-muted-foreground mb-2">
        Drag and drop your file here, or click to browse
      </p>
      <p className="text-xs text-muted-foreground mb-4">
        Supports CSV, Excel (.xlsx, .xls), and PDF files
      </p>
    </div>
  );
}
