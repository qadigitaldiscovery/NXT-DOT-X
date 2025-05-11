
import React from 'react';
import { File } from 'lucide-react';
import { DocumentItem } from './types';
import { Button } from '@/components/ui/button';

interface DocumentViewerProps {
  document: DocumentItem | null;
}

// Simple markdown renderer function
const renderMarkdown = (content: string): string => {
  if (!content) return '';
  
  // Basic markdown formatting with regex
  return content
    // Headers
    .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold my-4">$1</h3>')
    .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold my-4">$1</h2>')
    .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold my-5">$1</h1>')
    // Bold text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic text
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Code blocks
    .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded my-4 overflow-auto"><code>$1</code></pre>')
    // Inline code
    .replace(/`(.*?)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">$1</code>')
    // Lists
    .replace(/^\- (.*$)/gm, '<li class="ml-6">$1</li>')
    // Line breaks and paragraphs
    .replace(/\n/g, '<br />')
    // Tables (basic support)
    .replace(/\|\s*(.*?)\s*\|/g, '<table class="border-collapse w-full my-4"><tr><td class="border border-gray-300 dark:border-gray-700 p-2">$1</td></tr></table>');
};

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
            <div dangerouslySetInnerHTML={{ __html: renderMarkdown(document.content || '') }} />
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
      <div className="px-4 py-3 border-b flex justify-between items-center bg-gradient-to-r from-nxt-darkRed to-nxt-red text-white">
        <h3 className="text-lg font-medium truncate">{document.title}</h3>
        <div className="flex space-x-2">
          {document.url && (
            <Button
              variant="outline"
              size="sm"
              asChild
              className="text-sm bg-white hover:bg-gray-100 text-nxt-darkRed border-white"
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
            className="text-sm text-white hover:bg-white/20"
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
