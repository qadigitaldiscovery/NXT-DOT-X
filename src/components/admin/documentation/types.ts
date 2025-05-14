
export interface DocumentCategory {
  id: string;
  name: string;
  created_at?: string;
  updated_at?: string;
  documents: DocumentItem[]; // Add documents array property
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
  // Add these missing properties
  isPublic?: boolean;
  shareId?: string | null;
  // Include camelCase aliases for compatibility
  createdAt?: string;
  updatedAt?: string;
}

export type DocumentType = 'markdown' | 'pdf' | 'image' | 'text' | 'zip' | 'other';
