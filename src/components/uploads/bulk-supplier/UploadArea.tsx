
import React from 'react';
import { Upload, File, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UploadAreaProps {
  onFileSelected: (file: File | null) => void;
  isUploading: boolean;
  selectedFile: File | null;
}

export function UploadArea({ onFileSelected, isUploading, selectedFile }: UploadAreaProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && !file.name.toLowerCase().endsWith('.csv')) {
      alert('Please select a CSV file');
      return;
    }
    onFileSelected(file);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (!file.name.toLowerCase().endsWith('.csv')) {
        alert('Please select a CSV file');
        return;
      }
      onFileSelected(file);
    }
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  return (
    <div 
      className={`border-2 border-dashed rounded-lg p-8 text-center ${
        isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary cursor-pointer'
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={() => {
        if (!isUploading && !selectedFile) {
          document.getElementById('file-upload')?.click();
        }
      }}
    >
      <input
        type="file"
        id="file-upload"
        accept=".csv"
        className="hidden"
        onChange={handleFileChange}
        disabled={isUploading}
      />
      
      {selectedFile ? (
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 p-2 bg-secondary/20 rounded-md">
            <File className="h-6 w-6 text-primary" />
            <span className="font-medium">{selectedFile.name}</span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                onFileSelected(null);
              }}
              disabled={isUploading}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            {(selectedFile.size / 1024).toFixed(1)} KB
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Upload className="h-6 w-6 text-primary" />
          </div>
          <p className="font-medium">
            Drag & drop your CSV file here or click to browse
          </p>
          <p className="text-sm text-muted-foreground">
            File should be a CSV with required headers
          </p>
        </div>
      )}
    </div>
  );
}
