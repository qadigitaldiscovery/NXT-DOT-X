
import { useQuery } from '@tanstack/react-query';
import { mockTables } from '@/components/admin/database/mock-data';

export function useDatabaseTables(searchTerm: string = '') {
  return useQuery({
    queryKey: ['database-tables', searchTerm],
    queryFn: async () => {
      // In a real implementation, this would call a Supabase function
      console.log('Fetching tables with search term:', searchTerm);
      return mockTables.filter(table => 
        searchTerm ? table.name.toLowerCase().includes(searchTerm.toLowerCase()) : true
      );
    }
  });
}
