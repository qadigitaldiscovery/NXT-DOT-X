
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UploadCloud, AlertCircle, Download, Info } from 'lucide-react';
import { useCreateBulkSuppliers } from '@/hooks/use-suppliers';
import { toast } from 'sonner';

const SAMPLE_CSV = `name,code,contact_name,email,phone,website,payment_terms,status
"Audio Solutions","AUD001","John Smith","john@audiosolutions.com","+27 21 555 0101","audiosolutions.com","Net 30","active"
"Visual Technology","VIS002","Sarah Jones","sarah@visualtech.co.za","+27 11 555 0202","visualtech.co.za","Net 45","active"
"Sound Equipment Ltd","SND003","Michael Brown","michael@soundequip.com","+27 31 555 0303","soundequip.com","Cash on Delivery","active"
`;

export function BulkSupplierUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [csvText, setCsvText] = useState('');
  const [activeTab, setActiveTab] = useState<'upload' | 'paste'>('upload');
  
  const { mutate: createBulkSuppliers } = useCreateBulkSuppliers();
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };
  
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
      setFile(event.dataTransfer.files[0]);
    }
  };
  
  const downloadTemplate = () => {
    const blob = new Blob([SAMPLE_CSV], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'supplier_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  
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
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>CSV Format</AlertTitle>
          <AlertDescription>
            The CSV file should have the following headers: name, code, contact_name, email, phone, website, payment_terms, status.
            <Button 
              variant="link" 
              className="p-0 h-auto text-sm" 
              onClick={downloadTemplate}
            >
              Download template <Download className="h-3 w-3 ml-1" />
            </Button>
          </AlertDescription>
        </Alert>
        
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'upload' | 'paste')}>
          <TabsList className="grid grid-cols-2 w-[400px] mx-auto">
            <TabsTrigger value="upload">Upload CSV</TabsTrigger>
            <TabsTrigger value="paste">Paste CSV</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="mt-4">
            <div
              className={`border-2 border-dashed rounded-lg p-6 ${
                dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
              } transition-colors`}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center justify-center text-center">
                <UploadCloud className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  Drag and drop your CSV file here, or click to browse
                </p>
                <input
                  id="csv-file"
                  type="file"
                  className="hidden"
                  accept=".csv"
                  onChange={handleFileChange}
                  disabled={isUploading}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={isUploading}
                  onClick={() => document.getElementById('csv-file')?.click()}
                >
                  Select CSV File
                </Button>
              </div>
              {file && (
                <div className="mt-4 p-2 bg-muted rounded-md">
                  <p className="text-sm flex items-center gap-2">
                    <span className="font-medium">Selected:</span>
                    {file.name}
                    <span className="text-muted-foreground">
                      ({Math.round(file.size / 1024)} KB)
                    </span>
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="paste" className="mt-4">
            <div className="space-y-2">
              <Label htmlFor="csv-text">Paste CSV Content</Label>
              <textarea
                id="csv-text"
                className="min-h-[200px] w-full rounded-md border border-input bg-background p-3 text-sm font-mono"
                placeholder={SAMPLE_CSV}
                value={csvText}
                onChange={(e) => setCsvText(e.target.value)}
                disabled={isUploading}
              />
            </div>
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
