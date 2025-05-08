
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { DocumentExplorer } from '@/components/admin/documentation/DocumentExplorer';
import { DocumentViewer } from '@/components/admin/documentation/DocumentViewer';
import { DocumentSearchBar } from '@/components/admin/documentation/DocumentSearchBar';
import { DocumentItem } from '@/components/admin/documentation/types';
import { mockDocumentationData } from '@/components/admin/documentation/mockData';

const DocumentationPage = () => {
  const [categories] = useState(mockDocumentationData);
  const [selectedDocument, setSelectedDocument] = useState<DocumentItem | null>(null);
  
  const handleSearch = (query: string) => {
    // In a real application, this would filter the documents based on the search query
    console.log('Searching for:', query);
  };

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">Documentation</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-4">
              <DocumentSearchBar onSearch={handleSearch} />
              <DocumentExplorer 
                categories={categories}
                onSelectDocument={setSelectedDocument}
                selectedDocument={selectedDocument}
              />
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-3 h-[calc(100vh-12rem)]">
          <Card className="h-full">
            <CardContent className="p-0 h-full">
              <DocumentViewer document={selectedDocument} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DocumentationPage;
