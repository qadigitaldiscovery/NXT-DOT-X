
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Share, Trash2 } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  lastModified: string;
  status: 'active' | 'archived';
}

interface DocumentsTableProps {
  documents: Document[];
  onDelete?: (document: Document) => void;
}

const DocumentsTable: React.FC<DocumentsTableProps> = ({ documents, onDelete }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Last Modified</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((document) => (
            <TableRow key={document.id}>
              <TableCell className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                {document.name}
              </TableCell>
              <TableCell>{document.type}</TableCell>
              <TableCell>{document.size}</TableCell>
              <TableCell>{document.lastModified}</TableCell>
              <TableCell>
                <Badge variant={document.status === 'active' ? 'default' : 'secondary'}>
                  {document.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onDelete?.(document)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DocumentsTable;
