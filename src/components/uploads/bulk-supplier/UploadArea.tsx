
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { UploadCloud } from 'lucide-react';

interface UploadAreaProps {
  onFileSelected: (file: File) => void;
  isUploading: boolean;
  selectedFile: File | null;
}

export function UploadArea({ onFileSelected, isUploading, selectedFile }: UploadAreaProps) {
  const [dragActive, setDragActive] = useState(false);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onFileSelected(event.target.files[0]);
    }
  };
  
  const handleDrag = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    if (event.type === 'dragenter' || event.type === 'dragover') {
      setDragActive(true);
    } else if (event.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
    
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      onFileSelected(event.dataTransfer.files[0]);
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-6 ${
        dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
      } transition-colors`}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center text-center">
        <UploadCloud className="h-10 w-10 text-muted-foreground mb-2" />
        <p className="text-sm text-muted-foreground mb-2">
          Drag and drop your CSV file here, or click to browse
        </p>
        <input
          id="csv-file"
          type="file"
          className="hidden"
          accept=".csv"
          onChange={handleFileChange}
          disabled={isUploading}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={isUploading}
          onClick={() => document.getElementById('csv-file')?.click()}
        >
          Select CSV File
        </Button>
      </div>
      {selectedFile && (
        <div className="mt-4 p-2 bg-muted rounded-md">
          <p className="text-sm flex items-center gap-2">
            <span className="font-medium">Selected:</span>
            {selectedFile.name}
            <span className="text-muted-foreground">
              ({Math.round(selectedFile.size / 1024)} KB)
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
