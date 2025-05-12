
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';
import { 
  CallOptions, 
  RequestyResponse, 
  RequestyError,
  RequestyMessage,
  RequestyConfig
} from './types';
import { 
  tryUseEdgeFunction, 
  processStreamingResponse,
  estimateTokenCount,
  getApiKey,
  ApiError
} from '../common/shared-utils';

// Get API key from storage or database
export async function getRequestyKey(): Promise<{key: string | null; model: string | null; config: any | null}> {
  return await getApiKey('requesty', 'requesty-api-key');
};

// Main function to call Requesty API
export async function callRequesty<T extends RequestyResponse>({ 
  endpoint, 
  payload, 
  apiKey,
  signal 
}: CallOptions): Promise<T> {
  // Use provided apiKey or fetch from storage
  const result = apiKey ? 
    { key: apiKey, model: null, config: null } : 
    await getRequestyKey();
  
  const key = result.key;
  const config = result.config;
  
  if (!key) {
    console.error("No API key available");
    throw new Error("No API key available. Please add your Requesty API key in the settings.");
  }
  
  console.log("Making Requesty API call with valid key");
  
  // Apply any additional config parameters if available
  if (config && !apiKey && typeof config === 'object') {
    // Merge the saved config with the provided payload
    if (config.streaming_default !== undefined && payload.stream === undefined) {
      payload.stream = config.streaming_default;
    }
    
    if (config.max_tokens_default !== undefined && payload.max_tokens === undefined) {
      payload.max_tokens = config.max_tokens_default;
    }
    
    if (config.temperature_default !== undefined && payload.temperature === undefined) {
      payload.temperature = config.temperature_default;
    }
    
    if (config.response_format !== undefined && payload.response_format === undefined) {
      payload.response_format = config.response_format;
    }
  }
  
  // Try to use our edge function first
  try {
    const edgeResponse = await tryUseEdgeFunction<T>(
      'requesty', 
      endpoint,
      payload
    );
    
    if (edgeResponse) {
      console.log("Successfully used edge function for Requesty request");
      return edgeResponse;
    }
  } catch (err) {
    console.warn("Edge function attempt failed, using direct API:", err);
    // Continue to direct API call
  }
  
  // Direct API call as fallback
  console.log("Attempting direct Requesty API call");
  const baseUrl = 'https://router.requesty.ai/v1';
  const url = `${baseUrl}/${endpoint}`;
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${key}`,
    'User-Agent': 'lovable.dev-fe',
    'X-Request-Timestamp': new Date().toISOString()
  };
  
  try {
    console.log(`Sending request to ${url}`);
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
      signal
    });

    // Handle non-2xx responses
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Requesty API error:", errorData);
      throw new RequestyError(errorData.error?.message || 'Unknown error', errorData.error);
    }

    // Handle streaming response
    if (payload.stream === true) {
      // Return the readable stream for processing by the caller
      return response.body as unknown as T;
    }

    // Regular JSON response
    const data = await response.json();
    console.log("Requesty API response received successfully");
    return data as T;
  } catch (error) {
    console.error("Error in Requesty API call:", error);
    
    // Re-throw Requesty specific errors
    if (error instanceof RequestyError) {
      throw error;
    }
    
    // Handle abort errors
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw error;
    }
    
    // Handle network errors
    throw new ApiError(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Helper function to process streaming responses
export async function* processStream(stream: ReadableStream) {
  yield* processStreamingResponse(stream);
}

// Add the missing exported functions
export async function sendRequestyMessage(
  messages: RequestyMessage[] | RequestyMessage,
  model?: string
): Promise<string> {
  // Ensure messages is an array
  const messageArray = Array.isArray(messages) ? messages : [messages];
  
  try {
    const response = await callRequesty<RequestyResponse>({
      endpoint: 'chat/completions',
      payload: {
        model: model || 'openai/gpt-4o-mini', // Default model
        messages: messageArray,
        stream: false
      }
    });
    
    // Extract text response from the API result
    return response.choices[0].message?.content || '';
  } catch (error) {
    console.error('Error sending message to Requesty:', error);
    throw error;
  }
}

export async function* streamRequestyMessage(
  messages: RequestyMessage[] | RequestyMessage,
  model?: string
): AsyncGenerator<string> {
  // Ensure messages is an array
  const messageArray = Array.isArray(messages) ? messages : [messages];
  
  try {
    const stream = await callRequesty<ReadableStream>({
      endpoint: 'chat/completions',
      payload: {
        model: model || 'openai/gpt-4o-mini',
        messages: messageArray,
        stream: true
      }
    });
    
    // Process the stream and yield content chunks
    yield* processStream(stream);
  } catch (error) {
    console.error('Error streaming message from Requesty:', error);
    throw error;
  }
}

// Try to route a request through Requesty API
export async function routeAIRequest<T extends RequestyResponse>({
  model,
  messages,
  temperature,
  maxTokens,
  apiKey,
  signal
}: {
  model: string;
  messages: Array<{role: string; content: string}>;
  temperature?: number;
  maxTokens?: number;
  apiKey?: string;
  signal?: AbortSignal;
}): Promise<T> {
  const response = await callRequesty<T>({
    endpoint: 'chat/completions',
    payload: {
      model,
      messages,
      temperature,
      max_tokens: maxTokens,
      stream: false
    },
    apiKey,
    signal
  });
  
  return response;
}
