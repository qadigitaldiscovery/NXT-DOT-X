
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RefreshCw, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";

interface QueryResult {
  columns: string[];
  rows: Record<string, any>[];
}

const SqlQueryEditor: React.FC = () => {
  const [sqlQuery, setSqlQuery] = useState<string>('');
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null);
  const [isExecutingQuery, setIsExecutingQuery] = useState<boolean>(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);

  // Function to detect potentially dangerous SQL queries
  const isDangerousQuery = (query: string): boolean => {
    const lowerCaseQuery = query.toLowerCase().trim();
    const dangerousKeywords = [
      'delete from', 
      'drop table', 
      'drop database', 
      'truncate table', 
      'alter table',
      'drop index',
      'update '
    ];
    
    return dangerousKeywords.some(keyword => lowerCaseQuery.includes(keyword));
  };

  const handleExecuteClick = () => {
    if (!sqlQuery.trim()) {
      toast.error('Please enter a SQL query');
      return;
    }

    // Check if the query is potentially dangerous
    if (isDangerousQuery(sqlQuery)) {
      setShowConfirmDialog(true);
    } else {
      executeQuery();
    }
  };

  const executeQuery = async () => {
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
      setShowConfirmDialog(false);
    }
  };

  return (
    <>
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
                onClick={handleExecuteClick}
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

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Confirm Dangerous Operation
            </AlertDialogTitle>
            <AlertDialogDescription>
              Your query appears to contain operations that may modify or delete data.
              Are you sure you want to execute this query?
              <div className="mt-4 p-3 bg-muted rounded-md overflow-auto max-h-32">
                <code className="text-sm">{sqlQuery}</code>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={executeQuery}
            >
              Yes, Execute Query
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SqlQueryEditor;
