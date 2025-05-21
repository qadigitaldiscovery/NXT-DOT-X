import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { FileText, Download, Eye, Trash2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
export function DocumentsTable({ documents, onView, onDownload, onDelete }) {
    const [sortColumn, setSortColumn] = useState('uploadDate');
    const [sortDirection, setSortDirection] = useState('desc');
    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        }
        else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };
    const sortedDocuments = [...documents].sort((a, b) => {
        const columnA = a[sortColumn];
        const columnB = b[sortColumn];
        if (columnA === undefined || columnB === undefined) {
            return 0;
        }
        let comparison = 0;
        if (typeof columnA === 'string' && typeof columnB === 'string') {
            comparison = columnA.localeCompare(columnB);
        }
        else if (typeof columnA === 'number' && typeof columnB === 'number') {
            comparison = columnA - columnB;
        }
        else if (columnA instanceof Date && columnB instanceof Date) {
            comparison = columnA.getTime() - columnB.getTime();
        }
        return sortDirection === 'asc' ? comparison : -comparison;
    });
    const renderSortIndicator = (column) => {
        if (sortColumn === column) {
            return sortDirection === 'asc' ? '▲' : '▼';
        }
        return null;
    };
    return (_jsx("div", { className: "rounded-md border", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsxs(TableHead, { className: "w-[250px] cursor-pointer", onClick: () => handleSort('name'), children: ["Document Name", renderSortIndicator('name')] }), _jsxs(TableHead, { className: "cursor-pointer", onClick: () => handleSort('type'), children: ["Type", renderSortIndicator('type')] }), _jsxs(TableHead, { className: "cursor-pointer", onClick: () => handleSort('uploadDate'), children: ["Uploaded", renderSortIndicator('uploadDate')] }), _jsxs(TableHead, { className: "cursor-pointer", onClick: () => handleSort('size'), children: ["Size", renderSortIndicator('size')] }), _jsx(TableHead, { className: "text-right", children: "Actions" })] }) }), _jsx(TableBody, { children: sortedDocuments.map((document) => (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "font-medium", children: document.name }), _jsx(TableCell, { children: _jsx(Badge, { variant: "secondary", children: document.type }) }), _jsx(TableCell, { children: format(new Date(document.uploadDate), 'MMM dd, yyyy') }), _jsx(TableCell, { children: document.size }), _jsx(TableCell, { className: "text-right", children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(Button, { variant: "ghost", className: "h-8 w-8 p-0", children: [_jsx("span", { className: "sr-only", children: "Open menu" }), _jsx(FileText, { className: "h-4 w-4" })] }) }), _jsxs(DropdownMenuContent, { align: "end", children: [_jsxs(DropdownMenuItem, { onClick: () => onView(document), children: [_jsx(Eye, { className: "mr-2 h-4 w-4" }), " View"] }), _jsxs(DropdownMenuItem, { onClick: () => onDownload(document), children: [_jsx(Download, { className: "mr-2 h-4 w-4" }), " Download"] }), _jsxs(DropdownMenuItem, { onClick: () => onDelete(document.id), children: [_jsx(Trash2, { className: "mr-2 h-4 w-4" }), " Delete"] })] })] }) })] }, document.id))) })] }) }));
}
