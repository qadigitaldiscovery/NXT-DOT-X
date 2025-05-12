
import { DocumentCategory, DocumentItem, DocumentType } from './types';
import { documentCategories as initialDocumentCategories } from './mockData';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Class to manage document data and operations with Supabase integration
class DocumentService {
  // Load initial mock data only for first-time setup
  private initialMockDataLoaded = false;
  
  constructor() {
    // We'll load data from Supabase instead of initializing with mock data directly
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
          
          return {
            id: category.id,
            name: category.name,
            documents: documents as DocumentItem[],
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
      
      return data;
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
        
        // Extract just the document data (removing the nested category)
        const { document_categories, ...documentData } = doc;
        categoriesMap.get(category.id)?.documents.push(documentData as DocumentItem);
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
      
      return data;
    } catch (error) {
      console.error('Error in getDocumentById:', error);
      return null;
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
      
      return data;
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
        author: metadata.author
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
      // Remove any properties that shouldn't be sent to Supabase
      const { createdAt, updatedAt, ...validUpdates } = updates;
      
      const { data, error } = await supabase
        .from('documents')
        .update({
          ...validUpdates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating document:', error);
        return null;
      }
      
      return data;
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
        documents: [],
      };
    } catch (error) {
      console.error('Error in addCategory:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const documentService = new DocumentService();
