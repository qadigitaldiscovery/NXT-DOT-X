
import { supabase } from '@/integrations/supabase/client';

/**
 * Try to use an edge function, with error handling and improved timeout handling
 */
export const tryUseEdgeFunction = async <T>(
  namespace: string,
  functionName: string,
  payload: any,
  options?: {
    timeout?: number;
    retries?: number;
  }
): Promise<T | null> => {
  const retries = options?.retries || 1;
  
  try {
    // First attempt
    const { data, error } = await supabase.functions.invoke(`${namespace ? namespace + '/' : ''}${functionName}`, {
      body: payload
    });

    if (error) {
      console.error(`Error calling ${functionName} edge function:`, error);
      
      if (retries > 0 && options?.timeout) {
        console.warn(`Will retry ${functionName} edge function after ${options.timeout}ms...`);
        return tryRetry();
      }
      return null;
    }

    return data as T;
  } catch (error) {
    console.error(`Exception calling ${functionName} edge function:`, error);
    
    if (retries > 0 && options?.timeout) {
      console.warn(`Will retry ${functionName} edge function after ${options.timeout}ms...`);
      return tryRetry();
    }
    
    console.warn(`Edge function ${functionName} failed with no retry options`);
    return null;
  }
  
  // Helper function for retry logic
  async function tryRetry(): Promise<T | null> {
    try {
      return new Promise((resolve) => {
        setTimeout(async () => {
          try {
            console.log(`Retrying ${functionName} edge function...`);
            const { data, error } = await supabase.functions.invoke(`${namespace ? namespace + '/' : ''}${functionName}`, {
              body: payload
            });
            
            if (error) {
              console.warn(`Edge function ${functionName} retry failed:`, error);
              resolve(null);
            } else {
              resolve(data as T);
            }
          } catch (retryError) {
            console.warn(`Edge function ${functionName} retry exception:`, retryError);
            resolve(null);
          }
        }, options?.timeout || 2000);
      });
    } catch (retryError) {
      console.warn(`Edge function ${functionName} retry attempt failed:`, retryError);
      return null;
    }
  }
};
