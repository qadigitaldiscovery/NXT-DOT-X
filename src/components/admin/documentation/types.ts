
export type DocumentType = 'pdf' | 'text' | 'markdown' | 'image' | 'zip' | 'other';

export interface DocumentItem {
  id: string;
  title: string;
  description?: string;
  type: DocumentType;
  url?: string;
  content?: string;
  createdAt: string;
  updatedAt: string;
  author: string;
  isPublic?: boolean;
  shareId?: string | null;
}

export interface DocumentCategory {
  id: string;
  name: string;
  documents: DocumentItem[];
}
