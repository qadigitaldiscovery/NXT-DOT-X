import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileDown, FileText, Table, FileSpreadsheet, Settings, Calendar, Clock, Plus, AlertCircle, RefreshCw } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ExcelService } from '@/utils/excel';

const ExportData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [exporting, setExporting] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('standard');
  
  // Simulate loading data
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 600));
      } catch (err) {
        console.error('Error loading export configurations:', err);
        setError('Failed to load export configurations. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  // Handle download action
  const handleDownload = (exportType: string) => {
    try {
      setExporting(exportType);
      
      // Sample data for demonstration - in a real app this would come from an API
      const sampleData = Array(10).fill(null).map((_, i) => ({
        id: i + 1,
        name: `Item ${i + 1}`,
        category: ['Category A', 'Category B', 'Category C'][i % 3],
        price: Math.round(Math.random() * 100 + 10),
        inStock: Math.random() > 0.3,
        lastUpdated: new Date().toISOString().split('T')[0]
      }));
      
      // Export to Excel using ExcelService
      ExcelService.exportToExcel(sampleData, `${exportType}-${new Date().toISOString().slice(0, 10)}`)
        .then(() => {
          toast.success(`${exportType} exported successfully`);
          setExporting(null);
        })
        .catch(err => {
          console.error(`Error exporting ${exportType}:`, err);
          toast.error(`Failed to export ${exportType}. Please try again.`);
          setExporting(null);
        });
    } catch (err) {
      toast.error(`Failed to export ${exportType}. Please try again.`);
      console.error(`Error exporting ${exportType}:`, err);
      setExporting(null);
    }
  };
  
  // Handle custom export
  const handleCustomExport = () => {
    try {
      setExporting('custom');
      
      // Generate custom export data based on selected fields
      // This is a simplified example - in a real app, this would be dynamic
      const customData = Array(5).fill(null).map((_, i) => ({
        name: `Custom Item ${i + 1}`,
        contact: `contact${i+1}@example.com`,
        email: `info${i+1}@example.com`,
        phone: `+1 (555) ${100 + i * 111}`,
      }));
      
      // Export to Excel using ExcelService
      ExcelService.exportToExcel(customData, `custom-export-${new Date().toISOString().slice(0, 10)}`)
        .then(() => {
          toast.success('Custom export generated successfully');
          setExporting(null);
        })
        .catch(err => {
          console.error('Error generating custom export:', err);
          toast.error('Failed to generate custom export. Please try again.');
          setExporting(null);
        });
    } catch (err) {
      toast.error('Failed to generate custom export. Please try again.');
      console.error('Error generating custom export:', err);
      setExporting(null);
    }
  };
  
  // Handle schedule creation
  const handleCreateSchedule = () => {
    try {
      toast.success('New schedule created successfully');
    } catch (err) {
      toast.error('Failed to create schedule. Please try again.');
      console.error('Error creating schedule:', err);
    }
  };
  
  // Handle refresh
  const handleRefresh = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast.success('Export configurations refreshed');
    } catch (err) {
      setError('Failed to refresh export configurations. Please try again.');
      toast.error('Failed to refresh data');
      console.error('Error refreshing data:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Export Data</h1>
          <p className="text-gray-600">Export and download data from the system</p>
        </div>
        <Button variant="outline" onClick={handleRefresh}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>
      
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <Tabs defaultValue="standard" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="standard">Standard Exports</TabsTrigger>
          <TabsTrigger value="custom">Custom Exports</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Exports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="standard">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center mb-2">
                  <FileText className="h-6 w-6 mr-2 text-blue-500" />
                  <CardTitle>Supplier Data</CardTitle>
                </div>
                <CardDescription>Export complete supplier directory with details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="supplier-format">Export Format</Label>
                    <Select defaultValue="excel">
                      <SelectTrigger id="supplier-format">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="pdf">PDF</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    className="w-full" 
                    onClick={() => handleDownload('Supplier Data')}
                    disabled={exporting === 'Supplier Data'}
                  >
                    {exporting === 'Supplier Data' ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Exporting...
                      </>
                    ) : (
                      <>
                        <FileDown className="mr-2 h-4 w-4" /> Download
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center mb-2">
                  <Table className="h-6 w-6 mr-2 text-green-500" />
                  <CardTitle>Pricing Data</CardTitle>
                </div>
                <CardDescription>Export pricing data and history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="price-format">Export Format</Label>
                    <Select defaultValue="excel">
                      <SelectTrigger id="price-format">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="pdf">PDF</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    className="w-full"
                    onClick={() => handleDownload('Pricing Data')}
                    disabled={exporting === 'Pricing Data'}
                  >
                    {exporting === 'Pricing Data' ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Exporting...
                      </>
                    ) : (
                      <>
                        <FileDown className="mr-2 h-4 w-4" /> Download
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center mb-2">
                  <FileSpreadsheet className="h-6 w-6 mr-2 text-purple-500" />
                  <CardTitle>Cost Analysis Report</CardTitle>
                </div>
                <CardDescription>Export cost analysis and metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cost-format">Export Format</Label>
                    <Select defaultValue="excel">
                      <SelectTrigger id="cost-format">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="pdf">PDF</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    className="w-full"
                    onClick={() => handleDownload('Cost Analysis Report')}
                    disabled={exporting === 'Cost Analysis Report'}
                  >
                    {exporting === 'Cost Analysis Report' ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Exporting...
                      </>
                    ) : (
                      <>
                        <FileDown className="mr-2 h-4 w-4" /> Download
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="custom">
          <Card>
            <CardHeader>
              <CardTitle>Custom Data Export</CardTitle>
              <CardDescription>Configure a custom data export with specific fields and filters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="data-source">Data Source</Label>
                  <Select defaultValue="suppliers">
                    <SelectTrigger id="data-source">
                      <SelectValue placeholder="Select data source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="suppliers">Suppliers</SelectItem>
                      <SelectItem value="customers">Customers</SelectItem>
                      <SelectItem value="pricing">Pricing</SelectItem>
                      <SelectItem value="costs">Cost Data</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-3">Select Fields</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="field1" />
                      <Label htmlFor="field1">ID</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="field2" defaultChecked />
                      <Label htmlFor="field2">Name</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="field3" defaultChecked />
                      <Label htmlFor="field3">Contact</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="field4" defaultChecked />
                      <Label htmlFor="field4">Email</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="field5" defaultChecked />
                      <Label htmlFor="field5">Phone</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="field6" />
                      <Label htmlFor="field6">Address</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="field7" />
                      <Label htmlFor="field7">Status</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="field8" />
                      <Label htmlFor="field8">Created Date</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="field9" />
                      <Label htmlFor="field9">Last Updated</Label>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <Label htmlFor="export-format">Export Format</Label>
                    <Select defaultValue="excel">
                      <SelectTrigger id="export-format">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="json">JSON</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="include-headers">Include Headers</Label>
                    <Select defaultValue="yes">
                      <SelectTrigger id="include-headers">
                        <SelectValue placeholder="Include headers" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <Button 
                    className="flex-1" 
                    variant="outline"
                    onClick={() => toast.info('Export configuration reset')}
                  >
                    Reset
                  </Button>
                  <Button 
                    className="flex-1"
                    onClick={handleCustomExport}
                    disabled={exporting === 'custom'}
                  >
                    {exporting === 'custom' ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Generating...
                      </>
                    ) : (
                      <>
                        <FileDown className="mr-2 h-4 w-4" /> Generate & Download
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="scheduled">
          <Card>
            <CardHeader className="flex justify-between items-start">
              <div>
                <CardTitle>Scheduled Exports</CardTitle>
                <CardDescription>Configure automated exports on a schedule</CardDescription>
              </div>
              <Button size="sm" onClick={handleCreateSchedule}>
                <Plus className="h-4 w-4 mr-2" /> New Schedule
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-md">
                      <Clock className="h-5 w-5 text-blue-700" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium">Weekly Supplier Export</h3>
                      <p className="text-sm text-gray-500">Every Monday at 8:00 AM</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => toast.info('Edit schedule options')}
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => toast.success('Schedule disabled')}
                    >
                      Disable
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center">
                    <div className="bg-green-100 p-2 rounded-md">
                      <Calendar className="h-5 w-5 text-green-700" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium">Monthly Financial Report</h3>
                      <p className="text-sm text-gray-500">1st of every month at 7:00 AM</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => toast.info('Edit schedule options')}
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => toast.success('Schedule disabled')}
                    >
                      Disable
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center">
                    <div className="bg-orange-100 p-2 rounded-md">
                      <Calendar className="h-5 w-5 text-orange-700" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium">Quarterly Cost Analysis</h3>
                      <p className="text-sm text-gray-500">Last day of quarter at 11:00 PM</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => toast.info('Edit schedule options')}
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => toast.success('Schedule disabled')}
                    >
                      Disable
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExportData;
