
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
}
