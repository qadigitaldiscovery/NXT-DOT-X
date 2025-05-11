
import { callOpenAI, processStream } from '@/utils/api-clients/openai/client';
import { OpenAIResponse, ChatCompletionResponse } from '@/utils/api-clients/openai/types';

// Re-export types and functions
export type { OpenAIResponse, ChatCompletionResponse };
export { callOpenAI, processStream };

// Hook for easily using OpenAI in components
export const useOpenAI = () => {
  return {
    callAPI: callOpenAI,
    processStream
  };
};
