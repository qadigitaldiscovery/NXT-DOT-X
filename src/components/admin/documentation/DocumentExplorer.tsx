import { Card, CardContent } from '@/components/ui/card';
import { Folder } from 'lucide-react';
import { DocumentSearchBar } from './DocumentSearchBar';
import { DocumentToolbar } from './DocumentToolbar';

interface DocumentItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  updatedAt: string;
  title?: string;
  category_id?: string;
}

// Define a type for categories that matches the expected structure for DocumentToolbar
interface DocumentCategory {
  id: string;
  name: string;
  documents: any[]; // Using any to avoid further type conflicts
}

interface DocumentExplorerProps {
  documents: DocumentItem[];
  onItemClick: (id: string, type: 'file' | 'folder') => void;
  onSearch: (searchTerm: string) => void;
}

export function DocumentExplorer({ documents, onItemClick, onSearch }: DocumentExplorerProps) {
  const handleDocumentAdd = () => {
    console.log('Add document');
  };

  const handleCategoryAdd = () => {
    console.log('Add category');
  };

  const handleFileUpload = () => {
    console.log('Upload file');
  };

  const handleRefresh = () => {
    console.log('Refresh');
  };

  // Explicitly type categories as DocumentCategory[]
  const categories: DocumentCategory[] = [];

  return (
    <div className="space-y-4">
      <DocumentSearchBar onSearch={onSearch} />
      <DocumentToolbar
        categories={categories}
        onDocumentAdd={handleDocumentAdd}
        onCategoryAdd={handleCategoryAdd}
        onFileUpload={handleFileUpload}
        onRefresh={handleRefresh}
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {documents.map((doc) => (
          <Card
            key={doc.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onItemClick(doc.id, doc.type)}
          >
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <Folder className="h-12 w-12 text-muted-foreground/50 mb-2" />
              <div className="text-sm font-medium text-center truncate w-full">{doc.name}</div>
              <div className="text-xs text-muted-foreground text-center">
                {doc.type === 'file' ? `Updated: ${doc.updatedAt}` : 'Folder'}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
