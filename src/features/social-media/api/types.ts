
export interface SocialMediaAccount {
  id: string;
  platform: SocialMediaPlatform;
  username: string;
  profileUrl: string;
  avatarUrl?: string;
  isConnected: boolean;
  lastSyncedAt?: string;
  metrics?: {
    followers: number;
    engagementRate?: number;
  };
}

export type SocialMediaPlatform = 
  | 'twitter' 
  | 'facebook' 
  | 'instagram' 
  | 'linkedin' 
  | 'tiktok' 
  | 'pinterest'
  | 'youtube';

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
  scheduledFor?: string;
  publishedAt?: string;
  metrics?: PostMetrics;
  createdAt: string;
  updatedAt: string;
}

export interface PostMetrics {
  likes?: number;
  comments?: number;
  shares?: number;
  impressions?: number;
  clicks?: number;
  engagementRate?: number;
}

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
