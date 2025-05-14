
import { supabase } from '@/integrations/supabase/client';

interface EdgeFunctionOptions {
  timeout?: number;
  headers?: Record<string, string>;
}

/**
 * Safely invoke an edge function with error handling
 * 
 * @param functionName Name of the edge function to invoke
 * @param payload Data to send to the function
 * @param options Optional configuration
 * @returns The function result or null if there was an error
 */
export async function tryUseEdgeFunction<T>(
  functionName: string, 
  payload: any, 
  options: EdgeFunctionOptions = {}
): Promise<T | null> {
  try {
    // Set default timeout to 20 seconds
    const timeout = options.timeout || 20000;
    
    // Create an AbortController to handle timeouts
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    // Call the edge function with the payload
    const { data, error } = await supabase.functions.invoke<T>(
      functionName, 
      {
        body: payload,
        headers: options.headers,
        signal: controller.signal
      }
    );
    
    // Clear the timeout
    clearTimeout(timeoutId);
    
    if (error) {
      console.error(`Edge function ${functionName} error:`, error);
      return null;
    }
    
    return data;
  } catch (err: any) {
    // Handle timeouts
    if (err.name === 'AbortError') {
      console.error(`Edge function ${functionName} timed out`);
      return null;
    }
    
    console.error(`Error calling edge function ${functionName}:`, err);
    return null;
  }
}
