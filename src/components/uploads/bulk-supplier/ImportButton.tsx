
import React from 'react';
import { Button } from "@/components/ui/button";
import { Upload, Loader2 } from "lucide-react";

interface ImportButtonProps {
  onSubmit: () => void;
  isUploading: boolean;
  isDisabled: boolean;
}

export function ImportButton({ onSubmit, isUploading, isDisabled }: ImportButtonProps) {
  return (
    <Button
      onClick={onSubmit}
      disabled={isDisabled || isUploading}
      className="w-full"
    >
      {isUploading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Importing...
        </>
      ) : (
        <>
          <Upload className="mr-2 h-4 w-4" />
          Import Suppliers
        </>
      )}
    </Button>
  );
}
