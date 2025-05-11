
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';
import { 
  CallOptions, 
  OpenAIResponse, 
  OpenAIError, 
  RateLimitError, 
  InvalidRequestError, 
  NetworkError, 
  OpenAIErrorResponse 
} from './types';

// Get API key from storage or database
export const getApiKey = async (): Promise<{key: string | null, config: any | null}> => {
  // Try to get from localStorage first as it's simpler
  const localKey = localStorage.getItem('openai-api-key');
  const localConfig = localStorage.getItem('openai-additional-config');
  
  if (localKey) {
    let config = null;
    try {
      if (localConfig) {
        config = JSON.parse(localConfig);
      }
    } catch (e) {
      console.error("Error parsing config from localStorage:", e);
    }
    
    return { key: localKey, config };
  }
  
  // If no key in localStorage, try database if user is logged in
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.user) {
      // First try with config column
      const { data, error } = await supabase
        .from('api_provider_settings')
        .select('api_key, config')
        .eq('provider_name', 'openai')
        .eq('user_id', session.user.id)
        .maybeSingle();
        
      if (error) {
        // If error mentions missing config column, try simpler query
        if (error.message?.includes("column 'config' does not exist")) {
          const { data: simpleData, error: simpleError } = await supabase
            .from('api_provider_settings')
            .select('api_key')
            .eq('provider_name', 'openai')
            .eq('user_id', session.user.id)
            .maybeSingle();
            
          if (!simpleError && simpleData?.api_key) {
            return { 
              key: simpleData.api_key, 
              config: null
            };
          } else if (simpleError) {
            console.error("Error fetching API key with simple query:", simpleError);
          }
        } else {
          console.error("Error fetching API key:", error);
        }
      } else if (data?.api_key) {
        return { 
          key: data.api_key, 
          config: data.config
        };
      }
    }
  } catch (err) {
    console.error("Error fetching API key from database:", err);
  }
  
  return { key: null, config: null };
};

// Main function to call OpenAI API
export async function callOpenAI<T extends OpenAIResponse>({ 
  endpoint, 
  payload, 
  apiKey,
  signal 
}: CallOptions): Promise<T> {
  // Use provided apiKey or fetch from storage
  const { key, config } = apiKey ? { key: apiKey, config: null } : await getApiKey();
  
  if (!key) {
    throw new Error("No API key available. Please add your OpenAI API key in the settings.");
  }
  
  // Apply any additional config parameters if available
  if (config && !apiKey) {
    // Merge the saved config with the provided payload
    if (typeof config === 'object') {
      // Apply temperature if it exists
      if (config.temperature_default !== undefined && payload.temperature === undefined) {
        payload.temperature = config.temperature_default;
      }
      
      // Apply max_tokens if it exists
      if (config.max_tokens_default !== undefined && payload.max_tokens === undefined) {
        payload.max_tokens = config.max_tokens_default;
      }
      
      // Apply frequency_penalty if it exists
      if (config.frequency_penalty_default !== undefined && payload.frequency_penalty === undefined) {
        payload.frequency_penalty = config.frequency_penalty_default;
      }
      
      // Apply presence_penalty if it exists
      if (config.presence_penalty_default !== undefined && payload.presence_penalty === undefined) {
        payload.presence_penalty = config.presence_penalty_default;
      }
    }
  }
  
  // First try to use our secure proxy if available
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session) {
      // Call via the edge function for better security
      const { data, error } = await supabase.functions.invoke('api-proxy', {
        body: {
          provider: 'openai',
          endpoint: endpoint === 'chat' ? 'chat/completions' : endpoint,
          payload,
          config
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
  
  // Direct API call as fallback
  const baseUrl = 'https://api.openai.com/v1';
  const url = `${baseUrl}/${endpoint === 'chat' ? 'chat/completions' : endpoint}`;
  
  // Add organization if configured
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${key}`,
    'User-Agent': 'lovable.dev-fe',
    'X-Request-Timestamp': new Date().toISOString()
  };
  
  if (config?.organization_id) {
    headers['OpenAI-Organization'] = config.organization_id;
  }
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
      signal
    });

    // Handle non-2xx responses
    if (!response.ok) {
      const errorData = await response.json() as OpenAIErrorResponse;
      
      // Map to specific error types
      if (errorData.error.type === 'insufficient_quota' || 
          errorData.error.code === 'rate_limit_exceeded') {
        throw new RateLimitError(errorData.error);
      }
      
      if (errorData.error.type === 'invalid_request_error') {
        throw new InvalidRequestError(errorData.error);
      }
      
      throw new OpenAIError(errorData.error);
    }

    // Handle streaming response
    if (endpoint === 'chat' && payload.stream === true) {
      // Return the readable stream for processing by the caller
      return response.body as unknown as T;
    }

    // Regular JSON response
    return await response.json() as T;
  } catch (error) {
    // Re-throw OpenAI specific errors
    if (error instanceof OpenAIError || 
        error instanceof RateLimitError || 
        error instanceof InvalidRequestError) {
      throw error;
    }
    
    // Handle abort errors
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw error;
    }
    
    // Handle network errors
    throw new NetworkError(error instanceof Error ? error.message : 'Unknown network error');
  }
}

// Helper function to process streaming responses
export async function* processStream(stream: ReadableStream) {
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

// Utility function to estimate cost based on model and token count
export function estimateCost(model: string, promptTokens: number, completionTokens = 0): number {
  const rates: Record<string, {input: number, output: number}> = {
    'gpt-4o': { input: 0.00005, output: 0.00015 },
    'gpt-4o-mini': { input: 0.00001, output: 0.00003 },
    'gpt-4-turbo': { input: 0.00001, output: 0.00003 },
    'gpt-4': { input: 0.00003, output: 0.00006 },
    'gpt-3.5-turbo': { input: 0.0000015, output: 0.000002 }
  };
  
  const defaultRate = { input: 0.00001, output: 0.00002 };
  const rate = rates[model] || defaultRate;
  
  return (promptTokens * rate.input) + (completionTokens * rate.output);
}
