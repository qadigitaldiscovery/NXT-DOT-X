
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { File, Mail, FileSpreadsheet, FileText, FileImage, FileArchive } from "lucide-react";

interface FileTypeIconProps {
  fileName: string;
  fileType: string;
}

export function FileTypeIcon({ fileName, fileType }: FileTypeIconProps) {
  const getFileIcon = (fileName: string, fileType: string) => {
    // Check file extension
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    if (extension === 'eml' || fileType.includes('message') || fileType.includes('email')) return 'EML';
    if (fileType.includes('csv')) return 'CSV';
    if (fileType.includes('excel') || fileType.includes('xlsx') || fileType.includes('xls') || extension === 'xlsx' || extension === 'xls') return 'XLS';
    if (fileType.includes('pdf') || extension === 'pdf') return 'PDF';
    if (fileType.includes('image') || ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension || '')) return 'IMG';
    if (fileType.includes('zip') || fileType.includes('archive') || ['zip', 'rar', '7z', 'tar', 'gz'].includes(extension || '')) return 'ZIP';
    return 'FILE';
  };

  const fileTypeLabel = getFileIcon(fileName, fileType);
  
  const getIcon = () => {
    switch (fileTypeLabel) {
      case 'EML': return <Mail className="h-4 w-4" />;
      case 'XLS': return <FileSpreadsheet className="h-4 w-4" />;
      case 'PDF': return <FileText className="h-4 w-4" />;
      case 'IMG': return <FileImage className="h-4 w-4" />;
      case 'ZIP': return <FileArchive className="h-4 w-4" />;
      default: return <File className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="bg-muted rounded p-1.5">
        {getIcon()}
      </div>
      <span className="font-medium">{fileName}</span>
      <Badge variant="outline" className="ml-1">{fileTypeLabel}</Badge>
    </div>
  );
}
