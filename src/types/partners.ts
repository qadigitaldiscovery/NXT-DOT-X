// Enhanced Partner Type Definitions
export interface BasePartner {
  id: string;
  name: string;
  type: 'vendor' | 'supplier';
  status: 'active' | 'inactive' | 'pending';
  contactEmail: string;
  contactPhone: string;
  address: string;
  website?: string;
  description?: string;
  notes?: string;
  
  // Enhanced fields
  documents?: PartnerDocument[];
  performanceMetrics?: {
    overallRating: number;
    keyMetrics: Record<string, number>;
    historicalData: Array<{
      date: string;
      value: number;
    }>;
  };
  marketPosition?: {
    industryRank: number;
    marketSharePercentage: number;
    growthTrend: 'up' | 'down' | 'stable';
  };
  financialStatus?: {
    creditScore: number;
    lastEvaluation: string;
    riskFactors: string[];
  };
}

export interface Vendor extends BasePartner {
  type: 'vendor';
  contractDetails?: {
    terms: string;
    expiration: string;
    serviceLevelAgreements: string[];
  };
  isPreferredVendor?: boolean;
}

export interface Supplier extends BasePartner {
  type: 'supplier';
  pricingStructure?: {
    baseRates: string;
    discountTiers: Array<{
      minimumOrder: number;
      discountPercentage: number;
    }>;
  };
  qualityMetrics?: {
    defectRate: number;
    onTimeDeliveryPercentage: number;
  };
}

export type Partner = Vendor | Supplier;

export interface PartnerDocument {
  id: string;
  partnerId: string;
  name: string;
  type: 'contract' | 'invoice' | 'certificate' | 'other';
  url: string;
  uploadedAt: string;
  sizeInBytes: number;
  metadata?: {
    author?: string;
    expirationDate?: string;
    confidential?: boolean;
  };
  status?: 'active' | 'archived' | 'pending_review';
  accessLevel?: 'public' | 'internal' | 'restricted';
}
