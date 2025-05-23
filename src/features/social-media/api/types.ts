
export interface SocialAccount {
  id: string;
  platform: SocialPlatform;
  username: string;
  profileImageUrl: string;
  accountUrl: string;
  connected: boolean;
  lastSynced: Date | null;
  stats: SocialStats;
}

export type SocialPlatform = 
  | 'twitter' 
  | 'facebook' 
  | 'instagram' 
  | 'linkedin' 
  | 'tiktok' 
  | 'pinterest'
  | 'youtube';

export interface SocialPost {
  id: string;
  platform: SocialPlatform;
  accountId: string;
  content: {
    text?: string;
    mediaUrls?: string[];
    link?: string;
  };
  scheduledFor?: Date | null;
  publishedAt?: Date | null;
  status: SocialPostStatus;
  stats: PostStats | null;
  createdAt?: string;
  updatedAt?: string;
}

export type SocialPostStatus = 'draft' | 'scheduled' | 'published' | 'failed';

export interface PostStats {
  likes?: number;
  comments?: number;
  shares?: number;
  impressions?: number;
  clicks?: number;
  engagementRate?: number;
}

export interface SocialStats {
  followers: number;
  following: number;
  posts: number;
  engagement: number;
}

export type SocialStatsTimeframe = '7d' | '30d' | '90d' | '12m';

export interface Campaign {
  id: string;
  name: string;
  description?: string;
  status: 'active' | 'draft' | 'completed' | 'paused';
  startDate: string;
  endDate?: string;
  budget?: number;
  targetAudience?: AudienceSegment;
  posts: SocialMediaPost[];
  metrics?: CampaignMetrics;
  createdAt: string;
  updatedAt: string;
}

// Consolidate SocialMediaAccount with SocialAccount
export type SocialMediaAccount = SocialAccount;

export type SocialMediaPlatform = SocialPlatform;

// Make SocialMediaPost consistent with SocialPost
export interface SocialMediaPost {
  id: string;
  platform: SocialMediaPlatform;
  accountId: string;
  content: {
    text?: string;
    mediaUrls?: string[];
    link?: string;
  };
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  scheduledFor?: Date | null;
  publishedAt?: Date | null;
  stats?: PostStats | null;
  createdAt: string;
  updatedAt: string;
}

// Remove redundant PostMetrics as it's the same as PostStats
export interface CampaignMetrics {
  totalReach: number;
  totalImpressions: number;
  totalEngagements: number;
  engagementRate: number;
  clicks?: number;
  conversions?: number;
  roi?: number;
}

export interface AudienceSegment {
  id: string;
  name: string;
  description?: string;
  criteria: {
    demographics?: {
      ageRange?: [number, number];
      locations?: string[];
      genders?: string[];
    };
    interests?: string[];
    behaviors?: string[];
  };
  estimatedSize?: number;
  createdAt: string;
  updatedAt: string;
}

export interface ContentTemplate {
  id: string;
  name: string;
  description?: string;
  platform: SocialMediaPlatform;
  contentType: 'post' | 'story' | 'ad' | 'video';
  template: string;
  previewImageUrl?: string;
  createdAt: string;
  updatedAt: string;
}
