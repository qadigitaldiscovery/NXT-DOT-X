
export type DocumentType = 'pdf' | 'text' | 'markdown' | 'image' | 'other';

export interface DocumentItem {
  id: string;
  title: string;
  description?: string;
  type: DocumentType;
  url?: string;
  content?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DocumentCategory {
  id: string;
  name: string;
  documents: DocumentItem[];
}
