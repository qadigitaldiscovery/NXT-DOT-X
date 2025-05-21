import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { FileText, Download, Eye, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Document } from '@/types/document';

interface DocumentsTableProps {
  documents: Document[];
  onView: (document: Document) => void;
  onDownload: (document: Document) => void;
  onDelete: (documentId: string) => void;
}

export function DocumentsTable({ documents, onView, onDownload, onDelete }: DocumentsTableProps) {
  const [sortColumn, setSortColumn] = useState<keyof Document>('uploadDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (column: keyof Document) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
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
    } else if (typeof columnA === 'number' && typeof columnB === 'number') {
      comparison = columnA - columnB;
    } else if (columnA instanceof Date && columnB instanceof Date) {
      comparison = columnA.getTime() - columnB.getTime();
    }

    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const renderSortIndicator = (column: keyof Document) => {
    if (sortColumn === column) {
      return sortDirection === 'asc' ? '▲' : '▼';
    }
    return null;
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px] cursor-pointer" onClick={() => handleSort('name')}>
              Document Name
              {renderSortIndicator('name')}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort('type')}>
              Type
              {renderSortIndicator('type')}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort('uploadDate')}>
              Uploaded
              {renderSortIndicator('uploadDate')}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort('size')}>
              Size
              {renderSortIndicator('size')}
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedDocuments.map((document) => (
            <TableRow key={document.id}>
              <TableCell className="font-medium">{document.name}</TableCell>
              <TableCell>
                <Badge variant="secondary">{document.type}</Badge>
              </TableCell>
              <TableCell>{format(new Date(document.uploadDate), 'MMM dd, yyyy')}</TableCell>
              <TableCell>{document.size}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <FileText className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onView(document)}>
                      <Eye className="mr-2 h-4 w-4" /> View
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDownload(document)}>
                      <Download className="mr-2 h-4 w-4" /> Download
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDelete(document.id)}>
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
