
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
}

export interface EndpointFormValues {
  name: string;
  url: string;
  apiKey: string;
  method: 'POST' | 'GET' | 'PUT' | 'DELETE';
  status: 'active' | 'inactive';
}

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
