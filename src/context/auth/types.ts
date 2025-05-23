
import { User, Session } from '@supabase/supabase-js';

export interface ProfileData {
  id: string;
  username: string;
  email: string | null;
  role: string;
  permissions: string[];
  created_at?: string;
  updated_at?: string;
}

export interface AuthUser {
  id: string;
  email: string | null;
  username: string;
  role: string;
  permissions: string[];
  created_at?: string;
  provider?: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  session: Session | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  hasPermission: (permission: string) => boolean;
}
