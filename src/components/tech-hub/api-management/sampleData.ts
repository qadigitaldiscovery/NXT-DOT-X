
import { ApiEndpoint, ApiProvider, ApiKeyStatus } from './types';

// Sample API providers
export const sampleProviders: ApiProvider[] = [
  {
    id: 'openai',
    name: 'OpenAI',
    description: 'Access GPT models and other AI capabilities',
    status: 'active',
    icon: 'OpenAIIcon',
    docsUrl: 'https://platform.openai.com/docs/api-reference',
  },
  {
    id: 'requesty',
    name: 'Requesty API',
    description: 'Generate text, analyze data, and more',
    status: 'active',
    icon: 'RequestyIcon',
    docsUrl: 'https://docs.requesty.io',
  }
];

// Sample API endpoints
export const sampleEndpoints: ApiEndpoint[] = [
  {
    id: 'endpoint-1',
    name: 'GPT-4 Completion',
    url: 'https://api.openai.com/v1/chat/completions',
    method: 'POST',
    status: 'active',
    lastUsed: '2025-04-15T10:30:00Z',
    apiKey: 'sample-key-1'
  },
  {
    id: 'endpoint-2',
    name: 'Status Check',
    url: 'https://api.requesty.io/v1/status',
    method: 'GET',
    status: 'inactive',
    lastUsed: '2025-04-10T14:45:00Z',
    apiKey: 'sample-key-2'
  }
];

// Sample API key statuses
export const apiKeyStatuses: ApiKeyStatus[] = [
  {
    providerId: 'openai',
    status: 'valid',
    lastChecked: '2025-04-15T11:20:00Z',
    error: null
  },
  {
    providerId: 'requesty',
    status: 'invalid',
    lastChecked: '2025-04-14T09:15:00Z',
    error: 'API key expired'
  }
];
