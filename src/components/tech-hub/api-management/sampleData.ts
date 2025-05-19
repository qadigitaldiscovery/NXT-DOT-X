
import { ApiProvider, ApiEndpoint } from './types';

export const apiProviders: ApiProvider[] = [
  {
    id: 'openai',
    name: 'OpenAI',
    description: 'OpenAI API for GPT models',
    status: 'unconfigured',
    logo: '/images/openai-logo.svg'
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    description: 'Anthropic API for Claude models',
    status: 'unconfigured',
    logo: '/images/anthropic-logo.svg'
  },
  {
    id: 'mistral',
    name: 'Mistral AI',
    description: 'Mistral AI API for advanced models',
    status: 'unconfigured',
    logo: '/images/mistral-logo.svg'
  },
  {
    id: 'requesty',
    name: 'Requesty',
    description: 'Requesty API for custom models',
    status: 'unconfigured',
    logo: '/images/requesty-logo.svg'
  }
];

// Create sample endpoints with the correct type
export const sampleEndpoints: ApiEndpoint[] = [
  {
    id: 'endpoint-1',
    name: 'Primary Chat Endpoint',
    url: 'https://api.openai.com/v1/chat/completions',
    apiKey: 'sk-.....',
    method: 'POST',
    status: 'active',
    lastUsed: '2025-05-01T08:30:00Z',
  },
  {
    id: 'endpoint-2',
    name: 'Embeddings API',
    url: 'https://api.openai.com/v1/embeddings',
    apiKey: 'sk-.....',
    method: 'POST',
    status: 'active',
    lastUsed: '2025-05-05T14:22:00Z',
  },
  {
    id: 'endpoint-3',
    name: 'Custom Endpoint',
    url: 'https://api.yourcompany.com/ai/process',
    apiKey: 'api-key-.....',
    method: 'POST',
    status: 'inactive',
    lastUsed: '2025-04-28T11:15:00Z',
  }
];

// Function to simulate API key verification with a proper boolean return
export const verifyApiKey = (apiKey: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simple check to validate non-empty strings - ensure it returns a boolean
      resolve(Boolean(apiKey && apiKey.length > 0));
    }, 1000);
  });
};
