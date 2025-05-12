
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';

// Create a custom ApiError class
export class ApiError extends Error {
  type?: string;
  code?: string;
  status?: number;
  
  constructor(message: string, details?: { type?: string; code?: string; status?: number }) {
    super(message);
    this.name = 'ApiError';
    this.type = details?.type;
    this.code = details?.code;
    this.status = details?.status;
  }
}

/**
 * Try to use an edge function, and return the result if successful
 * @param provider The provider name (e.g., 'openai')
 * @param endpoint The endpoint path (e.g., 'chat/completions')
 * @param payload The request payload
 * @returns The response from the edge function, or null if it failed
 */
export async function tryUseEdgeFunction<T>(
  provider: string, 
  endpoint: string, 
  payload: any
): Promise<T | null> {
  try {
    // Check if edge functions are enabled
    const useEdgeFunctions = await getEdgeFunctionPreference();
    if (!useEdgeFunctions) {
      return null;
    }
    
    // Call the edge function
    const { data, error } = await supabase.functions.invoke(`${provider}-proxy`, {
      body: {
        endpoint,
        payload
      }
    });
    
    if (error) {
      console.error(`Error calling ${provider} edge function:`, error);
      return null;
    }
    
    return data as T;
  } catch (err) {
    console.error(`Error calling ${provider} edge function:`, err);
    return null;
  }
}

/**
 * Process a streaming response from an API
 * @param body The response body to process
 */
export async function* processStreamingResponse(
  body: ReadableStream<Uint8Array>
): AsyncGenerator<string, void, unknown> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value);
      const lines = chunk
        .split('\n')
        .filter(line => line.trim() !== '');
      
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          
          // Skip the [DONE] message
          if (data === '[DONE]') continue;
          
          try {
            const parsed = JSON.parse(data);
            
            // Handle different streaming formats
            if (parsed.choices && parsed.choices.length > 0) {
              if (parsed.choices[0].delta && parsed.choices[0].delta.content) {
                yield parsed.choices[0].delta.content;
              } else if (parsed.choices[0].text) {
                yield parsed.choices[0].text;
              }
            }
          } catch (error) {
            console.warn('Error parsing SSE data:', error);
          }
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}

/**
 * Check if edge functions should be used
 */
async function getEdgeFunctionPreference(): Promise<boolean> {
  // Default to true if not specified
  return true;
}
