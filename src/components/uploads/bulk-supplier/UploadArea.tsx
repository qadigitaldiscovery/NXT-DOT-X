
import React, { useState, useCallback } from 'react';
import { Upload } from 'lucide-react';
import { toast } from 'sonner';

export interface UploadAreaProps {
  onFileUpload: (fileContent: string) => void;
}

export const UploadArea: React.FC<UploadAreaProps> = ({ onFileUpload }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  }, []);

  const processFile = (file: File) => {
    if (!file.name.toLowerCase().endsWith('.csv')) {
      toast.error('Please upload a CSV file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      onFileUpload(content);
    };
    reader.onerror = () => {
      toast.error('Failed to read the file');
    };
    reader.readAsText(file);
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-colors ${
        isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => document.getElementById('file-input')?.click()}
    >
      <Upload className="h-12 w-12 text-gray-400 mb-4" />
      <p className="text-gray-600 text-center mb-2">
        {isDragging ? 'Drop your CSV file here' : 'Drag & drop your CSV file here'}
      </p>
      <p className="text-gray-500 text-sm text-center">or click to browse</p>
      <input
        id="file-input"
        type="file"
        className="hidden"
        accept=".csv"
        onChange={handleFileInput}
      />
    </div>
  );
};

export default UploadArea;
