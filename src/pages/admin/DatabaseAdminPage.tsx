
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Database, Table, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

// Import our new components
import TablesList from '@/components/admin/database/TablesList';
import SqlQueryEditor from '@/components/admin/database/SqlQueryEditor';
import QueryHistoryList from '@/components/admin/database/QueryHistoryList';
import { useDatabaseTables } from '@/hooks/use-database-tables';
import { mockRecentQueries } from '@/components/admin/database/mock-data';

const DatabaseAdminPage = () => {
  const { user, hasPermission } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sqlQuery, setSqlQuery] = useState('');

  // Check if user has required permission
  useEffect(() => {
    if (!user || !hasPermission('settings.access')) {
      toast.error('You do not have permission to access this page');
      navigate('/unauthorized');
    }
  }, [user, hasPermission, navigate]);

  // Fetch database tables
  const { data: tables, isLoading: tablesLoading, refetch: refetchTables } = useDatabaseTables(searchTerm);

  // Handler for loading a query from history
  const handleLoadQuery = (query: string) => {
    setSqlQuery(query);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Database Administration</h1>
          <p className="text-gray-500">Manage and monitor database tables</p>
        </div>
      </div>

      <Alert variant="warning" className="mb-6">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Database Administration</AlertTitle>
        <AlertDescription>
          These tools provide direct access to the database. Use with caution as improper usage may result in data loss or corruption.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="tables" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="tables" className="flex items-center">
            <Table className="mr-2 h-4 w-4" />
            Tables
          </TabsTrigger>
          <TabsTrigger value="query" className="flex items-center">
            <Database className="mr-2 h-4 w-4" />
            SQL Query
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center">
            <RefreshCw className="mr-2 h-4 w-4" />
            Recent Queries
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="tables">
          <TablesList 
            tables={tables}
            isLoading={tablesLoading}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            refetchTables={refetchTables}
          />
        </TabsContent>
        
        <TabsContent value="query">
          <SqlQueryEditor />
        </TabsContent>
        
        <TabsContent value="history">
          <QueryHistoryList 
            queries={mockRecentQueries}
            onLoadQuery={handleLoadQuery}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DatabaseAdminPage;
