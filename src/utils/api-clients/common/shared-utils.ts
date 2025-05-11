
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';

// Generic type for API provider settings
export interface ApiProviderSettings {
  api_key: string;
  preferred_model?: string;
  config?: any;
}

// Get API key from storage or database
export const getApiKey = async (
  providerName: string,
  localStorageKey: string
): Promise<{ key: string | null; model: string | null; config: any | null }> => {
  // Try to get from localStorage first as it's simpler
  const localKey = localStorage.getItem(localStorageKey);
  const localModel = localStorage.getItem(`${providerName}-preferred-model`);
  const localConfig = localStorage.getItem(`${providerName}-additional-config`);
  
  if (localKey) {
    let config = null;
    try {
      if (localConfig) {
        config = JSON.parse(localConfig);
      }
    } catch (e) {
      console.error(`Error parsing config from localStorage for ${providerName}:`, e);
    }
    
    return { 
      key: localKey, 
      model: localModel, 
      config 
    };
  }
  
  // If no key in localStorage, try database if user is logged in
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.user) {
      // First try with config column
      try {
        const { data, error } = await supabase
          .from('api_provider_settings')
          .select('api_key, preferred_model, config')
          .eq('provider_name', providerName)
          .eq('user_id', session.user.id)
          .maybeSingle();
          
        if (error) {
          // If error mentions missing config column, try simpler query
          if (error.message?.includes("column 'config' does not exist")) {
            const { data: simpleData, error: simpleError } = await supabase
              .from('api_provider_settings')
              .select('api_key, preferred_model')
              .eq('provider_name', providerName)
              .eq('user_id', session.user.id)
              .maybeSingle();
              
            if (!simpleError && simpleData && typeof simpleData === 'object') {
              // Make sure api_key property exists and is a string
              if ('api_key' in simpleData && typeof simpleData.api_key === 'string') {
                const model = 'preferred_model' in simpleData && 
                  typeof simpleData.preferred_model === 'string' ? 
                  simpleData.preferred_model : null;
                
                return { 
                  key: simpleData.api_key,
                  model,
                  config: null 
                };
              }
            } else if (simpleError) {
              console.error(`Error fetching ${providerName} API key with simple query:`, simpleError);
            }
          } else {
            console.error(`Error fetching ${providerName} API key:`, error);
          }
        } else if (data && typeof data === 'object') {
          // Make sure api_key property exists and is a string
          if ('api_key' in data && typeof data.api_key === 'string') {
            const model = 'preferred_model' in data && 
              typeof data.preferred_model === 'string' ? 
              data.preferred_model : null;
            
            return { 
              key: data.api_key,
              model,
              config: 'config' in data && data.config !== null ? data.config : null
            };
          }
        }
      } catch (err) {
        console.error(`Error in database query for ${providerName}:`, err);
      }
    }
  } catch (err) {
    console.error(`Error fetching ${providerName} API key from database:`, err);
  }
  
  return { key: null, model: null, config: null };
};

// Try to use edge function proxy first, fallback to direct API call
export const tryUseEdgeFunction = async <T>(
  provider: string,
  endpoint: string,
  payload: any
): Promise<T | null> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session) {
      // Call via the edge function for better security
      const { data, error } = await supabase.functions.invoke('api-proxy', {
        body: {
          provider,
          endpoint,
          payload
        }
      });
      
      if (!error) {
        return data as T;
      }
      
      // If the edge function fails, fall back to direct API call
      console.warn("Edge function failed, falling back to direct API call", error);
    }
  } catch (err) {
    console.warn("Could not use edge function, falling back to direct API call", err);
  }
  
  return null;
};

// Handle API response errors
export class ApiError extends Error {
  type?: string;
  code?: string;
  status?: number;
  
  constructor(message: string, options?: { type?: string; code?: string; status?: number }) {
    super(message);
    this.name = 'ApiError';
    this.type = options?.type;
    this.code = options?.code;
    this.status = options?.status;
  }
}

// Generic function to process streaming responses
export async function* processStreamingResponse(stream: ReadableStream): AsyncGenerator<string, void, unknown> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      buffer += decoder.decode(value, { stream: true });
      
      // Process complete events from the buffer
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';
      
      for (const line of lines) {
        if (line.startsWith('data: ') && line !== 'data: [DONE]') {
          const data = line.substring(6);
          try {
            const parsed = JSON.parse(data);
            if (parsed.choices && parsed.choices[0]?.delta?.content) {
              yield parsed.choices[0].delta.content;
            }
          } catch (e) {
            console.error('Error parsing stream data:', e);
          }
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}

// Utility function to estimate token count
export function estimateTokenCount(text: string): number {
  // Rough estimate: ~4 chars per token
  return Math.ceil(text.length / 4);
}
