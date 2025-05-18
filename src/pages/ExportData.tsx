import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Download, 
  FileDown, 
  CheckCircle2, 
  Clock, 
  FileUp
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

// Mock data for export history
const exportHistoryData = [
  { 
    id: 1, 
    name: "Full Product Export", 
    date: "2025-05-02", 
    status: "Completed", 
    records: 2543,
    type: "ERP"
  },
  { 
    id: 2, 
    name: "Price Update Export", 
    date: "2025-05-01", 
    status: "Completed", 
    records: 185,
    type: "Website"
  },
  { 
    id: 3, 
    name: "New Products Export", 
    date: "2025-04-28", 
    status: "Completed", 
    records: 42,
    type: "ERP"
  },
];

// Mock data for exportable fields
const exportableFields = [
  { id: "sku", name: "SKU", default: true },
  { id: "name", name: "Product Name", default: true },
  { id: "supplier", name: "Supplier", default: true },
  { id: "cost", name: "Cost Price", default: true },
  { id: "discount", name: "Discount", default: true },
  { id: "retail", name: "Retail Price", default: true },
  { id: "margin", name: "Margin", default: false },
  { id: "competitorPrice", name: "Competitor Price", default: false },
  { id: "category", name: "Category", default: false },
  { id: "stock", name: "Stock Level", default: false },
  { id: "lastUpdated", name: "Last Updated", default: false },
  { id: "upc", name: "UPC/EAN", default: false },
];

// Mock export destinations
const exportDestinations = [
  { id: "erp", name: "ERP System" },
  { id: "website", name: "E-commerce Website" },
  { id: "csv", name: "CSV File" },
  { id: "excel", name: "Excel File" },
];

const ExportData = () => {
  const [selectedFields, setSelectedFields] = useState<string[]>(
    exportableFields.filter(field => field.default).map(field => field.id)
  );
  const [selectedDestination, setSelectedDestination] = useState("erp");
  const [exportName, setExportName] = useState("Product Data Export");
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handleFieldToggle = (fieldId: string) => {
    setSelectedFields(prev => 
      prev.includes(fieldId) 
        ? prev.filter(id => id !== fieldId)
        : [...prev, fieldId]
    );
  };

  const handleSelectAllFields = () => {
    setSelectedFields(exportableFields.map(field => field.id));
  };

  const handleClearFields = () => {
    setSelectedFields([]);
  };

  const handleExport = () => {
    if (selectedFields.length === 0) {
      toast.error({
        title: "Export Error",
        description: "Please select at least one field to export."
      });
      return;
    }

    setIsExporting(true);
    setProgress(0);

    // Simulate export progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 10;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExporting(false);
            toast.success({
              title: "Export Complete",
              description: `Your export "${exportName}" has been completed successfully.`
            });
          }, 500);
        }
        
        return newProgress;
      });
    }, 400);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Export Data</h1>
      
      <Tabs defaultValue="new-export">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="new-export">Create Export</TabsTrigger>
          <TabsTrigger value="export-history">Export History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="new-export" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create New Export</CardTitle>
              <CardDescription>
                Select data fields and export destination
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label className="text-base">Export Name</Label>
                  <input
                    type="text"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-2"
                    placeholder="Enter export name"
                    value={exportName}
                    onChange={(e) => setExportName(e.target.value)}
                  />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-base">Select Fields to Export</Label>
                    <div className="space-x-2">
                      <Button variant="outline" size="sm" onClick={handleSelectAllFields}>
                        Select All
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleClearFields}>
                        Clear
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                    {exportableFields.map(field => (
                      <div key={field.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={field.id} 
                          checked={selectedFields.includes(field.id)}
                          onCheckedChange={() => handleFieldToggle(field.id)}
                        />
                        <Label htmlFor={field.id}>{field.name}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label className="text-base" htmlFor="export-destination">Export Destination</Label>
                  <Select 
                    value={selectedDestination} 
                    onValueChange={setSelectedDestination}
                  >
                    <SelectTrigger className="w-full md:w-1/2 mt-2">
                      <SelectValue placeholder="Select export destination" />
                    </SelectTrigger>
                    <SelectContent>
                      {exportDestinations.map(destination => (
                        <SelectItem 
                          key={destination.id} 
                          value={destination.id}
                        >
                          {destination.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="text-base">Options</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="include-changed" />
                      <Label htmlFor="include-changed">Only include changed prices</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="include-new" defaultChecked />
                      <Label htmlFor="include-new">Include new products</Label>
                    </div>
                    {selectedDestination === "erp" && (
                      <div className="flex items-center space-x-2">
                        <Checkbox id="update-erp" defaultChecked />
                        <Label htmlFor="update-erp">Auto-update ERP system</Label>
                      </div>
                    )}
                    {selectedDestination === "website" && (
                      <div className="flex items-center space-x-2">
                        <Checkbox id="publish-immediately" />
                        <Label htmlFor="publish-immediately">Publish immediately</Label>
                      </div>
                    )}
                  </div>
                </div>
                
                {isExporting ? (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-base">Export Progress</Label>
                      <Progress value={progress} className="mt-2" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Exporting {selectedFields.length} fields to {exportDestinations.find(d => d.id === selectedDestination)?.name}...
                    </p>
                  </div>
                ) : (
                  <div className="flex justify-end">
                    <Button onClick={handleExport}>
                      <FileDown className="mr-2 h-4 w-4" />
                      Generate Export
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="export-history">
          <Card>
            <CardHeader>
              <CardTitle>Export History</CardTitle>
              <CardDescription>
                Previously generated exports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {exportHistoryData.map(export_ => (
                  <div 
                    key={export_.id} 
                    className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-md"
                  >
                    <div className="space-y-1 mb-4 md:mb-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{export_.name}</h3>
                        {export_.status === "Completed" ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                          <Clock className="h-4 w-4 text-amber-500" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {export_.date} · {export_.records} records · {export_.type}
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <FileUp className="mr-1 h-4 w-4" />
                        View Log
                      </Button>
                      <Button size="sm">
                        <Download className="mr-1 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExportData;
