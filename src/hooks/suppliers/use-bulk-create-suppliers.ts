
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function useCreateBulkSuppliers() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ csvData }: { csvData: string }) => {
      // Parse CSV data
      const lines = csvData.split('\n');
      if (lines.length < 2) {
        throw new Error('CSV file must contain at least a header row and one data row');
      }
      
      const headers = lines[0].toLowerCase().split(',').map(h => h.trim().replace(/"/g, ''));
      
      // Validate required headers
      const requiredHeaders = ['name', 'code'];
      const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));
      
      if (missingHeaders.length > 0) {
        throw new Error(`Missing required headers: ${missingHeaders.join(', ')}`);
      }
      
      // Parse rows and create suppliers
      const suppliers: Record<string, any>[] = [];
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        // Handle quoted values correctly
        const values: string[] = [];
        let inQuotes = false;
        let currentValue = '';
        
        for (let j = 0; j < line.length; j++) {
          const char = line[j];
          
          if (char === '"' && (j === 0 || line[j-1] !== '\\')) {
            inQuotes = !inQuotes;
          } else if (char === ',' && !inQuotes) {
            values.push(currentValue.replace(/"/g, '').trim());
            currentValue = '';
          } else {
            currentValue += char;
          }
        }
        
        values.push(currentValue.replace(/"/g, '').trim());
        
        // Create supplier object
        const supplier: Record<string, any> = {};
        headers.forEach((header, index) => {
          if (index < values.length) {
            supplier[header] = values[index];
          }
        });
        
        // Validate required fields in each row
        const missingFields = requiredHeaders.filter(field => !supplier[field]);
        if (missingFields.length > 0) {
          // Skip rows with missing required fields
          console.warn(`Row ${i} skipped: Missing required fields: ${missingFields.join(', ')}`);
          continue;
        }
        
        suppliers.push(supplier);
      }
      
      // Insert suppliers
      if (suppliers.length === 0) {
        throw new Error('No valid suppliers found in CSV');
      }
      
      console.log('Inserting suppliers:', suppliers);
      
      // Type assertion to match the expected schema
      const { data, error } = await supabase
        .from('suppliers')
        .insert(suppliers as any[])
        .select('id');
      
      if (error) {
        console.error('Error creating suppliers:', error);
        throw new Error(`Failed to create suppliers: ${error.message}`);
      }
      
      return { count: suppliers.length, ids: data };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
    }
  });
}
