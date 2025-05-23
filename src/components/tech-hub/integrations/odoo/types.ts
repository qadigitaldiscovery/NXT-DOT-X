
export interface OdooConfig {
  id: string;
  name?: string;
  integration_type: string;
  config: {
    url: string;
    username: string;
    password?: string;
    api_key?: string;
    database: string; // Always required for compatibility
    db_name?: string; // Optional alias
    auth_method?: 'credentials' | 'api_key';
  };
  created_at: string;
  updated_at: string;
  is_active?: boolean;
}

export interface SyncSetting {
  id?: string;
  integration_id: string;
  entity_type: string;
  is_enabled: boolean;
  sync_frequency: string;
  last_synced_at?: string;
  created_at?: string;
  updated_at?: string;
}
