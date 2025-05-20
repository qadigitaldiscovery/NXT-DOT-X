
import React from 'react';
import { Upload, Loader2 } from "lucide-react";

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
      className={`w-full inline-flex items-center text-sm font-medium text-primary-foreground ${
        isDisabled || isUploading 
          ? "opacity-50 pointer-events-none" 
          : "hover:text-primary-foreground/80 hover:underline"
      }`}
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
