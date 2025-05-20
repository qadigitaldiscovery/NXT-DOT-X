
import React, { useState } from 'react';
import { FileUploadInstructions } from './FileUploadInstructions';

interface DropZoneProps {
  onFileChange: (file: File) => void;
  selectedFile: File | null;
  isUploading: boolean;
}

export function DropZone({ onFileChange, selectedFile, isUploading }: DropZoneProps) {
  const [dragActive, setDragActive] = useState(false);
  
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
      onFileChange(event.dataTransfer.files[0]);
    }
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onFileChange(event.target.files[0]);
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
      <FileUploadInstructions isUploading={isUploading} />
      
      <input
        id="file"
        name="file"
        type="file"
        className="hidden"
        accept="*/*" 
        onChange={handleFileChange}
        disabled={isUploading}
      />
      <label 
        htmlFor="file" 
        className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 hover:underline cursor-pointer"
        aria-label="Select file to upload"
      >
        Select File
      </label>
      
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
