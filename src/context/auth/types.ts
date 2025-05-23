
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
