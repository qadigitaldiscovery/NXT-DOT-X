
// API Provider Types
export type ApiKeyStatus = 'active' | 'expired' | 'unconfigured' | 'invalid';

export interface ApiProviderConfig {
  name: string;
  description: string;
  apiKey: string | null;
  status: ApiKeyStatus;
  preferredModel?: string;
  models?: string[];
  endpoint?: string;
}

// API Endpoint Types
export interface ApiEndpoint {
  id: string;
  name: string;
  url: string;
  apiKey: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  status: 'active' | 'inactive' | 'error';
  lastUsed: string;
}

// Form types for endpoints
export interface EndpointFormValues {
  name: string;
  url: string;
  apiKey: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  status: 'active' | 'inactive' | 'error';
  description?: string;
}

// Zod schema for endpoint form validation
import { z } from 'zod';

export const endpointSchema = z.object({
  name: z.string().min(1, "Endpoint name is required"),
  url: z.string().url("Please enter a valid URL"),
  apiKey: z.string().min(1, "API key is required"),
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE']),
  status: z.enum(['active', 'inactive', 'error']).default('active'),
  description: z.string().optional()
});
