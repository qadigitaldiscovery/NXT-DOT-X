
import { supabase } from '@/integrations/supabase/client';

/**
 * Try to use an edge function, with error handling
 */
export const tryUseEdgeFunction = async <T>(
  namespace: string,
  functionName: string,
  payload: any,
  options?: {
    timeout?: number;
  }
): Promise<T | null> => {
  try {
    const { data, error } = await supabase.functions.invoke(`${namespace ? namespace + '/' : ''}${functionName}`, {
      body: payload
    });

    if (error) {
      console.error(`Error calling ${functionName} edge function:`, error);
      return null;
    }

    return data as T;
  } catch (error) {
    console.error(`Error calling ${functionName} edge function:`, error);
    
    // Try waiting with a setTimeout to give the function more time to complete
    // This is useful for edge functions that might take longer than the default timeout
    if (options?.timeout) {
      try {
        console.warn(`Retrying ${functionName} edge function with ${options.timeout}ms timeout`);
        return new Promise((resolve) => {
          setTimeout(async () => {
            const { data, error } = await supabase.functions.invoke(`${namespace ? namespace + '/' : ''}${functionName}`, {
              body: payload
            });
            
            if (error) {
              console.warn(`Edge function ${functionName} timed out or returned null`);
              resolve(null);
            } else {
              resolve(data as T);
            }
          }, options.timeout);
        });
      } catch (retryError) {
        console.warn(`Edge function ${functionName} retry failed:`, retryError);
      }
    }
    
    console.warn(`Edge function ${functionName} timed out or returned null`);
    return null;
  }
};
