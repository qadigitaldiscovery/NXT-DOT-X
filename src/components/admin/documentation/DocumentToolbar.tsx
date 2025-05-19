import { Button } from '@/components/ui/button';
import { Plus, RefreshCw, Upload } from 'lucide-react';

interface DocumentCategory {
  id: string;
  name: string;
  documents: any[];
}

interface DocumentToolbarProps {
  categories: DocumentCategory[];
  onDocumentAdd: () => void;
  onCategoryAdd: () => void;
  onFileUpload: () => void;
  onRefresh: () => void;
}

export function DocumentToolbar({
  onDocumentAdd,
  onCategoryAdd,
  onFileUpload,
  onRefresh,
}: DocumentToolbarProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={onDocumentAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add Document
        </Button>
        <Button variant="outline" size="sm" onClick={onCategoryAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
        <Button variant="outline" size="sm" onClick={onFileUpload}>
          <Upload className="h-4 w-4 mr-2" />
          Upload File
        </Button>
      </div>
      <Button variant="outline" size="sm" onClick={onRefresh}>
        <RefreshCw className="h-4 w-4 mr-2" />
        Refresh
      </Button>
    </div>
  );
}
