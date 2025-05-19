
import { z } from 'zod';

export interface ApiProvider {
  id: string;
  name: string;
  description: string;
  status: 'configured' | 'unconfigured' | 'error';
  logo?: string;
}

export interface ApiEndpoint {
  id: string;
  name: string;
  url: string;
  apiKey: string;
  method: 'POST' | 'GET' | 'PUT' | 'DELETE';
  status: 'active' | 'inactive';
  lastUsed: string;
  description?: string;
}

export interface EndpointFormValues {
  name: string;
  url: string;
  apiKey: string;
  method: 'POST' | 'GET' | 'PUT' | 'DELETE';
  status: 'active' | 'inactive';
  description?: string;
}

export const endpointSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  url: z.string().url({ message: "Must be a valid URL" }),
  apiKey: z.string().min(1, { message: "API Key is required" }),
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE']),
  status: z.enum(['active', 'inactive']).default('active'),
  description: z.string().optional()
});

export interface ApiKeyFormProps {
  providerName: string;
  apiKey?: string;
  isKeySet?: boolean;
  isVisible?: boolean;
  config?: Record<string, any>;
  onApiKeyChange?: (apiKey: string) => void;
  onVisibilityToggle?: () => void;
  onConfigUpdate?: (key: string, value: any) => void;
  apiKeyPlaceholder?: string;
  docsLink?: { text: string; url: string };
  onVerify?: (apiKey: string) => Promise<boolean>;
  preferredModelOptions?: { value: string; label: string }[];
  initialModel?: string;
  footerText?: string;
  additionalConfig?: Record<string, any>;
}
