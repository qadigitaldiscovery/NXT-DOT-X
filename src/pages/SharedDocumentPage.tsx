
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DocumentViewer } from "@/components/admin/documentation/DocumentViewer";
import { documentService } from "@/components/admin/documentation/documentService";
import { DocumentItem } from "@/components/admin/documentation/types";
import { Button } from '@/components/ui/button';
import { Home, FileText, AlertTriangle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SharedDocumentPage = () => {
  const { shareId } = useParams<{ shareId: string }>();
  const [document, setDocument] = useState<DocumentItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadDocument = async () => {
      if (!shareId) {
        setError("No share ID provided");
        setIsLoading(false);
        return;
      }

      try {
        const doc = await documentService.getDocumentByShareId(shareId);
        if (doc) {
          setDocument(doc);
        } else {
          setError("Document not found or is no longer shared");
        }
      } catch (err) {
        console.error("Error loading shared document:", err);
        setError("Failed to load document");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadDocument();
  }, [shareId]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="w-full max-w-4xl">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-t-lg mb-4"></div>
            <div className="p-6">
              <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !document) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="w-full max-w-4xl">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
            <AlertTriangle className="h-12 w-12 mx-auto text-amber-500 mb-3" />
            <h2 className="text-xl font-semibold mb-2">Document Not Available</h2>
            <p className="text-gray-500 mb-4">{error || "This document is not available or may have been removed."}</p>
            <Button onClick={() => navigate('/')} className="flex items-center">
              <Home size={16} className="mr-2" />
              Go Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-4">
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center"
          onClick={() => navigate('/')}
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Home
        </Button>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <DocumentViewer document={document} />
      </div>
      <div className="mt-4 text-center text-sm text-gray-500">
        <p>This is a shared document from the NXT-DOT-X Documentation System</p>
      </div>
    </div>
  );
};

export default SharedDocumentPage;
