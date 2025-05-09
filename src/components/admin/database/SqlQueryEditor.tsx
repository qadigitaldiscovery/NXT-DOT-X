
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface QueryResult {
  columns: string[];
  rows: Record<string, any>[];
}

const SqlQueryEditor: React.FC = () => {
  const [sqlQuery, setSqlQuery] = useState<string>('');
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null);
  const [isExecutingQuery, setIsExecutingQuery] = useState<boolean>(false);

  const handleExecuteQuery = async () => {
    if (!sqlQuery.trim()) {
      toast.error('Please enter a SQL query');
      return;
    }

    setIsExecutingQuery(true);
    try {
      // In a real implementation, this would execute the query via Supabase
      // const { data, error } = await supabase.rpc('execute_sql', { query: sqlQuery });
      console.log('Executing SQL query:', sqlQuery);
      
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

  return (
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
              {isExecutingQuery ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Executing...
                </>
              ) : 'Execute Query'}
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
  );
};

export default SqlQueryEditor;
