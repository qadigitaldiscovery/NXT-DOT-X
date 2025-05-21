import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RefreshCw, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
const SqlQueryEditor = () => {
    const [sqlQuery, setSqlQuery] = useState('');
    const [queryResult, setQueryResult] = useState(null);
    const [isExecutingQuery, setIsExecutingQuery] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    // Function to detect potentially dangerous SQL queries
    const isDangerousQuery = (query) => {
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
        }
        else {
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
        }
        catch (error) {
            toast.error('Error executing query');
            console.error('Query error:', error);
        }
        finally {
            setIsExecutingQuery(false);
            setShowConfirmDialog(false);
        }
    };
    return (_jsxs(_Fragment, { children: [_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "SQL Query" }), _jsx(CardDescription, { children: "Execute custom SQL queries on the database." })] }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "sql-query", children: "SQL Query" }), _jsx("div", { className: "mt-1", children: _jsx("textarea", { id: "sql-query", rows: 5, className: "w-full p-2 border rounded-md bg-background", value: sqlQuery, onChange: (e) => setSqlQuery(e.target.value), placeholder: "SELECT * FROM suppliers LIMIT 10;" }) })] }), _jsx("div", { className: "flex justify-end", children: _jsx(Button, { onClick: handleExecuteClick, disabled: isExecutingQuery, children: isExecutingQuery ? (_jsxs(_Fragment, { children: [_jsx(RefreshCw, { className: "h-4 w-4 mr-2 animate-spin" }), "Executing..."] })) : 'Execute Query' }) }), queryResult && (_jsxs("div", { className: "mt-6", children: [_jsx("h3", { className: "text-lg font-medium mb-2", children: "Query Results" }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full border-collapse", children: [_jsx("thead", { children: _jsx("tr", { className: "bg-muted", children: queryResult.columns.map((column) => (_jsx("th", { className: "border p-2 text-left", children: column }, column))) }) }), _jsx("tbody", { children: queryResult.rows.map((row, i) => (_jsx("tr", { className: "border-b", children: queryResult.columns.map((column) => (_jsx("td", { className: "border p-2", children: row[column] }, `${i}-${column}`))) }, i))) })] }) }), _jsxs("div", { className: "mt-2 text-sm text-muted-foreground", children: [queryResult.rows.length, " rows returned"] })] }))] }) })] }), _jsx(AlertDialog, { open: showConfirmDialog, onOpenChange: setShowConfirmDialog, children: _jsxs(AlertDialogContent, { children: [_jsxs(AlertDialogHeader, { children: [_jsxs(AlertDialogTitle, { className: "flex items-center gap-2", children: [_jsx(AlertTriangle, { className: "h-5 w-5 text-amber-500" }), "Confirm Dangerous Operation"] }), _jsxs(AlertDialogDescription, { children: ["Your query appears to contain operations that may modify or delete data. Are you sure you want to execute this query?", _jsx("div", { className: "mt-4 p-3 bg-muted rounded-md overflow-auto max-h-32", children: _jsx("code", { className: "text-sm", children: sqlQuery }) })] })] }), _jsxs(AlertDialogFooter, { children: [_jsx(AlertDialogCancel, { children: "Cancel" }), _jsx(AlertDialogAction, { className: "bg-destructive text-destructive-foreground hover:bg-destructive/90", onClick: executeQuery, children: "Yes, Execute Query" })] })] }) })] }));
};
export default SqlQueryEditor;
