
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileTypeIcon } from "../FileTypeIcon";
import { FileSize } from "../FileSize";

type FilePreviewProps = {
  file: File | null;
  onDetectedSupplier?: (supplierName: string) => void;
};

export function FilePreview({ file, onDetectedSupplier }: FilePreviewProps) {
  const [previewContent, setPreviewContent] = useState<string | null>(null);
  const [extractedSupplier, setExtractedSupplier] = useState<string | null>(null);
  
  useEffect(() => {
    if (!file) {
      setPreviewContent(null);
      setExtractedSupplier(null);
      return;
    }
    
    // For CSV, TXT files - we can extract and show a preview
    if (file.type === 'text/csv' || file.type === 'text/plain' || file.name.endsWith('.csv')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result?.toString() || '';
        setPreviewContent(content.slice(0, 500) + (content.length > 500 ? '...' : ''));
        
        // Simple extraction of potential supplier name from first few lines
        const lines = content.split('\n').slice(0, 10);
        extractSupplierInfo(lines);
      };
      reader.readAsText(file);
    } 
    // For Excel files - we can't preview content, but can show file info
    else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
      setPreviewContent('Excel file preview not available');
      // TODO: In a real implementation, we would use a library like SheetJS to extract data
      // For now, let's try to extract from filename
      const possibleName = file.name
        .replace(/\.(xlsx|xls)$/, '')
        .replace(/[_-]cost[_-]?list/i, '')
        .replace(/[_-]price[_-]?list/i, '')
        .replace(/[_-]catalog/i, '');
      
      if (possibleName && possibleName !== file.name) {
        setExtractedSupplier(possibleName);
        if (onDetectedSupplier) onDetectedSupplier(possibleName);
      }
    }
    // For PDFs - we can't easily extract content in the browser
    else if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
      setPreviewContent('PDF preview not available');
      // Try to extract from filename
      const possibleName = file.name
        .replace(/\.pdf$/, '')
        .replace(/[_-]cost[_-]?list/i, '')
        .replace(/[_-]price[_-]?list/i, '')
        .replace(/[_-]catalog/i, '');
      
      if (possibleName && possibleName !== file.name) {
        setExtractedSupplier(possibleName);
        if (onDetectedSupplier) onDetectedSupplier(possibleName);
      }
    }
  }, [file, onDetectedSupplier]);
  
  const extractSupplierInfo = (lines: string[]) => {
    // Look for common patterns that might indicate supplier information
    // This is a simplified approach - a real system would be more sophisticated
    
    const supplierIndicators = [
      /supplier\s*:\s*(.*)/i,
      /vendor\s*:\s*(.*)/i,
      /company\s*:\s*(.*)/i,
      /from\s*:\s*(.*)/i,
      /manufacturer\s*:\s*(.*)/i
    ];
    
    for (const line of lines) {
      for (const pattern of supplierIndicators) {
        const match = line.match(pattern);
        if (match && match[1] && match[1].trim()) {
          setExtractedSupplier(match[1].trim());
          if (onDetectedSupplier) onDetectedSupplier(match[1].trim());
          return;
        }
      }
    }
    
    // If we couldn't find a specific supplier indicator, try the first line
    // which often contains the company name in cost files
    if (lines.length > 0 && lines[0].trim()) {
      const firstLine = lines[0].trim();
      setExtractedSupplier(firstLine);
      if (onDetectedSupplier) onDetectedSupplier(firstLine);
    }
  };
  
  if (!file) return null;
  
  return (
    <Card className="mt-4">
      <CardContent className="pt-4">
        <div className="flex items-center gap-2 mb-2">
          <FileTypeIcon fileType={file.type} fileName={file.name} />
          <span className="font-medium">{file.name}</span>
          <FileSize bytes={file.size} />
        </div>
        
        {extractedSupplier && (
          <div className="mb-3 mt-2">
            <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200">
              Detected Supplier: {extractedSupplier}
            </Badge>
          </div>
        )}
        
        {previewContent && (
          <div className="mt-3">
            <h4 className="text-sm font-medium mb-1">File Preview:</h4>
            <div className="bg-muted p-2 rounded-md text-xs overflow-auto max-h-40 whitespace-pre-wrap font-mono">
              {previewContent}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
