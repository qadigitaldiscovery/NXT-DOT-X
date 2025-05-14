
/**
 * OpenAI Client interface defining available methods
 */
export interface OpenAIClient {
  createCompletion: (params: {
    model: string;
    prompt: string;
    max_tokens?: number;
    temperature?: number;
    top_p?: number;
    frequency_penalty?: number;
    presence_penalty?: number;
    stop?: string | string[];
  }) => Promise<any>;
  
  createChatCompletion: (params: {
    model: string;
    messages: Array<{
      role: 'system' | 'user' | 'assistant';
      content: string;
    }>;
    temperature?: number;
    top_p?: number;
    max_tokens?: number;
    stream?: boolean;
    frequency_penalty?: number;
    presence_penalty?: number;
    stop?: string | string[];
  }) => Promise<any>;
}

/**
 * OpenAI API configuration options
 */
export interface OpenAIConfig {
  apiKey: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}
