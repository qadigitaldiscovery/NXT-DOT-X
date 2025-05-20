
// Types for WooCommerce integration

export interface WooCommerceConfig {
  id?: string;
  integration_type?: string;
  url: string;
  consumer_key: string;
  consumer_secret: string;
}

export type ConnectionStatus = 'idle' | 'success' | 'error';
