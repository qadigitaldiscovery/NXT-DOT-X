
export interface User {
  id: string;
  email: string;
  username?: string;
  role?: string;
  permissions?: string[];
  created_at: string;
  provider?: string;
  app_metadata: Record<string, any>;
  user_metadata: Record<string, any>;
  aud: string;
}

export interface Session {
  user: User;
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  expires_at: number;
}

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  hasPermission: (permission: string) => boolean;
  loading: boolean;
}

export interface AuthUser extends User {}

export interface ProfileData {
  id: string;
  email: string;
  username?: string;
  role?: string;
  permissions?: string[];
  created_at: string;
}
