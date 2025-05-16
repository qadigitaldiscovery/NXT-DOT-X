import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileDown, FileText, Table, FileSpreadsheet, Settings, Calendar, Clock, Plus } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const ExportData = () => {
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Export Data</h1>
          <p className="text-gray-600">Export and download data from the system</p>
        </div>
      </div>
      
      <Tabs defaultValue="standard" className="w-full">
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
                      <SelectTrigger>
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="pdf">PDF</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full"><FileDown className="mr-2 h-4 w-4" /> Download</Button>
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
                      <SelectTrigger>
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="pdf">PDF</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full"><FileDown className="mr-2 h-4 w-4" /> Download</Button>
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
                      <SelectTrigger>
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="pdf">PDF</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full"><FileDown className="mr-2 h-4 w-4" /> Download</Button>
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
                  <Label>Data Source</Label>
                  <Select defaultValue="suppliers">
                    <SelectTrigger>
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
                    <Label>Export Format</Label>
                    <Select defaultValue="excel">
                      <SelectTrigger>
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
                    <Label>Include Headers</Label>
                    <Select defaultValue="yes">
                      <SelectTrigger>
                        <SelectValue placeholder="Include headers" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button className="w-full"><FileDown className="mr-2 h-4 w-4" /> Generate & Download</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="scheduled">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Exports</CardTitle>
              <CardDescription>Configure automated exports on a schedule</CardDescription>
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
                    <Button variant="outline" size="sm"><Settings className="h-4 w-4" /></Button>
                    <Button variant="destructive" size="sm">Disable</Button>
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
                    <Button variant="outline" size="sm"><Settings className="h-4 w-4" /></Button>
                    <Button variant="destructive" size="sm">Disable</Button>
                  </div>
                </div>
                
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Create New Scheduled Export
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExportData;
