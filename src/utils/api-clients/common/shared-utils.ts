
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
 * Get API key from storage or database for a specific provider
 * @param providerName The name of the provider (e.g., 'openai', 'requesty')
 * @param localStorageKey The key used in localStorage
 * @returns The API key and config if available
 */
export async function getApiKey(
  providerName: string, 
  localStorageKey: string
): Promise<{key: string | null; model: string | null; config: any | null}> {
  // Try to get from localStorage first
  const localData = localStorage.getItem(localStorageKey);
  
  if (localData) {
    try {
      const parsed = JSON.parse(localData);
      if (parsed && parsed.key) {
        return {
          key: parsed.key,
          model: parsed.model || null,
          config: parsed.config || null
        };
      }
    } catch (err) {
      console.error('Error parsing local storage data:', err);
    }
  }

  // If not found in localStorage, try getting from database
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      // Check if config column exists
      let hasConfigColumn = false;
      try {
        const { error } = await supabase
          .from('api_provider_settings' as any)
          .select('config')
          .limit(1);
        
        hasConfigColumn = !error || !error.message.includes("column 'config' does not exist");
      } catch (err) {
        console.error("Error checking if config column exists:", err);
      }
      
      // Select appropriate columns
      const selectQuery = hasConfigColumn 
        ? 'api_key, preferred_model, config' 
        : 'api_key, preferred_model';
      
      const { data, error } = await supabase
        .from('api_provider_settings')
        .select(selectQuery)
        .eq('provider_name', providerName)
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (!error || (error.code !== 'PGRST116' && !error.message.includes("column"))) {
        // Type guard to ensure data is of the expected shape and not null
        if (data && typeof data === 'object') {
          const apiKey = 'api_key' in data ? (data.api_key as string) : null;
          const preferredModel = 'preferred_model' in data ? (data.preferred_model as string) : null;
          const configValue = hasConfigColumn && 'config' in data ? data.config : null;
          
          return {
            key: apiKey,
            model: preferredModel,
            config: configValue
          };
        }
      } else {
        console.error("Error fetching API key:", error);
      }
    }
  } catch (err) {
    console.error("Error fetching API key:", err);
  }

  return { key: null, model: null, config: null };
}

/**
 * Try to use an edge function, and return the result if successful
 */
export async function tryUseEdgeFunction<T>(
  provider: string, 
  endpoint: string, 
  payload: any
): Promise<T | null> {
  try {
    // Check if edge functions are enabled
    const useEdgeFunctions = true; // For now, always try to use edge functions
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

// Token estimation utility function
export function estimateTokenCount(text: string): number {
  // A very rough approximation: about 4 chars per token for English text
  return Math.ceil(text.length / 4);
}
