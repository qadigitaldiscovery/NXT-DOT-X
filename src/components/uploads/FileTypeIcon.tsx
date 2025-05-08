
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { File } from "lucide-react";

interface FileTypeIconProps {
  fileName: string;
  fileType: string;
}

export function FileTypeIcon({ fileName, fileType }: FileTypeIconProps) {
  const getFileIcon = (fileType: string) => {
    if (fileType.includes('csv')) return 'CSV';
    if (fileType.includes('excel') || fileType.includes('xlsx') || fileType.includes('xls')) return 'XLS';
    if (fileType.includes('pdf')) return 'PDF';
    return 'FILE';
  };

  return (
    <div className="flex items-center gap-2">
      <div className="bg-muted rounded p-1.5">
        <File className="h-4 w-4" />
      </div>
      <span className="font-medium">{fileName}</span>
      <Badge variant="outline" className="ml-1">{getFileIcon(fileType)}</Badge>
    </div>
  );
}
