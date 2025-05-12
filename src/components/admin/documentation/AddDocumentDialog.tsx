
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { DocumentCategory, DocumentType } from './types';
import { FilePlus } from 'lucide-react';
import { toast } from 'sonner';

interface AddDocumentDialogProps {
  categories: DocumentCategory[];
  onDocumentAdd: (categoryId: string, document: { 
    title: string;
    description?: string;
    type: DocumentType;
    content?: string;
    author: string;
  }) => void;
}

export const AddDocumentDialog = ({ categories, onDocumentAdd }: AddDocumentDialogProps) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [documentType, setDocumentType] = useState<DocumentType>('markdown');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !categoryId || !documentType || !author) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    onDocumentAdd(categoryId, {
      title,
      description,
      type: documentType,
      content,
      author
    });
    
    // Reset form
    resetForm();
    setOpen(false);
    toast.success('Document added successfully');
  };
  
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setContent('');
    setCategoryId('');
    setDocumentType('markdown');
    setAuthor('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <FilePlus size={16} />
          Add Document
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Document</DialogTitle>
            <DialogDescription>
              Create a new documentation document
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category <span className="text-red-500">*</span>
              </Label>
              <Select
                value={categoryId}
                onValueChange={setCategoryId}
                required
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Document Type <span className="text-red-500">*</span>
              </Label>
              <Select
                value={documentType}
                onValueChange={(value: DocumentType) => setDocumentType(value)}
                required
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="markdown">Markdown</SelectItem>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="image">Image</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="author" className="text-right">
                Author <span className="text-red-500">*</span>
              </Label>
              <Input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right pt-2">
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
                rows={2}
              />
            </div>
            
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="content" className="text-right pt-2">
                Content
              </Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="col-span-3 font-mono"
                rows={10}
                placeholder={documentType === 'markdown' ? '# Document Title\n\nContent goes here...' : ''}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit">Add Document</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
