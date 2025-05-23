
export interface AuthUser {
  id: string;
  email: string;
  username: string;
  role: string;
  permissions: string[];
  created_at: string;
  provider: string;
  app_metadata?: Record<string, any>;
  user_metadata?: Record<string, any>;
  aud?: string;
}

export interface ProfileData {
  username?: string;
  role?: string;
  permissions?: string[];
}

export interface Session {
  user: AuthUser;
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  expires_at: number;
}

export interface User extends AuthUser {}

export interface AuthContextType {
  user: AuthUser | null;
  session: Session | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  hasPermission: (permission: string) => boolean;
  loading: boolean;
}
