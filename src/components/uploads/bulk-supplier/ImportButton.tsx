
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
      className={`w-full inline-flex items-center justify-center rounded-md text-sm font-medium py-2 px-4 ${
        isDisabled || isUploading 
          ? "opacity-50 pointer-events-none bg-primary text-primary-foreground" 
          : "bg-primary text-primary-foreground hover:bg-primary/90"
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
