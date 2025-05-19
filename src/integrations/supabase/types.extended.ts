import type { Database as BaseDatabase } from './types';

export interface Profile {
  id: string;
  email: string;
  role: string;
  name?: string;
}

export type Database = Omit<BaseDatabase, 'public'> & {
  public: Omit<BaseDatabase['public'], 'Tables'> & {
    Tables: BaseDatabase['public']['Tables'] & {
      profiles: {
        Row: Profile;
        Insert: Profile;
        Update: Partial<Profile>;
        Relationships: [];
      };
    };
  };
};

export type { Json } from './types';
