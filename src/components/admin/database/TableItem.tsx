import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, FileDown, FileUp, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface TableData {
  name: string;
  row_count: number;
  size: string;
  last_vacuum: string;
}

interface TableItemProps {
  table: TableData;
  refetchTables: () => void;
}

const TableItem = ({ table, refetchTables }: TableItemProps) => {
  const [exportLoading, setExportLoading] = useState<boolean>(false);
  const [importLoading, setImportLoading] = useState<boolean>(false);

  const handleExportData = async () => {
    try {
      setExportLoading(true);
      console.log(`Exporting data for table: ${table.name}`);
      
      // In a real implementation, this would call a Supabase function to export data
      // For demo purposes, we'll simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create a mock CSV content
      const csvContent = `id,name,status\n1,Item 1,active\n2,Item 2,inactive`;
      
      // Create a blob and download it
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${table.name}_export.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success(`Export for ${table.name} completed`);
    } catch (error) {
      toast.error(`Error exporting data from ${table.name}`);
      console.error('Export error:', error);
    } finally {
      setExportLoading(false);
    }
  };

  const handleImportData = async () => {
    try {
      setImportLoading(true);
      console.log(`Preparing import for table: ${table.name}`);
      
      // In a real implementation, this would open a file picker and process the file
      // For demo purposes, we'll simulate a delay and show a success message
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate a successful import
      toast.success(`Data imported successfully to ${table.name}`);
      
      // Refresh the tables data
      refetchTables();
    } catch (error) {
      toast.error(`Error importing data to ${table.name}`);
      console.error('Import error:', error);
    } finally {
      setImportLoading(false);
    }
  };

  return (
    <Card key={table.name} className="shadow-sm">
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Table className="h-4 w-4 text-primary" />
              <h3 className="font-semibold text-lg">{table.name}</h3>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
              <div>
                <span className="font-medium">Rows: </span>
                {table.row_count.toLocaleString()}
              </div>
              <div>
                <span className="font-medium">Size: </span>
                {table.size}
              </div>
              <div>
                <span className="font-medium">Last Vacuum: </span>
                {table.last_vacuum}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="flex items-center gap-1"
              onClick={handleExportData}
              disabled={exportLoading}
            >
              {exportLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <FileDown className="h-4 w-4" />
                  Export
                </>
              )}
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="flex items-center gap-1"
              onClick={handleImportData}
              disabled={importLoading}
            >
              {importLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Importing...
                </>
              ) : (
                <>
                  <FileUp className="h-4 w-4" />
                  Import
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TableItem;
