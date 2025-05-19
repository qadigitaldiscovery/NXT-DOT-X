
// AI-related type definitions

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatCompletionOptions {
  systemPrompt?: string;
  temperature?: number;
  max_tokens?: number;
}

export interface AIClientInterface {
  sendMessage: (message: string, model?: string, options?: ChatCompletionOptions) => Promise<string>;
  createChatCompletion?: (messages: ChatMessage[], options?: ChatCompletionOptions) => Promise<string>;
  isLoading: boolean;
}
