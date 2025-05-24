
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { Download, FileText, Table, BarChart3 } from 'lucide-react';

const ExportData = () => {
  const [selectedFormat, setSelectedFormat] = useState('');
  const [selectedTables, setSelectedTables] = useState<string[]>([]);

  const availableTables = [
    { id: 'customers', name: 'Customers', icon: Table },
    { id: 'suppliers', name: 'Suppliers', icon: Table },
    { id: 'orders', name: 'Orders', icon: FileText },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 }
  ];

  const exportFormats = [
    { value: 'csv', label: 'CSV' },
    { value: 'xlsx', label: 'Excel (XLSX)' },
    { value: 'json', label: 'JSON' },
    { value: 'pdf', label: 'PDF Report' }
  ];

  const handleTableToggle = (tableId: string) => {
    setSelectedTables(prev => 
      prev.includes(tableId) 
        ? prev.filter(id => id !== tableId)
        : [...prev, tableId]
    );
  };

  const handleExport = () => {
    if (!selectedFormat) {
      toast.error('Please select an export format');
      return;
    }
    
    if (selectedTables.length === 0) {
      toast.error('Please select at least one table to export');
      return;
    }

    toast.success(`Exporting data in ${selectedFormat.toUpperCase()} format`);
  };

  const handleQuickExport = (format: string) => {
    toast.success(`Quick export initiated in ${format} format`);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Export Data</h1>
        <p className="text-muted-foreground">
          Export your data in various formats
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Custom Export</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Export Format</label>
              <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  {exportFormats.map((format) => (
                    <SelectItem key={format.value} value={format.value}>
                      {format.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-3 block">Select Tables</label>
              <div className="space-y-3">
                {availableTables.map((table) => {
                  const Icon = table.icon;
                  return (
                    <div key={table.id} className="flex items-center space-x-3">
                      <Checkbox
                        id={table.id}
                        checked={selectedTables.includes(table.id)}
                        onCheckedChange={() => handleTableToggle(table.id)}
                      />
                      <Icon className="h-4 w-4" />
                      <label htmlFor={table.id} className="text-sm">
                        {table.name}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>

            <Button onClick={handleExport} className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Export Selected Data
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Export</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Quick export options for common data sets
            </p>
            
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleQuickExport('CSV')}
              >
                <FileText className="h-4 w-4 mr-2" />
                All Customers (CSV)
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleQuickExport('Excel')}
              >
                <Table className="h-4 w-4 mr-2" />
                All Suppliers (Excel)
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleQuickExport('PDF')}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Monthly Report (PDF)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExportData;
