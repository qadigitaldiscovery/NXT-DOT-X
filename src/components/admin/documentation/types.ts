
export interface DocumentCategory {
  id: string;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  description?: string;
  type: DocumentType;
  content?: string;
  url?: string;
  author?: string;
  category_id: string;
  created_at?: string;
  updated_at?: string;
}

export type DocumentType = 'markdown' | 'pdf' | 'image' | 'text' | 'zip' | 'other';
