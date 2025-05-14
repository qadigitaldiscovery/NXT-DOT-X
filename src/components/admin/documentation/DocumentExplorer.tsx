
import React, { useState } from 'react';
import { Folder, File, ChevronRight, ChevronDown, MoreHorizontal, Edit, Trash2, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DocumentCategory, DocumentItem } from './types';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

interface DocumentExplorerProps {
  categories: DocumentCategory[];
  onSelectDocument: (document: DocumentItem) => void;
  selectedDocument: DocumentItem | null;
  onDeleteDocument?: (documentId: string) => void;
}

export const DocumentExplorer = ({
  categories,
  onSelectDocument,
  selectedDocument,
  onDeleteDocument
}: DocumentExplorerProps) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([categories[0]?.id || '']);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleEditDocument = (document: DocumentItem) => {
    // This would be implemented with an edit dialog in a real app
    toast.info(`Editing document: ${document.title}`);
  };

  const handleDeleteDocument = (document: DocumentItem) => {
    if (onDeleteDocument) {
      if (window.confirm(`Are you sure you want to delete "${document.title}"?`)) {
        onDeleteDocument(document.id);
        toast.success(`Document "${document.title}" deleted`);
      }
    }
  };

  const handleDuplicateDocument = (document: DocumentItem) => {
    // This would be implemented with document duplication in a real app
    toast.info(`Duplicating document: ${document.title}`);
  };

  return (
    <ScrollArea className="h-[calc(100vh-16rem)] pr-4">
      <div className="space-y-1 p-2">
        {categories.map((category) => (
          <div key={category.id} className="select-none">
            <button 
              onClick={() => toggleCategory(category.id)} 
              className="flex items-center w-full py-2 px-2 text-sm font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {expandedCategories.includes(category.id) 
                ? <ChevronDown className="h-4 w-4 mr-1 text-gray-500" /> 
                : <ChevronRight className="h-4 w-4 mr-1 text-gray-500" />
              }
              <Folder className="h-4 w-4 mr-2 text-blue-500" />
              <span className="flex-1 text-left">{category.name}</span>
              <span className="text-xs text-gray-400">{category.documents?.length || 0}</span>
            </button>
            
            {expandedCategories.includes(category.id) && (
              <div className="ml-6 mt-1 space-y-1">
                {!category.documents || category.documents.length === 0 ? (
                  <div className="px-2 py-1.5 text-sm text-gray-400 italic">No documents</div>
                ) : (
                  category.documents.map((document) => (
                    <div 
                      key={document.id} 
                      className={cn(
                        "flex items-center w-full py-1.5 px-2 text-sm rounded-md group",
                        selectedDocument?.id === document.id
                          ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800"
                      )}
                    >
                      <button
                        onClick={() => onSelectDocument(document)}
                        className="flex items-center flex-1 overflow-hidden"
                      >
                        <File className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
                        <span className="truncate">{document.title}</span>
                      </button>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="h-6 w-6 rounded-full hover:bg-white/20 dark:hover:bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity">
                            <MoreHorizontal className="h-3.5 w-3.5" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditDocument(document)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDuplicateDocument(document)}>
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDeleteDocument(document)}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};
