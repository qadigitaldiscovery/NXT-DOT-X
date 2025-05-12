
import { 
  SocialMediaAccount, 
  SocialMediaPost, 
  Campaign, 
  AudienceSegment, 
  ContentTemplate 
} from './types';

export const mockSocialAccounts: SocialMediaAccount[] = [
  {
    id: '1',
    platform: 'twitter',
    username: 'companybrand',
    profileUrl: 'https://twitter.com/companybrand',
    avatarUrl: 'https://via.placeholder.com/50',
    isConnected: true,
    lastSyncedAt: new Date().toISOString(),
    metrics: {
      followers: 15420,
      engagementRate: 2.3
    }
  },
  {
    id: '2',
    platform: 'instagram',
    username: 'company.brand',
    profileUrl: 'https://instagram.com/company.brand',
    avatarUrl: 'https://via.placeholder.com/50',
    isConnected: true,
    lastSyncedAt: new Date().toISOString(),
    metrics: {
      followers: 24680,
      engagementRate: 3.8
    }
  },
  {
    id: '3',
    platform: 'facebook',
    username: 'CompanyBrand',
    profileUrl: 'https://facebook.com/CompanyBrand',
    avatarUrl: 'https://via.placeholder.com/50',
    isConnected: true,
    lastSyncedAt: new Date().toISOString(),
    metrics: {
      followers: 35750,
      engagementRate: 1.7
    }
  },
  {
    id: '4',
    platform: 'linkedin',
    username: 'company-brand',
    profileUrl: 'https://linkedin.com/company/company-brand',
    avatarUrl: 'https://via.placeholder.com/50',
    isConnected: true,
    lastSyncedAt: new Date().toISOString(),
    metrics: {
      followers: 8920,
      engagementRate: 1.2
    }
  },
  {
    id: '5',
    platform: 'tiktok',
    username: 'companybrand',
    profileUrl: 'https://tiktok.com/@companybrand',
    avatarUrl: 'https://via.placeholder.com/50',
    isConnected: false,
    metrics: {
      followers: 0
    }
  }
];

export const mockPosts: SocialMediaPost[] = [
  {
    id: '1',
    platform: 'twitter',
    accountId: '1',
    content: {
      text: 'Exciting news coming your way! Stay tuned for our big product announcement this week. #innovation #product',
      mediaUrls: ['https://via.placeholder.com/500x300'],
      link: 'https://example.com/announcement'
    },
    status: 'scheduled',
    scheduledFor: new Date(Date.now() + 86400000).toISOString(), // tomorrow
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    platform: 'instagram',
    accountId: '2',
    content: {
      text: 'Behind the scenes at our photoshoot today! 📸 #BrandLife #BehindTheScenes',
      mediaUrls: ['https://via.placeholder.com/1080x1080', 'https://via.placeholder.com/1080x1080']
    },
    status: 'published',
    publishedAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    metrics: {
      likes: 723,
      comments: 45,
      shares: 12,
      impressions: 5280,
      engagementRate: 4.2
    },
    createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    updatedAt: new Date(Date.now() - 172800000).toISOString() // 2 days ago
  },
  {
    id: '3',
    platform: 'linkedin',
    accountId: '4',
    content: {
      text: 'We're proud to announce our new partnership with IndustryLeader Inc. Together we'll be working on sustainable solutions for the future.',
      link: 'https://example.com/partnership'
    },
    status: 'draft',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '4',
    platform: 'facebook',
    accountId: '3',
    content: {
      text: 'Friday fun at the office! Our team building activity was a great success. Check out these moments!',
      mediaUrls: ['https://via.placeholder.com/1200x630', 'https://via.placeholder.com/1200x630', 'https://via.placeholder.com/1200x630']
    },
    status: 'published',
    publishedAt: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
    metrics: {
      likes: 187,
      comments: 32,
      shares: 8,
      impressions: 4120,
      engagementRate: 3.1
    },
    createdAt: new Date(Date.now() - 518400000).toISOString(), // 6 days ago
    updatedAt: new Date(Date.now() - 432000000).toISOString() // 5 days ago
  }
];

export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Summer Product Launch',
    description: 'Campaign for the launch of our new summer collection',
    status: 'active',
    startDate: new Date(Date.now() - 604800000).toISOString(), // 1 week ago
    endDate: new Date(Date.now() + 1209600000).toISOString(), // 2 weeks from now
    budget: 5000,
    posts: [mockPosts[0], mockPosts[1]],
    metrics: {
      totalReach: 45600,
      totalImpressions: 62800,
      totalEngagements: 2340,
      engagementRate: 3.7,
      clicks: 890,
      conversions: 78,
      roi: 1.8
    },
    createdAt: new Date(Date.now() - 1209600000).toISOString(), // 2 weeks ago
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Brand Awareness Q3',
    description: 'Ongoing campaign to increase brand visibility and engagement',
    status: 'draft',
    startDate: new Date(Date.now() + 604800000).toISOString(), // 1 week from now
    budget: 3500,
    posts: [mockPosts[2]],
    createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Customer Testimonials',
    description: 'Showcasing customer success stories and testimonials',
    status: 'completed',
    startDate: new Date(Date.now() - 2592000000).toISOString(), // 30 days ago
    endDate: new Date(Date.now() - 604800000).toISOString(), // 1 week ago
    budget: 2500,
    posts: [mockPosts[3]],
    metrics: {
      totalReach: 28400,
      totalImpressions: 42600,
      totalEngagements: 1860,
      engagementRate: 4.4,
      clicks: 720,
      conversions: 64,
      roi: 2.2
    },
    createdAt: new Date(Date.now() - 3196800000).toISOString(), // 37 days ago
    updatedAt: new Date(Date.now() - 604800000).toISOString() // 1 week ago
  }
];

export const mockAudienceSegments: AudienceSegment[] = [
  {
    id: '1',
    name: 'Young Professionals',
    description: 'Urban professionals aged 25-34 interested in technology and innovation',
    criteria: {
      demographics: {
        ageRange: [25, 34],
        locations: ['New York', 'San Francisco', 'Chicago', 'Boston'],
        genders: ['all']
      },
      interests: ['technology', 'innovation', 'career development', 'startups'],
      behaviors: ['early adopters', 'high engagement']
    },
    estimatedSize: 42500,
    createdAt: new Date(Date.now() - 2592000000).toISOString(), // 30 days ago
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Suburban Parents',
    description: 'Parents aged 30-45 living in suburban areas interested in family products',
    criteria: {
      demographics: {
        ageRange: [30, 45],
        locations: ['Suburban Areas'],
        genders: ['all']
      },
      interests: ['parenting', 'family activities', 'education', 'home improvement'],
      behaviors: ['value shoppers', 'family-focused']
    },
    estimatedSize: 38700,
    createdAt: new Date(Date.now() - 1209600000).toISOString(), // 14 days ago
    updatedAt: new Date().toISOString()
  }
];

export const mockContentTemplates: ContentTemplate[] = [
  {
    id: '1',
    name: 'Product Announcement',
    description: 'Template for new product announcements',
    platform: 'twitter',
    contentType: 'post',
    template: 'Exciting news! We just launched [Product Name]. [Key Feature] that helps you [Benefit]. Check it out: [Link] #[Industry] #[ProductType]',
    previewImageUrl: 'https://via.placeholder.com/500x300',
    createdAt: new Date(Date.now() - 1209600000).toISOString(), // 14 days ago
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Instagram Product Showcase',
    description: 'Carousel template for showcasing product features',
    platform: 'instagram',
    contentType: 'post',
    template: '✨ [Product Name] is here! ✨\n\nSwipe to see why it's a game-changer:\n1. [Feature One]\n2. [Feature Two]\n3. [Feature Three]\n\nAvailable now at the link in bio! #[Brand] #[Industry]',
    previewImageUrl: 'https://via.placeholder.com/1080x1080',
    createdAt: new Date(Date.now() - 864000000).toISOString(), // 10 days ago
    updatedAt: new Date().toISOString()
  }
];
