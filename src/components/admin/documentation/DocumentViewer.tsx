import { useState } from 'react';
import { Copy, X, Share2 } from 'lucide-react';
import { DocumentItem } from './types';
import { documentService } from './documentService';
import { Button } from '@/components/ui/button';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { toast } from 'sonner';

// Note: Ensure 'react-markdown' is installed with `npm install react-markdown`
// and the types are installed with `npm install -D @types/react-markdown` if using TypeScript
import ReactMarkdown from 'react-markdown';

interface DocumentViewerProps {
  document: DocumentItem;
}

export const DocumentViewer = ({ document }: DocumentViewerProps) => {
  const [shareUrl, setShareUrl] = useState<string | null>(document.shareId ? 
    `${window.location.origin}/shared-document/${document.shareId}` : null);
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);
  
  // Function to create a shareable link
  const handleCreateShareableLink = async () => {
    try {
      setIsGeneratingLink(true);
      const url = await documentService.createShareableLink(document.id);
      if (url) {
        setShareUrl(url);
        toast.success("Shareable link created");
      } else {
        toast.error("Failed to create shareable link");
      }
    } catch (error) {
      console.error('Error creating shareable link:', error);
      toast.error("Failed to create shareable link");
    } finally {
      setIsGeneratingLink(false);
    }
  };
  
  // Function to remove the shareable link
  const handleRemoveShareableLink = async () => {
    try {
      const success = await documentService.removeShareableLink(document.id);
      if (success) {
        setShareUrl(null);
        toast.success("Shareable link removed");
      } else {
        toast.error("Failed to remove shareable link");
      }
    } catch (error) {
      console.error('Error removing shareable link:', error);
      toast.error("Failed to remove shareable link");
    }
  };
  
  // Function to copy the shareable link to clipboard
  const handleCopyLink = () => {
    if (shareUrl) {
      navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard");
    }
  };
  
  // Render different content based on document type
  const renderDocumentContent = () => {
    switch (document.type) {
      case 'markdown':
        return (
          <div className="prose dark:prose-invert max-w-none">
            <ReactMarkdown>{document.content || ''}</ReactMarkdown>
          </div>
        );
      case 'text':
        return (
          <div className="whitespace-pre-wrap font-mono bg-gray-50 dark:bg-gray-900 p-4 rounded">
            {document.content}
          </div>
        );
      case 'pdf':
        return (
          <div className="flex flex-col items-center">
            <div className="text-center mb-4">
              <a href={document.url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                Open PDF in new tab
              </a>
            </div>
            {document.url && (
              <iframe 
                src={document.url} 
                className="w-full h-[70vh] border-0 rounded"
                title={document.title}
              />
            )}
          </div>
        );
      case 'image':
        return (
          <div className="flex justify-center">
            <img 
              src={document.url} 
              alt={document.title} 
              className="max-w-full max-h-[70vh] object-contain"
            />
          </div>
        );
      default:
        return (
          <div className="text-center text-gray-500">
            <p>Preview not available for this document type.</p>
            {document.url && (
              <a href={document.url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline block mt-2">
                Open document
              </a>
            )}
          </div>
        );
    }
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">{document.title}</h2>
          <p className="text-sm text-gray-500">
            {document.author && `By ${document.author} • `}
            Last updated {new Date(document.updated_at || document.updatedAt || '').toLocaleDateString()}
          </p>
        </div>
        <div className="flex space-x-2">
          {shareUrl ? (
            <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                placeholder="Shareable link"
                className="bg-transparent text-sm w-56 border-none focus:ring-0"
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={handleCopyLink}>
                      <Copy size={16} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy link</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={handleRemoveShareableLink}>
                      <X size={16} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Remove sharing</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={handleCreateShareableLink}
              disabled={isGeneratingLink}
              className="flex items-center space-x-1"
            >
              <Share2 size={16} className="mr-1" />
              {isGeneratingLink ? "Generating..." : "Share"}
            </Button>
          )}
        </div>
      </div>
      
      {document.description && (
        <div className="p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-300">{document.description}</p>
        </div>
      )}
      
      <div className="flex-grow p-6 overflow-auto">
        {renderDocumentContent()}
      </div>
    </div>
  );
};
