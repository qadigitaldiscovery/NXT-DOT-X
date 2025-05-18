
import { LucideIcon } from 'lucide-react';

export interface ApiEndpoint {
  id: string;
  name: string;
  url: string;
  apiKey: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  status: 'active' | 'inactive';
  lastUsed: string;
}

export interface EndpointFormValues {
  name: string;
  url: string;
  apiKey: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  status: 'active' | 'inactive';
}
