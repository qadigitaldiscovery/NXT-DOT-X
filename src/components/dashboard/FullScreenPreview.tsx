
import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FullScreenPreviewProps {
  widget: {
    id: string;
    pageComponent: React.ComponentType | null;
    pageName: string | null;
    pagePath?: string | null;
  };
  onClose: () => void;
}

export const FullScreenPreview: React.FC<FullScreenPreviewProps> = ({ widget, onClose }) => {
  const navigate = useNavigate();

  const handleNavigateToPage = () => {
    if (widget.pagePath) {
      navigate(widget.pagePath);
    }
  };

  if (!widget.pageComponent) return null;

  const PageComponent = widget.pageComponent;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full p-0">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-white">
            <div className="flex items-center space-x-3">
              <h2 className="text-lg font-semibold">{widget.pageName}</h2>
              {widget.pagePath && (
                <span className="text-sm text-gray-500">{widget.pagePath}</span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {widget.pagePath && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNavigateToPage}
                  className="flex items-center space-x-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Open Full Page</span>
                </Button>
              )}
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Preview Content */}
          <div className="flex-1 overflow-auto bg-gray-50">
            <React.Suspense fallback={
              <div className="flex items-center justify-center h-full">
                <div className="text-lg text-gray-500">Loading preview...</div>
              </div>
            }>
              <div className="min-h-full bg-white">
                <PageComponent />
              </div>
            </React.Suspense>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
