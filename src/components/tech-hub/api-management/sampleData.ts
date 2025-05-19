
import { ApiProviderConfig, ApiKeyStatus, ApiEndpoint } from './types';

// Sample data for API providers
export const sampleApiProviders: Record<string, ApiProviderConfig> = {
  'openai': {
    name: 'OpenAI',
    description: 'Access GPT models and AI capabilities',
    apiKey: null,
    status: 'unconfigured',
    preferredModel: 'gpt-3.5-turbo',
    models: [
      'gpt-3.5-turbo',
      'gpt-4'
    ]
  },
  'requesty': {
    name: 'Requesty',
    description: 'Custom HTTP request integration',
    apiKey: null,
    status: 'unconfigured',
    endpoint: 'https://api.example.com/v1'
  }
};

// Sample API endpoints for the API endpoint list
export const sampleEndpoints: ApiEndpoint[] = [
  {
    id: '1',
    name: 'OpenAI Chat Completion',
    url: 'https://api.openai.com/v1/chat/completions',
    apiKey: 'sk-...XXXX',
    method: 'POST',
    status: 'active',
    lastUsed: '2025-05-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Requesty Router',
    url: 'https://router.requesty.ai/v1/chat/completions',
    apiKey: 'rty-...XXXX',
    method: 'POST',
    status: 'active',
    lastUsed: '2025-05-16T14:22:00Z'
  }
];

// Sample function to simulate API key verification
export const verifyApiKey = (provider: string, key: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simple validation - in reality would make API call
      resolve(key && key.length > 10);
    }, 1000);
  });
};
