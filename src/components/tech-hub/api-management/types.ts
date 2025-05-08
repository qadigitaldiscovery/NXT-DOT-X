
export interface ApiEndpoint {
  id: string;
  name: string;
  url: string;
  apiKey?: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  status: 'active' | 'inactive' | 'error';
  lastUsed: string;
}

export type EndpointFormValues = {
  name: string;
  url: string;
  apiKey?: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  status: "active" | "inactive";
};
