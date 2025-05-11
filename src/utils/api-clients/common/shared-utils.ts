
/**
 * Common utilities shared across API clients
 */

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
  if ('key' in data && isValidString(data.key)) {
    apiKey = data.key;
    model = isValidString(data.model) ? data.model : defaultModel;
    config = isValidObject(data.config) ? data.config : {};
    return { apiKey, model, config };
  }
  
  // Then check if this is database format
  if ('api_key' in data && isValidString(data.api_key)) {
    apiKey = data.api_key;
    model = isValidString(data.preferred_model) ? data.preferred_model : defaultModel;
    config = isValidObject(data.config) ? data.config : {};
    return { apiKey, model, config };
  }
  
  // If it's neither format but has necessary data, try to parse it anyway
  if (isValidString(data.apiKey)) {
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
export async function* processStream(
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
