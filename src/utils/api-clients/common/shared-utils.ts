
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Type for API errors
export class ApiError extends Error {
  code?: string;
  status?: number;
  type?: string;

  constructor(message: string, details?: { code?: string; status?: number; type?: string }) {
    super(message);
    this.name = 'ApiError';
    if (details) {
      this.code = details.code;
      this.status = details.status;
      this.type = details.type;
    }
  }
}

// Estimate token count for text
export function estimateTokenCount(text: string): number {
  // Very rough approximation: 4 characters ≈ 1 token
  return Math.ceil(text.length / 4);
}

// Function to process streaming responses
export async function* processStreamingResponse(stream: ReadableStream<Uint8Array>): AsyncGenerator<string> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let partialLine = '';
  
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value, { stream: true });
      const lines = (partialLine + chunk).split('\n');
      partialLine = lines.pop() || '';
      
      for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine || trimmedLine === '[DONE]') continue;
        
        if (trimmedLine.startsWith('data: ')) {
          const jsonData = trimmedLine.slice(6);
          
          try {
            if (jsonData === '[DONE]') continue;
            
            const data = JSON.parse(jsonData);
            
            // Handle chat completion
            if (data.choices && data.choices[0]) {
              const choice = data.choices[0];
              if (choice.delta && choice.delta.content) {
                yield choice.delta.content;
              }
            }
          } catch (err) {
            console.error('Error parsing JSON from stream:', err, jsonData);
          }
        }
      }
    }
  } catch (error) {
    console.error('Error reading from stream:', error);
    throw error;
  } finally {
    try {
      await reader.cancel();
    } catch (error) {
      console.error('Error canceling reader:', error);
    }
  }
}

// Function to get API key from storage
export async function getApiKey(
  providerName: string, 
  localStorageKey: string
): Promise<{key: string | null; model: string | null; config: any | null}> {
  try {
    // Check local storage first
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
      } catch (e) {
        console.error('Error parsing local storage:', e);
      }
    }
    
    // Try database
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return { key: null, model: null, config: null };
    }
    
    // Check if config column exists
    try {
      const { data, error } = await supabase
        .from('api_provider_settings')
        .select('api_key, preferred_model, config')
        .eq('provider_name', providerName)
        .eq('user_id', session.user.id)
        .maybeSingle();
      
      if (error) {
        // If error relates to config column not existing, try without it
        if (error.message && error.message.includes('config')) {
          const { data: dataNoConfig, error: errorNoConfig } = await supabase
            .from('api_provider_settings')
            .select('api_key, preferred_model')
            .eq('provider_name', providerName)
            .eq('user_id', session.user.id)
            .maybeSingle();
            
          if (errorNoConfig) {
            console.error('Error getting API key from database:', errorNoConfig);
            return { key: null, model: null, config: null };
          }
          
          if (!dataNoConfig) {
            return { key: null, model: null, config: null };
          }
          
          // Safe access of properties with null checks
          return { 
            key: dataNoConfig.api_key ?? null, 
            model: dataNoConfig.preferred_model ?? null, 
            config: null 
          };
        }
        
        console.error('Error getting API key from database:', error);
        return { key: null, model: null, config: null };
      }
      
      if (!data) {
        return { key: null, model: null, config: null };
      }
      
      // Safe access with null checks
      return { 
        key: data.api_key ?? null, 
        model: data.preferred_model ?? null, 
        config: data.config ?? null 
      };
    } catch (error) {
      console.error('Exception getting API key from database:', error);
      return { key: null, model: null, config: null };
    }
  } catch (e) {
    console.error('Error in getApiKey:', e);
    return { key: null, model: null, config: null };
  }
}

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
