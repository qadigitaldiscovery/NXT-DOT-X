
import { supabase } from '@/integrations/supabase/client';

type EdgeFunctionOptions = {
  timeout?: number; // Timeout in milliseconds
  headers?: Record<string, string>;
};

/**
 * Try to use a Supabase Edge Function with improved error handling.
 * @param functionName The name of the Edge Function.
 * @param functionData The data to pass to the Edge Function.
 * @param options Additional options like timeout.
 * @returns The response from the Edge Function, or null if it fails.
 */
export async function tryUseEdgeFunction<T = any>(
  functionName: string,
  action: string, 
  functionData: any,
  options: EdgeFunctionOptions = {}
): Promise<T | null> {
  const { timeout = 30000, headers = {} } = options;
  
  try {
    // Create an abort controller with the specified timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    // Include the action in the function data
    const fullFunctionData = {
      ...functionData,
      action
    };

    // Call the Supabase Edge Function
    // Remove the signal property as it's not supported in FunctionInvokeOptions
    const { data, error } = await supabase.functions.invoke(functionName, {
      body: fullFunctionData,
      headers
      // signal is not supported in the Supabase JS client
    });
    
    // Clear the timeout
    clearTimeout(timeoutId);
    
    if (error) {
      if (error.message.includes('aborted')) {
        console.error(`Edge function ${functionName} timed out after ${timeout}ms`);
        throw new Error(`Request to ${functionName} timed out. Please try again.`);
      } else {
        console.error(`Error calling edge function ${functionName}:`, error);
        throw error;
      }
    }
    
    return data as T;
  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.error(`Edge function ${functionName} timed out after ${timeout}ms`);
      throw new Error(`Request to ${functionName} timed out. Please try again.`);
    }
    console.error(`Exception in edge function ${functionName}:`, error);
    return null;
  }
}
