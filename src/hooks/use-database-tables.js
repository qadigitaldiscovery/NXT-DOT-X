import { useQuery } from '@tanstack/react-query';
import { supabase } from '../integrations/supabase/client';
export function useDatabaseTables(searchTerm = '') {
    return useQuery({
        queryKey: ['database-tables', searchTerm],
        queryFn: async () => {
            console.log('Fetching tables with search term:', searchTerm);
            // Use metadata API instead of direct pg_tables query for better compatibility
            const { data, error } = await supabase
                .from('information_schema.tables')
                .select('table_name')
                .eq('table_schema', 'public')
                .ilike('table_name', `%${searchTerm}%`);
            if (error) {
                console.error('Error fetching tables:', error);
                return [];
            }
            return data?.map((table) => ({ name: table.table_name })) || [];
        },
        refetchOnWindowFocus: false // Disable automatic refetches on window focus for better control
    });
}
