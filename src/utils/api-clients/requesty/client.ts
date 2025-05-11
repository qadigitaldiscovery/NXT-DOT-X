
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';
import { RequestyMessage } from './types';
import { 
  getApiKey as getProviderApiKey, 
  tryUseEdgeFunction, 
  processStreamingResponse,
  ApiError
} from '../common/shared-utils';

// Get API key from storage or database
export const getApiKey = async (): Promise<{ key: string | null, model: string | null, config: any | null }> => {
  return await getProviderApiKey('requesty', 'requesty-api-key');
};

/**
 * Sends a request to the Requesty API
 */
export const sendRequestyMessage = async (
  messages: RequestyMessage[],
  model?: string
): Promise<string> => {
  try {
    // Get API key from database or local storage
    const { key: apiKey, model: preferredModel, config } = await getApiKey();
    
    if (!apiKey) {
      toast.error("Requesty API key not configured. Please add your API key in the settings.");
      throw new Error("API key not configured");
    }

    // Use specified model or fallback to preferred model
    const modelToUse = model || preferredModel || "openai/gpt-4o-mini";
    
    // Build the request payload
    const payload: any = {
      model: modelToUse,
      messages,
    };
    
    // Add configuration options if available
    if (config) {
      if (config.max_tokens_default) {
        payload.max_tokens = config.max_tokens_default;
      }
      
      if (config.temperature_default !== undefined) {
        payload.temperature = config.temperature_default;
      }
      
      if (config.streaming_default !== undefined) {
        payload.stream = config.streaming_default;
      }
      
      if (config.response_format) {
        payload.response_format = { type: config.response_format };
      }
    }
    
    // Try to use our edge function first
    const edgeResponse = await tryUseEdgeFunction<any>(
      'requesty',
      'chat/completions',
      payload
    );
    
    if (edgeResponse) {
      return edgeResponse.choices[0].message.content;
    }

    // Fallback to direct API call
    const response = await fetch("https://router.requesty.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new ApiError(
        errorData.error?.message || "Failed to get response from Requesty", 
        { 
          type: errorData.error?.type,
          code: errorData.error?.code,
          status: response.status
        }
      );
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error calling Requesty API:", error);
    toast.error("Failed to get a response from Requesty");
    throw error;
  }
};

/**
 * Stream messages from Requesty API
 */
export async function* streamRequestyMessage(
  messages: RequestyMessage[],
  model?: string
): AsyncGenerator<string, void, unknown> {
  try {
    // Get API key from database or local storage
    const { key: apiKey, model: preferredModel, config } = await getApiKey();
    
    if (!apiKey) {
      toast.error("Requesty API key not configured. Please add your API key in the settings.");
      throw new Error("API key not configured");
    }

    // Use specified model or fallback to preferred model
    const modelToUse = model || preferredModel || "openai/gpt-4o-mini";
    
    // Build the request payload
    const payload: any = {
      model: modelToUse,
      messages,
      stream: true,
    };
    
    // Add configuration options if available
    if (config) {
      if (config.max_tokens_default) {
        payload.max_tokens = config.max_tokens_default;
      }
      
      if (config.temperature_default !== undefined) {
        payload.temperature = config.temperature_default;
      }
      
      if (config.response_format) {
        payload.response_format = { type: config.response_format };
      }
    }

    const response = await fetch("https://router.requesty.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new ApiError(
        errorData.error?.message || "Failed to get response from Requesty",
        { 
          type: errorData.error?.type,
          code: errorData.error?.code,
          status: response.status
        }
      );
    }

    yield* processStreamingResponse(response.body!);
  } catch (error) {
    console.error("Error streaming from Requesty API:", error);
    toast.error("Failed to stream response from Requesty");
    throw error;
  }
}
