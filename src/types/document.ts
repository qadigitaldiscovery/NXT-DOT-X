
export interface Document {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadedAt: Date;
  uploadedBy: string;
  category?: string;
  tags?: string[];
}

export interface DocumentCategory {
  id: string;
  name: string;
  description?: string;
  color?: string;
}

export interface DocumentFilter {
  category?: string;
  type?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  tags?: string[];
  searchTerm?: string;
}
