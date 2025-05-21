
export interface ApiEndpoint {
  id: string;
  name: string;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  apiKey?: string;
  status: 'active' | 'inactive';
  lastUsed: string;
  description?: string;
}

export type EndpointFormValues = {
  name: string;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  apiKey?: string;
  status: 'active' | 'inactive';
  description?: string;
}
