import { Button } from '@/components/ui/button';
import { AddDocumentDialog } from './AddDocumentDialog';
import { AddCategoryDialog } from './AddCategoryDialog';
import { DocumentUpload } from './DocumentUpload';
import { DocumentCategory, DocumentType } from './types';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Upload, RefreshCcw, FileText } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface DocumentToolbarProps {
  categories: DocumentCategory[];
  onDocumentAdd: (categoryId: string, document: {
    title: string;
    description?: string;
    type: DocumentType;
    content?: string;
    author: string;
  }) => void;
  onCategoryAdd: (category: { name: string }) => void;
  onFileUpload: (file: File, type: DocumentType, metadata: {
    title: string;
    description?: string;
    author: string;
    categoryId: string;
  }) => void;
  onRefresh: () => void;
}

export const DocumentToolbar = ({
  categories,
  onDocumentAdd,
  onCategoryAdd,
  onFileUpload,
  onRefresh,
}: DocumentToolbarProps) => {
  return (
    <div className="flex flex-wrap gap-2 justify-between items-center bg-white dark:bg-gray-800 p-3 rounded-lg shadow mb-4">
      <div className="flex flex-wrap items-center gap-2">
        <AddDocumentDialog 
          categories={categories} 
          onDocumentAdd={onDocumentAdd} 
        />
        <AddCategoryDialog onCategoryAdd={onCategoryAdd} />
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="secondary" className="flex items-center gap-2">
              <Upload size={16} />
              Upload Document
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[350px] sm:w-[450px]">
            <div className="font-medium flex items-center gap-2 mb-2">
              <FileText size={16} />
              <h3>Upload Document File</h3>
            </div>
            <Separator className="my-2" />
            <DocumentUpload 
              onFileUpload={onFileUpload}
              categories={categories}
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <Button 
        variant="outline" 
        size="icon"
        onClick={onRefresh}
        title="Refresh documents"
      >
        <RefreshCcw size={16} />
      </Button>
    </div>
  );
};
