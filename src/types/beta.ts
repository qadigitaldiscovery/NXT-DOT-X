export interface BetaFeature {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  requiresApproval: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserBetaAccess {
  userId: string;
  featureId: string;
  granted: boolean;
  grantedAt: string;
  expiresAt?: string;
}

export type BetaAccessStatus = 'granted' | 'pending' | 'denied' | 'expired';

export interface BetaPermission {
  featureId: string;
  status: BetaAccessStatus;
}
