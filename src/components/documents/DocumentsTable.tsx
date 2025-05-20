import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Button } from '../ui/button';
import { FileText, Download, Trash2 } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  size: string;
}

interface DocumentsTableProps {
  supplier: {
    id: string;
    name: string;
  };
}

export function DocumentsTable({ supplier }: DocumentsTableProps) {
  const [documents] = React.useState<Document[]>([
    {
      id: '1',
      name: 'Contract Agreement',
      type: 'PDF',
      uploadDate: '2024-01-15',
      size: '2.5 MB',
    },
    {
      id: '2',
      name: 'Technical Specifications',
      type: 'DOCX',
      uploadDate: '2024-01-14',
      size: '1.8 MB',
    },
    {
      id: '3',
      name: 'Price List',
      type: 'XLSX',
      uploadDate: '2024-01-13',
      size: '956 KB',
    },
  ]);

  const handleDownload = (documentId: string) => {
    console.log(`Downloading document ${documentId}`);
  };

  const handleDelete = (documentId: string) => {
    console.log(`Deleting document ${documentId}`);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Upload Date</TableHead>
            <TableHead>Size</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((doc) => (
            <TableRow key={doc.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  {doc.name}
                </div>
              </TableCell>
              <TableCell>{doc.type}</TableCell>
              <TableCell>{doc.uploadDate}</TableCell>
              <TableCell>{doc.size}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDownload(doc.id)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(doc.id)}
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
}
