
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { TableItem } from './TableItem';
import { SearchBar } from './SearchBar';
import { RefreshButton } from './RefreshButton';
import { LoadingState } from './LoadingState';
import { EmptyState } from './EmptyState';

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
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshTables = async () => {
    try {
      setIsRefreshing(true);
      await refetchTables();
      toast.success("Table list refreshed successfully");
    } catch (error) {
      toast.error("Failed to refresh tables");
      console.error("Refresh error:", error);
    } finally {
      setIsRefreshing(false);
    }
  };
  
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-center pb-4">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <RefreshButton isRefreshing={isRefreshing} onRefresh={handleRefreshTables} />
        </div>
        
        {isLoading ? (
          <LoadingState />
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {tables && tables.map((table) => (
              <TableItem 
                key={table.name} 
                table={table} 
                refetchTables={refetchTables} 
              />
            ))}

            {tables && tables.length === 0 && <EmptyState />}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TablesList;
