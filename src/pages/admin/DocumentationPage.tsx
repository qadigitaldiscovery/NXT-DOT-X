
import React, { useState, useMemo, useEffect } from 'react';
import { DocumentExplorer } from "@/components/admin/documentation/DocumentExplorer";
import { DocumentSearchBar } from "@/components/admin/documentation/DocumentSearchBar";
import { DocumentViewer } from "@/components/admin/documentation/DocumentViewer";
import { documentCategories } from "@/components/admin/documentation/mockData";
import { DocumentCategory, DocumentItem } from "@/components/admin/documentation/types";
import { NavigationMenu } from "@/components/admin/documentation/NavigationMenu";
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, FileText } from 'lucide-react';

const DocumentationPage = () => {
  const [selectedDocument, setSelectedDocument] = useState<DocumentItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  // Simulate loading of documentation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filter documents based on search term
  const filteredCategories = useMemo(() => {
    if (!searchTerm) return documentCategories;
    
    return documentCategories.map(category => ({
      ...category,
      documents: category.documents.filter(doc => 
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        doc.content?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })).filter(category => category.documents.length > 0);
  }, [searchTerm]);

  // Set first document as selected if none selected
  useEffect(() => {
    if (!selectedDocument && filteredCategories.length > 0 && filteredCategories[0].documents.length > 0) {
      setSelectedDocument(filteredCategories[0].documents[0]);
    }
  }, [filteredCategories, selectedDocument]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 bg-gray-100 dark:bg-gray-800 rounded-lg h-[600px] animate-pulse"></div>
          <div className="md:col-span-2 bg-gray-100 dark:bg-gray-800 rounded-lg h-[600px] animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <FileText className="mr-2" />
          Documentation
        </h1>
        <div className="flex items-center space-x-4">
          <NavigationMenu />
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-2"
            onClick={() => navigate('/')}
          >
            <Home size={16} />
            Home
          </Button>
        </div>
      </div>
      
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
