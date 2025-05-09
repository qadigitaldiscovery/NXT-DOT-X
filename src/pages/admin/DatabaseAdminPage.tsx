
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { Database, Table, FileDown, FileUp, Trash2, Search, AlertTriangle, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

// Mock data for tables - in a real implementation, this would come from Supabase
const mockTables = [
  { name: 'suppliers', row_count: 156, size: '1.2 MB', last_vacuum: '2023-05-10' },
  { name: 'products', row_count: 2350, size: '4.8 MB', last_vacuum: '2023-05-12' },
  { name: 'supplier_product_costs', row_count: 5621, size: '12.6 MB', last_vacuum: '2023-05-08' },
  { name: 'supplier_contacts', row_count: 320, size: '0.8 MB', last_vacuum: '2023-05-15' },
  { name: 'supplier_documents', row_count: 145, size: '0.5 MB', last_vacuum: '2023-05-11' },
  { name: 'supplier_cost_uploads', row_count: 78, size: '0.3 MB', last_vacuum: '2023-05-14' },
  { name: 'currency_exchange_rates', row_count: 42, size: '0.1 MB', last_vacuum: '2023-05-13' }
];

// Mock data for recent queries - in a real implementation, this would come from Supabase
const mockRecentQueries = [
  { 
    id: '1', 
    query: 'SELECT * FROM suppliers WHERE status = \'active\'', 
    timestamp: '2023-05-15 14:32:45', 
    duration: '125ms', 
    user: 'admin' 
  },
  { 
    id: '2', 
    query: 'UPDATE products SET category = \'Electronics\' WHERE id IN (SELECT id FROM products WHERE category IS NULL)', 
    timestamp: '2023-05-15 13:45:22', 
    duration: '350ms', 
    user: 'admin' 
  },
  { 
    id: '3', 
    query: 'SELECT p.name, s.name as supplier, spc.cost FROM products p JOIN supplier_product_costs spc ON p.id = spc.product_id JOIN suppliers s ON spc.supplier_id = s.id LIMIT 100', 
    timestamp: '2023-05-15 11:20:18', 
    duration: '420ms', 
    user: 'admin' 
  }
];

const DatabaseAdminPage = () => {
  const { user, hasPermission } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sqlQuery, setSqlQuery] = useState('');
  const [queryResult, setQueryResult] = useState<any>(null);
  const [isExecutingQuery, setIsExecutingQuery] = useState(false);

  // Check if user has required permission
  React.useEffect(() => {
    if (!user || !hasPermission('settings.access')) {
      toast.error('You do not have permission to access this page');
      navigate('/unauthorized');
    }
  }, [user, hasPermission, navigate]);

  // Fetch database tables - in a real implementation, this would fetch from Supabase
  const { data: tables, isLoading: tablesLoading, refetch: refetchTables } = useQuery({
    queryKey: ['database-tables'],
    queryFn: async () => {
      return mockTables.filter(table => 
        searchTerm ? table.name.toLowerCase().includes(searchTerm.toLowerCase()) : true
      );
    },
    enabled: !!user && hasPermission('settings.access')
  });

  const handleExecuteQuery = async () => {
    if (!sqlQuery.trim()) {
      toast.error('Please enter a SQL query');
      return;
    }

    setIsExecutingQuery(true);
    try {
      // In a real implementation, this would execute the query via Supabase
      // const { data, error } = await supabase.rpc('execute_sql', { query: sqlQuery });
      
      // Mock response for demo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful query
      const mockData = {
        columns: ['id', 'name', 'status'],
        rows: [
          { id: '1', name: 'Supplier A', status: 'active' },
          { id: '2', name: 'Supplier B', status: 'active' },
          { id: '3', name: 'Supplier C', status: 'inactive' }
        ]
      };
      
      setQueryResult(mockData);
      toast.success('Query executed successfully');
    } catch (error) {
      toast.error('Error executing query');
      console.error('Query error:', error);
    } finally {
      setIsExecutingQuery(false);
    }
  };

  const handleExportData = (tableName: string) => {
    toast.info(`Preparing export for ${tableName}...`);
    // In a real implementation, this would trigger a data export via Supabase
  };

  const handleImportData = (tableName: string) => {
    toast.info(`Preparing import for ${tableName}...`);
    // In a real implementation, this would open an import dialog
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
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Database Tables</CardTitle>
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
              <CardDescription>
                View, manage, and monitor database tables.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {tablesLoading ? (
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
                            >
                              <FileDown className="h-4 w-4" />
                              Export
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="flex items-center gap-1"
                              onClick={() => handleImportData(table.name)}
                            >
                              <FileUp className="h-4 w-4" />
                              Import
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
        </TabsContent>
        
        <TabsContent value="query">
          <Card>
            <CardHeader>
              <CardTitle>SQL Query</CardTitle>
              <CardDescription>
                Execute custom SQL queries on the database.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="sql-query">SQL Query</Label>
                  <div className="mt-1">
                    <textarea
                      id="sql-query"
                      rows={5}
                      className="w-full p-2 border rounded-md bg-background"
                      value={sqlQuery}
                      onChange={(e) => setSqlQuery(e.target.value)}
                      placeholder="SELECT * FROM suppliers LIMIT 10;"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    onClick={handleExecuteQuery}
                    disabled={isExecutingQuery}
                  >
                    {isExecutingQuery ? 'Executing...' : 'Execute Query'}
                  </Button>
                </div>
                
                {queryResult && (
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-2">Query Results</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-muted">
                            {queryResult.columns.map((column: string) => (
                              <th key={column} className="border p-2 text-left">{column}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {queryResult.rows.map((row: any, i: number) => (
                            <tr key={i} className="border-b">
                              {queryResult.columns.map((column: string) => (
                                <td key={`${i}-${column}`} className="border p-2">
                                  {row[column]}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      {queryResult.rows.length} rows returned
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Recent Queries</CardTitle>
              <CardDescription>
                View recently executed SQL queries.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRecentQueries.map((query) => (
                  <Card key={query.id} className="shadow-sm">
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Badge variant="outline">{query.user}</Badge>
                          <div className="text-sm text-muted-foreground">
                            {query.timestamp} · {query.duration}
                          </div>
                        </div>
                        <div className="bg-muted p-2 rounded-md overflow-x-auto">
                          <pre className="text-sm whitespace-pre-wrap">{query.query}</pre>
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSqlQuery(query.query)}
                          >
                            Load Query
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DatabaseAdminPage;
