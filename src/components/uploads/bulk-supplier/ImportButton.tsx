
import React from 'react';
import { Upload, Loader2 } from "lucide-react";
import { cn } from '@/lib/utils';

interface ImportButtonProps {
  onSubmit: () => void;
  isUploading: boolean;
  isDisabled: boolean;
}

export function ImportButton({ onSubmit, isUploading, isDisabled }: ImportButtonProps) {
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        if (!isDisabled && !isUploading) {
          onSubmit();
        }
      }}
      className={cn(
        "w-full inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 hover:underline",
        (isDisabled || isUploading) ? "opacity-50 pointer-events-none" : ""
      )}
      aria-label="Import suppliers"
    >
      {isUploading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
          Importing...
        </>
      ) : (
        <>
          <Upload className="mr-2 h-4 w-4" aria-hidden="true" />
          Import Suppliers
        </>
      )}
    </a>
  );
}
