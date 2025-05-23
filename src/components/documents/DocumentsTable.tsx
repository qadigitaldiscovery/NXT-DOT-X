
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Eye } from 'lucide-react';

const DocumentsTable: React.FC = () => {
  const mockDocuments = [
    { id: '1', name: 'Contract_ABC.pdf', size: '2.5 MB', uploadedAt: '2024-01-15', type: 'PDF' },
    { id: '2', name: 'Invoice_123.xlsx', size: '1.2 MB', uploadedAt: '2024-01-14', type: 'Excel' },
    { id: '3', name: 'Report_Q1.docx', size: '856 KB', uploadedAt: '2024-01-13', type: 'Word' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Documents</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockDocuments.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="font-medium">{doc.name}</p>
                  <p className="text-sm text-gray-500">{doc.size} • {doc.uploadedAt}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentsTable;
