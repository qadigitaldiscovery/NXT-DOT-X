
import React, { useState } from 'react';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UploadCloud } from 'lucide-react';
import { useCreateBulkSuppliers } from '@/hooks/use-suppliers';
import { toast } from 'sonner';

// Import the new components
import { SampleCsvSection } from './bulk-supplier/SampleCsvSection';
import { UploadArea } from './bulk-supplier/UploadArea';
import { CsvPasteArea } from './bulk-supplier/CsvPasteArea';

export function BulkSupplierUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [csvText, setCsvText] = useState('');
  const [activeTab, setActiveTab] = useState<'upload' | 'paste'>('upload');
  
  const { mutate: createBulkSuppliers } = useCreateBulkSuppliers();
  
  const handleSubmit = async () => {
    try {
      setIsUploading(true);
      
      let content: string;
      if (activeTab === 'upload') {
        if (!file) {
          toast.error('Please select a CSV file');
          setIsUploading(false);
          return;
        }
        content = await file.text();
      } else {
        if (!csvText.trim()) {
          toast.error('Please paste CSV content');
          setIsUploading(false);
          return;
        }
        content = csvText;
      }
      
      // Process the CSV
      createBulkSuppliers(
        { csvData: content },
        {
          onSuccess: (result) => {
            toast.success(`Successfully imported ${result.count} suppliers`);
            setFile(null);
            setCsvText('');
            setIsUploading(false);
          },
          onError: (error: any) => {
            toast.error(`Error importing suppliers: ${error.message || 'Unknown error'}`);
            setIsUploading(false);
          }
        }
      );
    } catch (error: any) {
      toast.error(`Error processing CSV: ${error.message || 'Unknown error'}`);
      setIsUploading(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bulk Supplier Import</CardTitle>
        <CardDescription>
          Import multiple suppliers at once by uploading a CSV file or pasting CSV data
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <SampleCsvSection />
        
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'upload' | 'paste')}>
          <TabsList className="grid grid-cols-2 w-[400px] mx-auto">
            <TabsTrigger value="upload">Upload CSV</TabsTrigger>
            <TabsTrigger value="paste">Paste CSV</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="mt-4">
            <UploadArea 
              onFileSelected={setFile} 
              isUploading={isUploading} 
              selectedFile={file}
            />
          </TabsContent>
          
          <TabsContent value="paste" className="mt-4">
            <CsvPasteArea 
              value={csvText}
              onChange={setCsvText}
              isUploading={isUploading}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={handleSubmit}
          disabled={(activeTab === 'upload' && !file) || (activeTab === 'paste' && !csvText.trim()) || isUploading}
          loading={isUploading}
        >
          <UploadCloud className="h-4 w-4 mr-2" />
          {isUploading ? 'Importing...' : 'Import Suppliers'}
        </Button>
      </CardFooter>
    </Card>
  );
}
