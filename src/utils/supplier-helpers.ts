
import { formatCSV } from './csv-helpers';

export interface SupplierData {
  name: string;
  code: string;
  email?: string;
  phone?: string;
  website?: string;
  contact_name?: string;
  payment_terms?: string;
  status?: string;
}

/**
 * Parses a CSV string into an array of supplier objects
 * @param csvText The CSV text to parse
 * @returns An array of supplier data objects
 */
export function parseCsvToSuppliers(csvText: string): SupplierData[] {
  const formattedCsv = formatCSV(csvText);
  
  if (formattedCsv.length < 2) {
    // Need at least headers and one data row
    return [];
  }
  
  const headers = formattedCsv[0].map(h => h.toLowerCase());
  const suppliers: SupplierData[] = [];
  
  // Start from index 1 to skip headers
  for (let i = 1; i < formattedCsv.length; i++) {
    const row = formattedCsv[i];
    
    // Skip rows that don't have at least name and code
    if (row.length < 2 || !row[0] || !row[1]) {
      continue;
    }
    
    const supplier: SupplierData = {
      name: '',
      code: '',
    };
    
    // Map each column to the corresponding field
    for (let j = 0; j < headers.length; j++) {
      const header = headers[j];
      const value = row[j] || '';
      
      if (header === 'name') {
        supplier.name = value;
      } else if (header === 'code') {
        supplier.code = value;
      } else if (header === 'email') {
        supplier.email = value || undefined;
      } else if (header === 'phone') {
        supplier.phone = value || undefined;
      } else if (header === 'website') {
        supplier.website = value || undefined;
      } else if (header === 'contact' || header === 'contact_name' || header === 'contact name') {
        supplier.contact_name = value || undefined;
      } else if (header === 'payment_terms' || header === 'payment terms') {
        supplier.payment_terms = value || undefined;
      } else if (header === 'status') {
        supplier.status = value || 'active';
      }
    }
    
    // Add to suppliers if name and code are present
    if (supplier.name && supplier.code) {
      suppliers.push(supplier);
    }
  }
  
  return suppliers;
}
