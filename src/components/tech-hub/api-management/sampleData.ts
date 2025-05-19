
// Fix imports for ApiProvider and ApiKeyStatus types
import { ApiProviderConfig } from './types';

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

// Sample function to simulate API key verification
export const verifyApiKey = (provider: string, key: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simple validation - in reality would make API call
      resolve(key && key.length > 10);
    }, 1000);
  });
};
