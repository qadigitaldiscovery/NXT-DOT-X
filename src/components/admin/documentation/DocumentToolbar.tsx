
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
        <a 
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onDocumentAdd();
          }}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input py-2 px-3 hover:bg-accent hover:text-accent-foreground"
          aria-label="Add document"
        >
          <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
          Add Document
        </a>
        <a 
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onCategoryAdd();
          }}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input py-2 px-3 hover:bg-accent hover:text-accent-foreground"
          aria-label="Add category"
        >
          <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
          Add Category
        </a>
        <a 
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onFileUpload();
          }}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input py-2 px-3 hover:bg-accent hover:text-accent-foreground"
          aria-label="Upload file"
        >
          <Upload className="h-4 w-4 mr-2" aria-hidden="true" />
          Upload File
        </a>
      </div>
      <a 
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onRefresh();
        }}
        className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input py-2 px-3 hover:bg-accent hover:text-accent-foreground"
        aria-label="Refresh documents"
      >
        <RefreshCw className="h-4 w-4 mr-2" aria-hidden="true" />
        Refresh
      </a>
    </div>
  );
}
