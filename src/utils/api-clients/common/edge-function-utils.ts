
import { supabase } from '@/integrations/supabase/client';

// Function to try using edge function
export async function tryUseEdgeFunction<T>(
  provider: string, 
  endpoint: string, 
  payload: any
): Promise<T | null> {
  try {
    console.log(`Attempting to call ${provider} edge function`);
    const { data, error } = await supabase.functions.invoke('api-proxy', {
      body: {
        provider,
        endpoint,
        payload
      }
    });
    
    if (error) {
      console.error(`Error calling ${provider} edge function:`, error);
      return null;
    }
    
    if (!data) {
      console.log('No data returned from edge function');
      return null;
    }
    
    return data as T;
  } catch (error) {
    console.error(`Error calling ${provider} edge function:`, error);
    return null;
  }
}
