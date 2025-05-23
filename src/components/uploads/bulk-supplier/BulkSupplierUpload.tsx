
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import UploadArea from './UploadArea';
import CsvPasteArea from './CsvPasteArea';
import SampleCsvSection from './SampleCsvSection';
import { useBulkCreateSuppliers } from '@/hooks/suppliers';

const BulkSupplierUpload: React.FC = () => {
  const [csvData, setCsvData] = useState<string | null>(null);
  const [uploadMethod, setUploadMethod] = useState<'file' | 'paste'>('file');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const bulkCreateMutation = useBulkCreateSuppliers();

  const handleCsvData = (data: string) => {
    setCsvData(data);
    toast.info('CSV data loaded. Ready to process.');
  };

  const processData = async () => {
    if (!csvData) {
      toast.error('No CSV data to process');
      return;
    }

    try {
      setIsProcessing(true);
      
      // Parse CSV data
      const lines = csvData.trim().split('\n');
      const headers = lines[0].split(',').map(header => header.trim().toLowerCase());
      
      // Validate required columns
      const requiredColumns = ['name', 'code'];
      const missingColumns = requiredColumns.filter(col => !headers.includes(col));
      
      if (missingColumns.length > 0) {
        toast.error(`Missing required columns: ${missingColumns.join(', ')}`);
        return;
      }
      
      const suppliers = [];
      
      // Process each line (skip header)
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        const values = line.split(',').map(val => val.trim());
        const supplier: Record<string, any> = {};
        
        // Map values to supplier object
        headers.forEach((header, index) => {
          if (values[index]) supplier[header] = values[index];
        });
        
        // Set default status if not provided
        if (!supplier.status) supplier.status = 'active';
        
        suppliers.push(supplier);
      }
      
      if (suppliers.length === 0) {
        toast.error('No valid supplier data found in CSV');
        return;
      }
      
      // Send to API
      await bulkCreateMutation.mutateAsync(suppliers);
      
      // Reset state
      setCsvData(null);
      toast.success(`Successfully processed ${suppliers.length} suppliers`);
      
    } catch (error) {
      console.error('Error processing CSV:', error);
      toast.error('Failed to process supplier data');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Bulk Supplier Upload</CardTitle>
        <CardDescription>
          Upload multiple suppliers at once using a CSV file
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs value={uploadMethod} onValueChange={(val) => setUploadMethod(val as 'file' | 'paste')}>
          <TabsList className="grid grid-cols-2 w-[400px]">
            <TabsTrigger value="file">Upload File</TabsTrigger>
            <TabsTrigger value="paste">Paste Data</TabsTrigger>
          </TabsList>
          
          <TabsContent value="file" className="mt-4">
            <UploadArea onFileUpload={handleCsvData} />
          </TabsContent>
          
          <TabsContent value="paste" className="mt-4">
            <CsvPasteArea onPaste={handleCsvData} />
          </TabsContent>
        </Tabs>
        
        {/* Action buttons */}
        <div className="flex justify-end space-x-4 mt-4">
          <Button 
            variant="outline" 
            onClick={() => setCsvData(null)}
            disabled={!csvData || isProcessing}
          >
            Reset
          </Button>
          <Button 
            onClick={processData}
            disabled={!csvData || isProcessing}
            className="min-w-[120px]"
          >
            {isProcessing ? 'Processing...' : 'Process Data'}
          </Button>
        </div>
        
        {/* Sample CSV format */}
        <SampleCsvSection />
      </CardContent>
    </Card>
  );
};

export default BulkSupplierUpload;
