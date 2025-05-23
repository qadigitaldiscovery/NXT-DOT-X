
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Upload, FileSpreadsheet } from 'lucide-react';
import { useBulkCreateSuppliers } from '@/hooks/suppliers/use-bulk-create-suppliers';
import { SampleCsvSection } from './SampleCsvSection';

export function BulkSupplierUpload() {
  const [csvData, setCsvData] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { bulkCreateSuppliers, isLoading } = useBulkCreateSuppliers();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    },
    multiple: false,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        await processFile(acceptedFiles[0]);
      }
    }
  });

  const processFile = async (file: File) => {
    setIsProcessing(true);
    try {
      const text = await file.text();
      const rows = text.split('\n').map(row => row.split(','));
      
      if (rows.length < 2) {
        toast.error('CSV file must contain at least a header row and one data row');
        return;
      }

      const headers = rows[0].map(h => h.trim());
      const dataRows = rows.slice(1).filter(row => row.some(cell => cell.trim()));

      const suppliers = dataRows.map((row, index) => {
        const supplier: Record<string, any> = {};
        headers.forEach((header, i) => {
          supplier[header.toLowerCase().replace(/\s+/g, '_')] = row[i]?.trim() || '';
        });
        
        // Ensure required fields
        return {
          name: supplier.name || `Supplier ${index + 1}`,
          code: supplier.code || `SUP${Date.now()}${index}`,
          email: supplier.email || null,
          phone: supplier.phone || null,
          website: supplier.website || null,
          status: supplier.status || 'active',
          contact_name: supplier.contact_name || null,
          payment_terms: supplier.payment_terms || null
        };
      });

      setCsvData(suppliers);
      toast.success(`Processed ${suppliers.length} suppliers from CSV`);
    } catch (error) {
      console.error('Error processing file:', error);
      toast.error('Error processing CSV file');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBulkCreate = async () => {
    if (csvData.length === 0) {
      toast.error('No data to upload');
      return;
    }

    const result = await bulkCreateSuppliers(csvData);
    if (result.data) {
      setCsvData([]);
      toast.success('Suppliers created successfully');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            Bulk Supplier Upload
          </CardTitle>
          <CardDescription>
            Upload a CSV file to create multiple suppliers at once
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            {isDragActive ? (
              <p>Drop the CSV file here...</p>
            ) : (
              <div>
                <p className="text-lg font-medium">Drag & drop a CSV file here</p>
                <p className="text-sm text-gray-500 mt-1">or click to select a file</p>
              </div>
            )}
          </div>

          {csvData.length > 0 && (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800">
                  Ready to create {csvData.length} suppliers
                </p>
              </div>
              <Button 
                onClick={handleBulkCreate}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? 'Creating Suppliers...' : `Create ${csvData.length} Suppliers`}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <SampleCsvSection />
    </div>
  );
}
