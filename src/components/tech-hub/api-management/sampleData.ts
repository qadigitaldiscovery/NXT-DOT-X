
import { ApiEndpoint } from './types';

export const sampleEndpoints: ApiEndpoint[] = [
  {
    id: '1',
    name: 'Product Data API',
    url: 'https://api.example.com/products',
    apiKey: 'sk_prod_*************',
    method: 'GET',
    status: 'active',
    lastUsed: '2025-05-07T14:32:11'
  },
  {
    id: '2',
    name: 'Order Processing',
    url: 'https://api.example.com/orders',
    apiKey: 'ord_api_*************',
    method: 'POST',
    status: 'active',
    lastUsed: '2025-05-08T09:15:22'
  },
  {
    id: '3',
    name: 'Legacy Inventory System',
    url: 'https://legacy.example.com/inventory',
    method: 'GET',
    status: 'error',
    lastUsed: '2025-05-01T10:45:30'
  },
  {
    id: '4',
    name: 'Customer Analytics',
    url: 'https://analytics.example.com/customers',
    apiKey: 'ana_key_*************',
    method: 'GET',
    status: 'inactive',
    lastUsed: '2025-04-28T16:20:00'
  }
];
