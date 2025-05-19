
import React from 'react';
import { Button } from "@/components/ui/button";
import { UploadCloud } from 'lucide-react';

interface ImportButtonProps {
  onSubmit: () => void;
  isUploading: boolean;
  isDisabled: boolean;
}

export function ImportButton({ onSubmit, isUploading, isDisabled }: ImportButtonProps) {
  return (
    <Button
      className="w-full"
      onClick={onSubmit}
      disabled={isDisabled || isUploading}
      {...(isUploading && { "aria-busy": true })}
    >
      <UploadCloud className="h-4 w-4 mr-2" />
      {isUploading ? 'Importing...' : 'Import Suppliers'}
    </Button>
  );
}
