
export interface OdooConfig {
  id?: string;
  name: string;
  integration_type: string;
  config: {
    url: string;
    db_name: string;
    username?: string;
    password?: string;
    api_key?: string;
    auth_method: 'credentials' | 'api_key';
  };
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
}

export interface SyncSetting {
  id?: string;
  integration_id: string;
  entity_type: string;
  is_enabled: boolean;
  sync_frequency: string;
  last_synced_at?: string;
}
