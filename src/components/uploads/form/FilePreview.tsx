
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileTypeIcon } from "../FileTypeIcon";
import { FileSize } from "../FileSize";
import { ExcelService } from '@/utils/excel';

type FilePreviewProps = {
  file: File | null;
  onDetectedSupplier?: (supplierName: string) => void;
};

type ExcelData = Array<{[key: string]: string | number | boolean | Date | null}>;

export function FilePreview({ file, onDetectedSupplier }: FilePreviewProps) {
  const [previewContent, setPreviewContent] = useState<string | null>(null);
  const [extractedSupplier, setExtractedSupplier] = useState<string | null>(null);

  const extractSupplierFromExcel = (jsonData: ExcelData): boolean => {
    if (jsonData.length > 0) {
      const firstRow = jsonData[0];
      const headers = Object.keys(firstRow);
      
      // Look for supplier information in headers
      const supplierHeaderIndex = headers ? 
        headers.findIndex(header => 
          String(header).toLowerCase().includes('supplier') ||
          String(header).toLowerCase().includes('vendor') ||
          String(header).toLowerCase().includes('manufacturer')
        ) : -1;
      
      if (supplierHeaderIndex !== -1 && firstRow) {
        const headerName = headers[supplierHeaderIndex];
        const supplierName = firstRow[headerName];
        if (supplierName) {
          setExtractedSupplier(String(supplierName));
          if (onDetectedSupplier) onDetectedSupplier(String(supplierName));
          return true;
        }
      }
    }
    return false;
  };

  const extractSupplierFromFilename = (filename: string): boolean => {
    const possibleName = filename
      .replace(/\.(xlsx|xls|pdf|csv)$/, '')
      .replace(/[_-]cost[_-]?list/i, '')
      .replace(/[_-]price[_-]?list/i, '')
      .replace(/[_-]catalog/i, '');
    
    if (possibleName && possibleName !== filename) {
      setExtractedSupplier(possibleName);
      if (onDetectedSupplier) onDetectedSupplier(possibleName);
      return true;
    }
    return false;
  };

  const extractSupplierFromText = (lines: string[]): boolean => {
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
          return true;
        }
      }
    }
    
    if (lines.length > 0 && lines[0].trim()) {
      const firstLine = lines[0].trim();
      setExtractedSupplier(firstLine);
      if (onDetectedSupplier) onDetectedSupplier(firstLine);
      return true;
    }
    return false;
  };
  
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
        
        const lines = content.split('\n').slice(0, 10);
        if (!extractSupplierFromText(lines)) {
          extractSupplierFromFilename(file.name);
        }
      };
      reader.readAsText(file);
    } 
    // For Excel files - use ExcelJS to extract and preview content
    else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
      const processExcelFile = async () => {
        try {
          const jsonData = await ExcelService.readExcelFile(file);
          
          // Create preview from the first few rows
          const previewRows = jsonData.slice(0, 5).map(row => 
            Object.values(row).join('\t')
          );
          setPreviewContent(previewRows.join('\n'));
          
          if (!extractSupplierFromExcel(jsonData)) {
            extractSupplierFromFilename(file.name);
          }
        } catch (err) {
          console.error('Error parsing Excel file:', err);
          setPreviewContent('Error reading Excel file');
          extractSupplierFromFilename(file.name);
        }
      };
      
      processExcelFile();
    }
    // For PDFs - we can't easily extract content in the browser
    else if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
      setPreviewContent('PDF preview not available');
      extractSupplierFromFilename(file.name);
    }
  }, [file, onDetectedSupplier]);
  
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
