
import React from 'react';
import { File } from 'lucide-react';
import { DocumentItem } from './types';
import { Button } from '@/components/ui/button';

interface DocumentViewerProps {
  document: DocumentItem | null;
}

export const DocumentViewer = ({ document }: DocumentViewerProps) => {
  if (!document) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-400">
        <File className="h-16 w-16 mb-4" />
        <p className="text-lg">Select a document to view</p>
      </div>
    );
  }

  const renderContent = () => {
    switch (document.type) {
      case 'pdf':
        return (
          <iframe
            src={document.url}
            className="w-full h-full"
            title={document.title}
          />
        );
      case 'text':
      case 'markdown':
        return (
          <div className="p-6 prose dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: document.content || '' }} />
          </div>
        );
      case 'image':
        return (
          <div className="flex items-center justify-center h-full">
            <img src={document.url} alt={document.title} className="max-h-full max-w-full" />
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-lg text-gray-400">Preview not available</p>
            {document.url && (
              <a 
                href={document.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Download
              </a>
            )}
          </div>
        );
    }
  };

  return (
    <div className="h-full border rounded-lg overflow-hidden bg-white dark:bg-gray-900">
      <div className="px-4 py-3 border-b flex justify-between items-center bg-gray-50 dark:bg-gray-800">
        <h3 className="text-lg font-medium truncate">{document.title}</h3>
        <div className="flex space-x-2">
          {document.url && (
            <Button
              variant="outline"
              size="sm"
              asChild
              className="text-sm"
            >
              <a 
                href={document.url} 
                download
              >
                Download
              </a>
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="text-sm"
            onClick={() => window.print()}
          >
            Print
          </Button>
        </div>
      </div>
      <div className="h-[calc(100%-3.5rem)] overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
};
