
import React, { useState, useMemo } from 'react';
import { DocumentExplorer } from "@/components/admin/documentation/DocumentExplorer";
import { DocumentSearchBar } from "@/components/admin/documentation/DocumentSearchBar";
import { DocumentViewer } from "@/components/admin/documentation/DocumentViewer";
import { documentCategories } from "@/components/admin/documentation/mockData";
import { DocumentCategory, DocumentItem } from "@/components/admin/documentation/types";

const DocumentationPage = () => {
  const [selectedDocument, setSelectedDocument] = useState<DocumentItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter documents based on search term
  const filteredCategories = useMemo(() => {
    if (!searchTerm) return documentCategories;
    
    return documentCategories.map(category => ({
      ...category,
      documents: category.documents.filter(doc => 
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        doc.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })).filter(category => category.documents.length > 0);
  }, [documentCategories, searchTerm]);

  // Set first document as selected if none selected
  React.useEffect(() => {
    if (!selectedDocument && filteredCategories.length > 0 && filteredCategories[0].documents.length > 0) {
      setSelectedDocument(filteredCategories[0].documents[0]);
    }
  }, [filteredCategories, selectedDocument]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Documentation</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="mb-4">
            <DocumentSearchBar onSearch={handleSearch} />
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-medium">Document Explorer</h2>
            </div>
            <DocumentExplorer 
              categories={filteredCategories} 
              onSelectDocument={setSelectedDocument} 
              selectedDocument={selectedDocument} 
            />
          </div>
        </div>
        
        <div className="md:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow h-full">
            {selectedDocument ? (
              <DocumentViewer document={selectedDocument} />
            ) : (
              <div className="p-8 text-center text-gray-500">
                <p>Select a document to view or search for specific content.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationPage;
