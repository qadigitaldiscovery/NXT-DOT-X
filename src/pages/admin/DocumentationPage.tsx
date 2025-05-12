import React, { useState, useMemo, useEffect } from 'react';
import { DocumentExplorer } from "@/components/admin/documentation/DocumentExplorer";
import { DocumentSearchBar } from "@/components/admin/documentation/DocumentSearchBar";
import { DocumentViewer } from "@/components/admin/documentation/DocumentViewer";
import { DocumentToolbar } from "@/components/admin/documentation/DocumentToolbar";
import { documentService } from "@/components/admin/documentation/documentService";
import { DocumentCategory, DocumentItem, DocumentType } from "@/components/admin/documentation/types";
import { NavigationMenu } from "@/components/admin/documentation/NavigationMenu";
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, FileText, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

const DocumentationPage = () => {
  const [categories, setCategories] = useState<DocumentCategory[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<DocumentItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [filteredCategories, setFilteredCategories] = useState<DocumentCategory[]>([]);
  const navigate = useNavigate();
  
  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const loadedCategories = await documentService.getAllCategories();
        setCategories(loadedCategories);
        setFilteredCategories(loadedCategories);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading documentation:", error);
        toast.error("Failed to load documentation");
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  // Update filtered categories when search term changes
  useEffect(() => {
    const filterDocuments = async () => {
      if (!searchTerm) {
        setFilteredCategories(categories);
        return;
      }
      
      const results = await documentService.searchDocuments(searchTerm);
      setFilteredCategories(results);
    };
    
    filterDocuments();
  }, [searchTerm, categories]);

  // Set first document as selected if none selected
  useEffect(() => {
    if (!selectedDocument && filteredCategories.length > 0 && filteredCategories[0].documents.length > 0) {
      setSelectedDocument(filteredCategories[0].documents[0]);
    }
  }, [filteredCategories, selectedDocument]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleAddDocument = async (categoryId: string, documentData: {
    title: string;
    description?: string;
    type: DocumentType;
    content?: string;
    author: string;
  }) => {
    try {
      const newDocument = await documentService.addDocument(categoryId, documentData);
      const refreshedCategories = await documentService.getAllCategories();
      setCategories(refreshedCategories);
      setSelectedDocument(newDocument);
      toast.success("Document added successfully");
    } catch (error) {
      console.error("Error adding document:", error);
      toast.error("Failed to add document");
    }
  };

  const handleAddCategory = async (categoryData: { name: string }) => {
    try {
      await documentService.addCategory(categoryData);
      const refreshedCategories = await documentService.getAllCategories();
      setCategories(refreshedCategories);
      toast.success("Category added successfully");
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Failed to add category");
    }
  };

  const handleDeleteDocument = async (documentId: string) => {
    try {
      const success = await documentService.deleteDocument(documentId);
      
      if (success) {
        // If the deleted document was selected, clear selection
        if (selectedDocument?.id === documentId) {
          setSelectedDocument(null);
        }
        
        const refreshedCategories = await documentService.getAllCategories();
        setCategories(refreshedCategories);
        toast.success("Document deleted successfully");
      } else {
        toast.error("Failed to delete document");
      }
    } catch (error) {
      console.error("Error deleting document:", error);
      toast.error("Failed to delete document");
    }
  };

  const handleFileUpload = async (file: File, type: DocumentType, metadata: {
    title: string;
    description?: string;
    author: string;
    categoryId: string;
  }) => {
    try {
      const newDocument = await documentService.addDocumentFromFile(file, type, metadata);
      const refreshedCategories = await documentService.getAllCategories();
      setCategories(refreshedCategories);
      setSelectedDocument(newDocument);
      toast.success("File uploaded and document created successfully");
    } catch (error) {
      console.error("Error creating document from file:", error);
      toast.error("Failed to create document from file");
    }
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      const refreshedCategories = await documentService.getAllCategories();
      setCategories(refreshedCategories);
      setIsLoading(false);
      toast.success("Documentation refreshed");
    } catch (error) {
      console.error("Error refreshing documentation:", error);
      toast.error("Failed to refresh documentation");
      setIsLoading(false);
    }
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
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
      
      {categories.length === 0 ? (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-center">
          <AlertTriangle className="h-12 w-12 mx-auto text-amber-500 mb-3" />
          <h3 className="text-lg font-semibold mb-2">No Documentation Found</h3>
          <p className="mb-4">There are no documentation categories or documents available.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button onClick={() => handleAddCategory({ name: 'General Documentation' })}>
              Create First Category
            </Button>
          </div>
        </div>
      ) : (
        <>
          <DocumentToolbar 
            categories={categories}
            onDocumentAdd={handleAddDocument}
            onCategoryAdd={handleAddCategory}
            onFileUpload={handleFileUpload}
            onRefresh={handleRefresh}
          />
          
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
                  onDeleteDocument={handleDeleteDocument}
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
        </>
      )}
    </div>
  );
};

export default DocumentationPage;
