
import { DocumentCategory, DocumentItem, DocumentType } from './types';
import { documentCategories as initialDocumentCategories } from './mockData';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Interface that matches Supabase's database column names
interface DbDocumentItem {
  id: string;
  category_id: string;
  title: string;
  description?: string;
  type: string;
  content?: string;
  url?: string;
  author?: string;
  created_at: string;
  updated_at: string;
  is_public?: boolean;
  share_id?: string;
}

// Class to manage document data and operations with Supabase integration
class DocumentService {
  // Load initial mock data only for first-time setup
  private initialMockDataLoaded = false;
  
  constructor() {
    // We'll load data from Supabase instead of initializing with mock data directly
  }
  
  // Convert a database document to our application's DocumentItem format
  private mapDbDocumentToDocumentItem(dbDocument: DbDocumentItem): DocumentItem {
    return {
      id: dbDocument.id,
      title: dbDocument.title,
      description: dbDocument.description || '',
      type: dbDocument.type as DocumentType,
      content: dbDocument.content || '',
      url: dbDocument.url || '',
      author: dbDocument.author || '',
      category_id: dbDocument.category_id,
      created_at: dbDocument.created_at,
      updated_at: dbDocument.updated_at,
      // Add aliases for compatibility
      createdAt: dbDocument.created_at,
      updatedAt: dbDocument.updated_at,
      isPublic: dbDocument.is_public || false,
      shareId: dbDocument.share_id || null
    };
  }

  // Generate a unique share ID for a document
  private generateShareId(): string {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }
  
  // Get all document categories from Supabase
  async getAllCategories(): Promise<DocumentCategory[]> {
    try {
      // Fetch categories from Supabase
      const { data: categories, error: categoriesError } = await supabase
        .from('document_categories')
        .select('*')
        .order('name');
      
      if (categoriesError) {
        console.error('Error fetching categories:', categoriesError);
        toast.error('Failed to load document categories');
        return [];
      }
      
      // For each category, fetch its documents
      const categoriesWithDocuments: DocumentCategory[] = await Promise.all(
        categories.map(async (category) => {
          const { data: documents, error: documentsError } = await supabase
            .from('documents')
            .select('*')
            .eq('category_id', category.id)
            .order('title');
          
          if (documentsError) {
            console.error(`Error fetching documents for category ${category.id}:`, documentsError);
            return {
              ...category,
              documents: [],
            };
          }
          
          // Map database documents to our DocumentItem format
          const mappedDocuments = documents.map(doc => this.mapDbDocumentToDocumentItem(doc as DbDocumentItem));
          
          return {
            id: category.id,
            name: category.name,
            created_at: category.created_at,
            updated_at: category.updated_at,
            documents: mappedDocuments,
          };
        })
      );
      
      // If no categories exist and mock data hasn't been loaded yet, initialize with mock data
      if (categoriesWithDocuments.length === 0 && !this.initialMockDataLoaded) {
        console.log('No categories found, initializing with mock data...');
        await this.initializeWithMockData();
        this.initialMockDataLoaded = true;
        return this.getAllCategories();
      }
      
      return categoriesWithDocuments;
    } catch (error) {
      console.error('Error in getAllCategories:', error);
      toast.error('Failed to load document categories');
      return [];
    }
  }
  
  // Initialize the database with mock data (only if empty)
  private async initializeWithMockData() {
    try {
      // First, add categories
      for (const category of initialDocumentCategories) {
        const { data: newCategory, error: categoryError } = await supabase
          .from('document_categories')
          .insert({ name: category.name })
          .select()
          .single();
        
        if (categoryError) {
          console.error('Error inserting mock category:', categoryError);
          continue;
        }
        
        // Then add documents for this category
        for (const doc of category.documents) {
          await supabase
            .from('documents')
            .insert({
              category_id: newCategory.id,
              title: doc.title,
              description: doc.description || '',
              type: doc.type,
              content: doc.content || '',
              url: doc.url || '',
              author: doc.author || 'System',
            });
        }
      }
      
      console.log('Mock data initialized successfully');
    } catch (error) {
      console.error('Error initializing mock data:', error);
      toast.error('Failed to initialize document database');
    }
  }
  
  // Get all documents across all categories
  async getAllDocuments(): Promise<DocumentItem[]> {
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .order('title');
      
      if (error) {
        console.error('Error fetching all documents:', error);
        return [];
      }
      
      // Map database documents to our DocumentItem format
      return data.map(doc => this.mapDbDocumentToDocumentItem(doc as DbDocumentItem));
    } catch (error) {
      console.error('Error in getAllDocuments:', error);
      return [];
    }
  }
  
  // Search documents
  async searchDocuments(searchTerm: string): Promise<DocumentCategory[]> {
    if (!searchTerm) return this.getAllCategories();
    
    try {
      const lowercasedTerm = searchTerm.toLowerCase();
      
      // Search for documents that match the search term
      const { data: matchingDocuments, error } = await supabase
        .from('documents')
        .select('*, document_categories!inner(id, name)')
        .or(`title.ilike.%${lowercasedTerm}%,content.ilike.%${lowercasedTerm}%,description.ilike.%${lowercasedTerm}%`);
      
      if (error) {
        console.error('Error searching documents:', error);
        return [];
      }
      
      // Group documents by category
      const categoriesMap = new Map<string, DocumentCategory>();
      
      for (const doc of matchingDocuments) {
        const category = doc.document_categories;
        
        if (!categoriesMap.has(category.id)) {
          categoriesMap.set(category.id, {
            id: category.id,
            name: category.name,
            documents: [],
          });
        }
        
        // Extract just the document data (removing the nested category) and map to DocumentItem
        const { document_categories, ...documentData } = doc;
        categoriesMap.get(category.id)?.documents.push(this.mapDbDocumentToDocumentItem(documentData as DbDocumentItem));
      }
      
      return Array.from(categoriesMap.values());
    } catch (error) {
      console.error('Error in searchDocuments:', error);
      return [];
    }
  }
  
  // Get document by ID
  async getDocumentById(id: string): Promise<DocumentItem | null> {
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error('Error fetching document by ID:', error);
        return null;
      }
      
      return this.mapDbDocumentToDocumentItem(data as DbDocumentItem);
    } catch (error) {
      console.error('Error in getDocumentById:', error);
      return null;
    }
  }
  
  // Get document by share ID
  async getDocumentByShareId(shareId: string): Promise<DocumentItem | null> {
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('share_id', shareId)
        .eq('is_public', true)
        .single();
      
      if (error) {
        console.error('Error fetching document by share ID:', error);
        return null;
      }
      
      return this.mapDbDocumentToDocumentItem(data as DbDocumentItem);
    } catch (error) {
      console.error('Error in getDocumentByShareId:', error);
      return null;
    }
  }
  
  // Create a shareable link for a document
  async createShareableLink(documentId: string): Promise<string | null> {
    try {
      // Generate a unique share ID
      const shareId = this.generateShareId();
      
      // Update the document with the share ID and make it public
      const { data, error } = await supabase
        .from('documents')
        .update({
          share_id: shareId,
          is_public: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', documentId)
        .select()
        .single();
      
      if (error) {
        console.error('Error creating shareable link:', error);
        return null;
      }
      
      // Return the share URL
      const baseUrl = window.location.origin;
      return `${baseUrl}/shared-document/${shareId}`;
    } catch (error) {
      console.error('Error in createShareableLink:', error);
      return null;
    }
  }
  
  // Remove the shareable link from a document
  async removeShareableLink(documentId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('documents')
        .update({
          share_id: null,
          is_public: false,
          updated_at: new Date().toISOString()
        })
        .eq('id', documentId);
      
      if (error) {
        console.error('Error removing shareable link:', error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error in removeShareableLink:', error);
      return false;
    }
  }
  
  // Add document
  async addDocument(categoryId: string, document: Omit<DocumentItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<DocumentItem> {
    try {
      const { data, error } = await supabase
        .from('documents')
        .insert({
          category_id: categoryId,
          title: document.title,
          description: document.description || '',
          type: document.type,
          content: document.content || '',
          url: document.url || '',
          author: document.author || 'Unknown',
        })
        .select()
        .single();
      
      if (error) {
        console.error('Error adding document:', error);
        throw new Error(`Failed to add document: ${error.message}`);
      }
      
      return this.mapDbDocumentToDocumentItem(data as DbDocumentItem);
    } catch (error) {
      console.error('Error in addDocument:', error);
      throw error;
    }
  }
  
  // Add document from file upload
  async addDocumentFromFile(file: File, type: DocumentType, metadata: {
    title: string;
    description?: string;
    author: string;
    categoryId: string;
  }): Promise<DocumentItem> {
    try {
      // Create URL for the file
      const url = URL.createObjectURL(file);
      
      // For text or markdown files, try to read the content
      let content = '';
      if (type === 'text' || type === 'markdown') {
        try {
          content = await this.readFileContent(file);
          console.log(`Read content from ${metadata.title}, length: ${content.length}`);
        } catch (error) {
          console.error("Error reading file content:", error);
        }
      }
      
      // Store the document in Supabase
      const document = await this.addDocument(metadata.categoryId, {
        title: metadata.title,
        description: metadata.description || '',
        type: type,
        content: content,
        url: url,
        author: metadata.author,
        category_id: metadata.categoryId // Make sure to include category_id
      });
      
      return document;
    } catch (error) {
      console.error('Error in addDocumentFromFile:', error);
      throw error;
    }
  }
  
  // Helper method to read file content
  private readFileContent(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === 'string') {
          resolve(e.target.result);
        } else {
          reject(new Error('Failed to read file content'));
        }
      };
      
      reader.onerror = (e) => {
        reject(new Error('Error reading file: ' + e.target?.error));
      };
      
      reader.readAsText(file);
    });
  }
  
  // Update document
  async updateDocument(id: string, updates: Partial<DocumentItem>): Promise<DocumentItem | null> {
    try {
      // Convert from our DocumentItem format to database format
      const dbUpdates: Partial<DbDocumentItem> = {
        ...(updates.title !== undefined && { title: updates.title }),
        ...(updates.description !== undefined && { description: updates.description }),
        ...(updates.content !== undefined && { content: updates.content }),
        ...(updates.url !== undefined && { url: updates.url }),
        ...(updates.author !== undefined && { author: updates.author }),
        ...(updates.type !== undefined && { type: updates.type }),
      };
      
      const { data, error } = await supabase
        .from('documents')
        .update({
          ...dbUpdates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating document:', error);
        return null;
      }
      
      return this.mapDbDocumentToDocumentItem(data as DbDocumentItem);
    } catch (error) {
      console.error('Error in updateDocument:', error);
      return null;
    }
  }
  
  // Delete document
  async deleteDocument(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('documents')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Error deleting document:', error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error in deleteDocument:', error);
      return false;
    }
  }
  
  // Add category
  async addCategory(category: Omit<DocumentCategory, 'id' | 'documents'>): Promise<DocumentCategory> {
    try {
      const { data, error } = await supabase
        .from('document_categories')
        .insert({ name: category.name })
        .select()
        .single();
      
      if (error) {
        console.error('Error adding category:', error);
        throw new Error(`Failed to add category: ${error.message}`);
      }
      
      return {
        ...data,
        documents: [], // Include empty documents array
      };
    } catch (error) {
      console.error('Error in addCategory:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const documentService = new DocumentService();
