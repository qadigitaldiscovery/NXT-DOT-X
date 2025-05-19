
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../integrations/supabase/client';

export function useDatabaseTables(searchTerm: string = '') {
  return useQuery({
    queryKey: ['database-tables', searchTerm],
    queryFn: async () => {
      console.log('Fetching tables with search term:', searchTerm);

      const { data, error } = await supabase
        .from('pg_tables')
        .select('tablename')
        .ilike('tablename', `%${searchTerm}%`);

      if (error) {
        console.error('Error fetching tables:', error);
        return [];
      }

      return data?.map((table) => ({ name: table.tablename })) || [];
    },
    refetchOnWindowFocus: false // Disable automatic refetches on window focus for better control
  });
}
