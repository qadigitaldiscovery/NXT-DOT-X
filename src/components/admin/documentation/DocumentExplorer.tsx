
import React, { useState } from 'react';
import { Folder, File, ChevronRight, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DocumentCategory, DocumentItem } from './types';

interface DocumentExplorerProps {
  categories: DocumentCategory[];
  onSelectDocument: (document: DocumentItem) => void;
  selectedDocument: DocumentItem | null;
}

export const DocumentExplorer = ({
  categories,
  onSelectDocument,
  selectedDocument
}: DocumentExplorerProps) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([categories[0]?.id || '']);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <ScrollArea className="h-[calc(100vh-12rem)] pr-4">
      <div className="space-y-1">
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
              <span>{category.name}</span>
            </button>
            
            {expandedCategories.includes(category.id) && (
              <div className="ml-6 mt-1 space-y-1">
                {category.documents.map((document) => (
                  <button
                    key={document.id}
                    onClick={() => onSelectDocument(document)}
                    className={cn(
                      "flex items-center w-full py-1.5 px-2 text-sm rounded-md",
                      selectedDocument?.id === document.id
                        ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    )}
                  >
                    <File className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="truncate">{document.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};
