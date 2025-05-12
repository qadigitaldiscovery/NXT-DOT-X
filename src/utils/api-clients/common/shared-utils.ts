
/**
 * Common utilities shared across API clients
 */

import { supabase } from '@/integrations/supabase/client';

/**
 * Type for API errors
 */
export class ApiError extends Error {
  constructor(message: string, public details?: any) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Check if a value is a valid non-empty string
 */
export const isValidString = (value: unknown): value is string => {
  return typeof value === 'string' && value.trim() !== '';
};

/**
 * Check if a value is a valid object
 */
export const isValidObject = (value: unknown): value is Record<string, unknown> => {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
};

/**
 * Get API key from storage or database
 */
export const getApiKey = async (
  providerName: string,
  storageKey: string
): Promise<{ key: string | null; config: Record<string, any> | null }> => {
  // Try to get from localStorage first
  const localData = localStorage.getItem(storageKey);
  if (localData) {
    try {
      const parsed = JSON.parse(localData);
      if (parsed && parsed.key) {
        return {
          key: parsed.key,
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
      try {
        const hasConfigColumn = await columnExists('api_provider_settings', 'config');
        
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

        if (error) {
          console.error(`Error fetching ${providerName} API key:`, error);
          return { key: null, config: null };
        }

        if (data) {
          return {
            key: data.api_key,
            config: hasConfigColumn ? (data.config || null) : null
          };
        }
      } catch (error) {
        console.error(`Error checking columns:`, error);
      }
    }
  } catch (err) {
    console.error(`Error fetching ${providerName} API key:`, err);
  }

  return { key: null, config: null };
};

// Helper function to check if a column exists
const columnExists = async (table: string, column: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from(table)
      .select(column)
      .limit(1);
    
    if (error && error.message.includes(`column '${column}' does not exist`)) {
      return false;
    }
    
    return true;
  } catch (error) {
    console.error(`Error checking if column ${column} exists in ${table}:`, error);
    return false;
  }
};

/**
 * Try to use an edge function for API call
 */
export const tryUseEdgeFunction = async <T>(
  provider: string,
  endpoint: string,
  payload: any
): Promise<T | null> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return null; // Edge functions require authentication
    }

    // Check if the user has edge functions enabled - safely
    let useEdgeFunctions = true; // Default to true
    
    try {
      // Check if user_preferences table exists first
      const { error: tableError } = await supabase
        .from('user_preferences')
        .select('id')
        .limit(1);
      
      // If the table exists and no error, proceed to check preferences
      if (!tableError) {
        const { data: userPrefs } = await supabase
          .from('user_preferences')
          .select('use_edge_functions')
          .eq('user_id', session.user.id)
          .maybeSingle();

        // Only set to false if explicitly set to false
        if (userPrefs && userPrefs.use_edge_functions === false) {
          useEdgeFunctions = false;
        }
      }
    } catch (err) {
      console.log("Error checking user preferences, defaulting to use edge functions:", err);
    }
    
    // Skip if user has explicitly disabled edge functions
    if (!useEdgeFunctions) {
      return null;
    }

    // Try to call the edge function
    const { data, error } = await supabase.functions.invoke(`${provider}-proxy`, {
      body: {
        endpoint,
        payload
      }
    });

    if (error) {
      console.error(`Edge function error (${provider}):`, error);
      return null;
    }

    return data as T;
  } catch (err) {
    console.error(`Error using edge function for ${provider}:`, err);
    return null;
  }
};

/**
 * Parse response data from either localStorage or database format
 * to a consistent format for API clients
 */
export const parseProviderSettings = (
  data: Record<string, any> | null, 
  defaultModel: string
): {
  apiKey: string;
  model: string;
  config: Record<string, any>;
} | null => {
  if (!data) return null;
  
  // Handle null data safely with null checking
  let apiKey: string;
  let model: string = defaultModel;
  let config: Record<string, any> = {};
  
  // First, check if this is localStorage format
  if (data && 'key' in data && isValidString(data.key)) {
    apiKey = data.key;
    model = isValidString(data.model) ? data.model : defaultModel;
    config = isValidObject(data.config) ? data.config : {};
    return { apiKey, model, config };
  }
  
  // Then check if this is database format
  if (data && 'api_key' in data && isValidString(data.api_key)) {
    apiKey = data.api_key;
    model = isValidString(data.preferred_model) ? data.preferred_model : defaultModel;
    config = isValidObject(data.config) ? data.config : {};
    return { apiKey, model, config };
  }
  
  // If it's neither format but has necessary data, try to parse it anyway
  if (data && isValidString(data.apiKey)) {
    apiKey = data.apiKey;
    model = isValidString(data.model) ? data.model : 
            isValidString(data.preferredModel) ? data.preferredModel : defaultModel;
    config = isValidObject(data.config) ? data.config : 
             isValidObject(data.additionalConfig) ? data.additionalConfig : {};
    return { apiKey, model, config };
  }
  
  return null;
};

/**
 * Estimate token count for a text string
 */
export const estimateTokenCount = (text: string): number => {
  // Simple estimation: ~4 characters per token on average
  return Math.ceil(text.length / 4);
};

/**
 * Safely convert a ReadableStream to a string
 */
export async function streamToString(stream: ReadableStream<Uint8Array>): Promise<string> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let result = '';
  
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      result += decoder.decode(value, { stream: true });
    }
    
    // Final decode to handle any remaining bytes
    result += decoder.decode();
    return result;
  } catch (error) {
    console.error('Error converting stream to string:', error);
    throw error;
  }
}

/**
 * Process a streaming response from an API
 */
export async function* processStreamingResponse(
  stream: ReadableStream<Uint8Array>
): AsyncGenerator<string, void, unknown> {
  const reader = stream.getReader();
  const decoder = new TextDecoder("utf-8");
  
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split("\n");
      
      for (const line of lines) {
        if (line.trim() === "") continue;
        
        if (line.startsWith("data: ")) {
          const data = line.slice(6);
          if (data === "[DONE]") break;
          
          try {
            const parsed = JSON.parse(data);
            if (parsed.choices && parsed.choices.length > 0) {
              const content = parsed.choices[0]?.delta?.content ||
                             parsed.choices[0]?.message?.content || "";
              if (content) yield content;
            }
          } catch (error) {
            console.warn("Error parsing SSE data:", error);
            // Still yield the raw data in case it's useful
            yield data;
          }
        }
      }
    }
  } catch (error) {
    console.error("Error processing stream:", error);
    throw error;
  } finally {
    reader.releaseLock();
  }
}
