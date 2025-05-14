
import { supabase } from '@/integrations/supabase/client';

/**
 * Attempts to call a Supabase edge function with error handling and logging
 * 
 * @param provider - The provider category for the edge function
 * @param endpoint - The edge function endpoint name
 * @param payload - The data to send to the edge function
 * @returns The response data or null if the call failed
 */
export async function tryUseEdgeFunction<T>(
  provider: string, 
  endpoint: string, 
  payload: any
): Promise<T | null> {
  try {
    console.log(`Attempting to call ${provider} edge function: ${endpoint}`);
    
    // Set a reasonable timeout for edge functions
    const timeoutPromise = new Promise<null>((resolve) => {
      setTimeout(() => resolve(null), 10000); // 10 second timeout
    });
    
    // Call the edge function
    const functionPromise = supabase.functions.invoke(endpoint, {
      body: payload
    }).then(({ data, error }) => {
      if (error) {
        console.error(`Error calling ${endpoint} edge function:`, error);
        return null;
      }
      
      return data as T;
    }).catch(error => {
      console.error(`Exception calling ${endpoint} edge function:`, error);
      return null;
    });
    
    // Race the function call against the timeout
    const result = await Promise.race([functionPromise, timeoutPromise]);
    
    if (result === null) {
      console.warn(`Edge function ${endpoint} timed out or returned null`);
    }
    
    return result;
  } catch (error) {
    console.error(`Error in tryUseEdgeFunction for ${endpoint}:`, error);
    return null;
  }
}

/**
 * Checks if Supabase edge functions are available
 */
export async function checkEdgeFunctionsAvailability(): Promise<boolean> {
  try {
    const { data, error } = await supabase.functions.invoke('create-documents-bucket', {
      body: {}
    });
    
    if (error) {
      console.warn("Edge functions test failed:", error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.warn("Edge functions test failed with exception:", error);
    return false;
  }
}
