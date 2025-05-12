
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
import { 
  tryUseEdgeFunction, 
  processStreamingResponse,
  estimateTokenCount,
  getApiKey,
  ApiError
} from '../common/shared-utils';

// Get API key from storage or database
export async function getOpenAIKey(): Promise<{key: string | null; model: string | null; config: any | null}> {
  return await getApiKey('openai', 'openai-api-key');
};

// Main function to call OpenAI API
export async function callOpenAI<T extends OpenAIResponse>({ 
  endpoint, 
  payload, 
  apiKey,
  signal 
}: CallOptions): Promise<T> {
  // Use provided apiKey or fetch from storage
  const result = apiKey ? 
    { key: apiKey, model: null, config: null } : 
    await getOpenAIKey();
  
  const key = result.key;
  const config = result.config;
  
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
  
  // Try to use our edge function first
  const edgeResponse = await tryUseEdgeFunction<T>(
    'openai', 
    endpoint === 'chat' ? 'chat/completions' : endpoint,
    payload
  );
  
  if (edgeResponse) {
    return edgeResponse;
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
  yield* processStreamingResponse(stream);
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
