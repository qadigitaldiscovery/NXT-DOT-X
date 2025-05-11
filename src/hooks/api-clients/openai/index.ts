
import { callOpenAI, processStream } from '@/utils/api-clients/openai/client';
import { OpenAIResponse, ChatCompletionResponse } from '@/utils/api-clients/openai/types';
import { useOpenAIClient } from './use-openai-client';

// Re-export types and functions
export type { OpenAIResponse, ChatCompletionResponse };
export { callOpenAI, processStream, useOpenAIClient };

// Hook for easily using OpenAI in components
export const useOpenAI = useOpenAIClient;
