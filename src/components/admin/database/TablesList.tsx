
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Table, FileDown, FileUp, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface TableData {
  name: string;
  row_count: number;
  size: string;
  last_vacuum: string;
}

interface TablesListProps {
  tables: TableData[] | undefined;
  isLoading: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  refetchTables: () => void;
}

const TablesList: React.FC<TablesListProps> = ({ 
  tables, 
  isLoading, 
  searchTerm, 
  setSearchTerm,
  refetchTables 
}) => {
  const [exportLoading, setExportLoading] = useState<string | null>(null);
  const [importLoading, setImportLoading] = useState<string | null>(null);

  const handleExportData = async (tableName: string) => {
    try {
      setExportLoading(tableName);
      console.log(`Exporting data for table: ${tableName}`);
      
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
      a.download = `${tableName}_export.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success(`Export for ${tableName} completed`);
    } catch (error) {
      toast.error(`Error exporting data from ${tableName}`);
      console.error('Export error:', error);
    } finally {
      setExportLoading(null);
    }
  };

  const handleImportData = async (tableName: string) => {
    try {
      setImportLoading(tableName);
      console.log(`Preparing import for table: ${tableName}`);
      
      // In a real implementation, this would open a file picker and process the file
      // For demo purposes, we'll simulate a delay and show a success message
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate a successful import
      toast.success(`Data imported successfully to ${tableName}`);
      
      // Refresh the tables data
      refetchTables();
    } catch (error) {
      toast.error(`Error importing data to ${tableName}`);
      console.error('Import error:', error);
    } finally {
      setImportLoading(null);
    }
  };
  
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-center pb-4">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tables..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-8">
            <p>Loading tables...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {tables && tables.map((table) => (
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
                        onClick={() => handleExportData(table.name)}
                        disabled={exportLoading === table.name}
                      >
                        {exportLoading === table.name ? (
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
                        onClick={() => handleImportData(table.name)}
                        disabled={importLoading === table.name}
                      >
                        {importLoading === table.name ? (
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
            ))}

            {tables && tables.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No tables found</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TablesList;
