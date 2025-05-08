
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileDown, Database, Table, Download } from "lucide-react";
import { toast } from "sonner";

const ExportData = () => {
  const [exportFormat, setExportFormat] = useState<string>("csv");
  const [selectedDataSet, setSelectedDataSet] = useState<string>("costs");
  
  const handleExport = () => {
    toast.success(`Started export of ${selectedDataSet} data in ${exportFormat.toUpperCase()} format`);
    // In a real app, this would trigger an actual export
  };
  
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Export Data</h1>
        <p className="text-muted-foreground">Export your data in various formats for analysis or backup</p>
      </header>
      
      <Card>
        <CardHeader>
          <CardTitle>Data Export Tool</CardTitle>
          <CardDescription>Select data sets and formats to export your business data</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="data-sets" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="data-sets"><Database className="h-4 w-4 mr-2" />Data Sets</TabsTrigger>
              <TabsTrigger value="scheduled"><FileDown className="h-4 w-4 mr-2" />Scheduled Exports</TabsTrigger>
              <TabsTrigger value="history"><Table className="h-4 w-4 mr-2" />Export History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="data-sets" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Select Data Set</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="radio" 
                        id="costs" 
                        name="dataSet" 
                        value="costs"
                        checked={selectedDataSet === "costs"}
                        onChange={() => setSelectedDataSet("costs")}
                        className="h-4 w-4"
                      />
                      <label htmlFor="costs">Supplier Costs</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="radio" 
                        id="suppliers" 
                        name="dataSet" 
                        value="suppliers"
                        checked={selectedDataSet === "suppliers"}
                        onChange={() => setSelectedDataSet("suppliers")}
                        className="h-4 w-4"
                      />
                      <label htmlFor="suppliers">Suppliers</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="radio" 
                        id="pricing" 
                        name="dataSet" 
                        value="pricing"
                        checked={selectedDataSet === "pricing"}
                        onChange={() => setSelectedDataSet("pricing")}
                        className="h-4 w-4"
                      />
                      <label htmlFor="pricing">Pricing Data</label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Export Format</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="radio" 
                        id="csv" 
                        name="format" 
                        value="csv"
                        checked={exportFormat === "csv"}
                        onChange={() => setExportFormat("csv")}
                        className="h-4 w-4"
                      />
                      <label htmlFor="csv">CSV</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="radio" 
                        id="excel" 
                        name="format" 
                        value="excel"
                        checked={exportFormat === "excel"}
                        onChange={() => setExportFormat("excel")}
                        className="h-4 w-4"
                      />
                      <label htmlFor="excel">Excel</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="radio" 
                        id="json" 
                        name="format" 
                        value="json"
                        checked={exportFormat === "json"}
                        onChange={() => setExportFormat("json")}
                        className="h-4 w-4"
                      />
                      <label htmlFor="json">JSON</label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4 mt-4">
                <Button onClick={handleExport}>
                  <Download className="h-4 w-4 mr-2" />
                  Export {selectedDataSet} as {exportFormat.toUpperCase()}
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="scheduled">
              <div className="p-4 text-center border rounded-md">
                <p className="text-muted-foreground">No scheduled exports configured yet.</p>
                <Button variant="outline" className="mt-2">
                  Create Scheduled Export
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="history">
              <div className="p-4 text-center border rounded-md">
                <p className="text-muted-foreground">No export history available.</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExportData;
