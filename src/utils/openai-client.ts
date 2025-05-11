
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';

// Types for OpenAI API responses
export type OpenAIErrorResponse = {
  error: {
    message: string;
    type: string;
    param: string | null;
    code: string;
  };
};

export type ChatCompletionResponse = {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
};

export type EmbeddingsResponse = {
  object: string;
  data: Array<{
    object: string;
    embedding: number[];
    index: number;
  }>;
  model: string;
  usage: {
    prompt_tokens: number;
    total_tokens: number;
  };
};

export type ModerationResponse = {
  id: string;
  model: string;
  results: Array<{
    categories: Record<string, boolean>;
    category_scores: Record<string, number>;
    flagged: boolean;
  }>;
};

export type OpenAIResponse = ChatCompletionResponse | EmbeddingsResponse | ModerationResponse;

// OpenAI API error types
export class OpenAIError extends Error {
  type: string;
  param: string | null;
  code: string;
  
  constructor(error: OpenAIErrorResponse['error']) {
    super(error.message);
    this.name = 'OpenAIError';
    this.type = error.type;
    this.param = error.param;
    this.code = error.code;
  }
}

export class RateLimitError extends OpenAIError {
  constructor(error: OpenAIErrorResponse['error']) {
    super(error);
    this.name = 'RateLimitError';
  }
}

export class InvalidRequestError extends OpenAIError {
  constructor(error: OpenAIErrorResponse['error']) {
    super(error);
    this.name = 'InvalidRequestError';
  }
}

export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NetworkError';
  }
}

// Call options type
export type CallOptions = {
  endpoint: 'chat' | 'embeddings' | 'moderations';
  payload: any;
  apiKey?: string; 
  signal?: AbortSignal;
};

// Get API key from storage or database
const getApiKey = async (): Promise<string | null> => {
  // Try to get from database first if user is logged in
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session) {
      const { data, error } = await supabase
        .from('api_provider_settings')
        .select('api_key')
        .eq('provider_name', 'openai')
        .eq('user_id', session.user.id)
        .maybeSingle();
        
      if (!error && data?.api_key) {
        return data.api_key;
      }
    }
  } catch (err) {
    console.error("Error fetching API key from database:", err);
  }
  
  // Fallback to localStorage if no key in DB or user not logged in
  return localStorage.getItem('openai-api-key');
};

// Main function to call OpenAI API
export async function callOpenAI<T extends OpenAIResponse>({ 
  endpoint, 
  payload, 
  apiKey,
  signal 
}: CallOptions): Promise<T> {
  // Use provided apiKey or fetch from storage
  const key = apiKey || await getApiKey();
  
  if (!key) {
    throw new Error("No API key available. Please add your OpenAI API key in the settings.");
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
  
  // Direct API call as fallback
  const baseUrl = 'https://api.openai.com/v1';
  const url = `${baseUrl}/${endpoint === 'chat' ? 'chat/completions' : endpoint}`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`,
        'User-Agent': 'lovable.dev-fe',
        'X-Request-Timestamp': new Date().toISOString(),
      },
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
