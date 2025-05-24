
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, Search, Filter } from 'lucide-react';
import DocumentsTable from '@/components/documents/DocumentsTable';

const DocumentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const mockDocuments = [
    {
      id: '1',
      name: 'Contract_ABC_2024.pdf',
      type: 'PDF',
      size: '2.4 MB',
      lastModified: '2024-01-15',
      status: 'active' as const
    },
    {
      id: '2',
      name: 'Invoice_XYZ_Jan.xlsx',
      type: 'Excel',
      size: '1.2 MB',
      lastModified: '2024-01-14',
      status: 'active' as const
    }
  ];

  const handleDelete = (document: any) => {
    console.log('Deleting document:', document);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
          <p className="text-muted-foreground">
            Manage and organize your documents
          </p>
        </div>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DocumentsTable 
            documents={mockDocuments}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentsPage;
