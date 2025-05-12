
import { DocumentCategory, DocumentItem, DocumentType } from './types';
import { documentCategories as initialDocumentCategories } from './mockData';

// Class to manage document data and operations
class DocumentService {
  private documents: DocumentItem[] = [];
  private categories: DocumentCategory[] = [];
  
  constructor() {
    // Initialize with mock data
    this.categories = JSON.parse(JSON.stringify(initialDocumentCategories));
    this.documents = this.categories.flatMap(category => category.documents);
  }
  
  // Get all document categories
  getAllCategories(): DocumentCategory[] {
    return this.categories;
  }
  
  // Get all documents
  getAllDocuments(): DocumentItem[] {
    return this.documents;
  }
  
  // Search documents
  searchDocuments(searchTerm: string): DocumentCategory[] {
    if (!searchTerm) return this.categories;
    
    const lowercasedTerm = searchTerm.toLowerCase();
    
    return this.categories.map(category => ({
      ...category,
      documents: category.documents.filter(doc => 
        doc.title.toLowerCase().includes(lowercasedTerm) || 
        doc.content?.toLowerCase().includes(lowercasedTerm) ||
        doc.description?.toLowerCase().includes(lowercasedTerm)
      )
    })).filter(category => category.documents.length > 0);
  }
  
  // Get document by ID
  getDocumentById(id: string): DocumentItem | null {
    return this.documents.find(doc => doc.id === id) || null;
  }
  
  // Add document
  addDocument(categoryId: string, document: Omit<DocumentItem, 'id' | 'createdAt' | 'updatedAt'>): DocumentItem {
    const newDoc: DocumentItem = {
      ...document,
      id: `doc-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    // Find category and add document
    const category = this.categories.find(c => c.id === categoryId);
    if (category) {
      category.documents.push(newDoc);
      this.documents.push(newDoc);
    }
    
    return newDoc;
  }
  
  // Add document from file upload
  async addDocumentFromFile(file: File, type: DocumentType, metadata: {
    title: string;
    description?: string;
    author: string;
    categoryId: string;
  }): Promise<DocumentItem> {
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
    
    return this.addDocument(metadata.categoryId, {
      title: metadata.title,
      description: metadata.description || '',
      type: type,
      content: content,
      url: url,
      author: metadata.author
    });
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
  updateDocument(id: string, updates: Partial<DocumentItem>): DocumentItem | null {
    const docIndex = this.documents.findIndex(doc => doc.id === id);
    if (docIndex === -1) return null;
    
    // Update document
    const updatedDoc = {
      ...this.documents[docIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    this.documents[docIndex] = updatedDoc;
    
    // Also update in category
    this.categories.forEach(category => {
      const catDocIndex = category.documents.findIndex(doc => doc.id === id);
      if (catDocIndex !== -1) {
        category.documents[catDocIndex] = updatedDoc;
      }
    });
    
    return updatedDoc;
  }
  
  // Delete document
  deleteDocument(id: string): boolean {
    const docIndex = this.documents.findIndex(doc => doc.id === id);
    if (docIndex === -1) return false;
    
    this.documents.splice(docIndex, 1);
    
    // Remove from category
    this.categories.forEach(category => {
      const catDocIndex = category.documents.findIndex(doc => doc.id === id);
      if (catDocIndex !== -1) {
        category.documents.splice(catDocIndex, 1);
      }
    });
    
    return true;
  }
  
  // Add category
  addCategory(category: Omit<DocumentCategory, 'id' | 'documents'>): DocumentCategory {
    const newCategory: DocumentCategory = {
      ...category,
      id: `cat-${Date.now()}`,
      documents: []
    };
    
    this.categories.push(newCategory);
    return newCategory;
  }
}

// Export singleton instance
export const documentService = new DocumentService();
