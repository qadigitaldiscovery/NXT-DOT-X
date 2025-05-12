
import { 
  SocialAccount, 
  SocialPlatform, 
  SocialPost, 
  SocialPostStatus, 
  SocialStats, 
  SocialStatsTimeframe
} from './types';

export const mockAccounts: SocialAccount[] = [
  {
    id: '1',
    platform: 'twitter',
    username: 'YourBrandTwitter',
    profileImageUrl: 'https://placehold.co/200x200?text=T',
    accountUrl: 'https://twitter.com/yourbrand',
    connected: true,
    lastSynced: new Date('2025-05-01T12:00:00'),
    stats: {
      followers: 12500,
      following: 1200,
      posts: 2340,
      engagement: 3.2
    }
  },
  {
    id: '2',
    platform: 'instagram',
    username: 'yourbrand_official',
    profileImageUrl: 'https://placehold.co/200x200?text=I',
    accountUrl: 'https://instagram.com/yourbrand_official',
    connected: true,
    lastSynced: new Date('2025-05-05T14:30:00'),
    stats: {
      followers: 45000,
      following: 800,
      posts: 750,
      engagement: 4.8
    }
  },
  {
    id: '3',
    platform: 'facebook',
    username: 'YourBrand',
    profileImageUrl: 'https://placehold.co/200x200?text=F',
    accountUrl: 'https://facebook.com/yourbrand',
    connected: true,
    lastSynced: new Date('2025-05-04T09:15:00'),
    stats: {
      followers: 28000,
      following: 0,
      posts: 1200,
      engagement: 2.1
    }
  },
  {
    id: '4',
    platform: 'linkedin',
    username: 'yourbrand-inc',
    profileImageUrl: 'https://placehold.co/200x200?text=L',
    accountUrl: 'https://linkedin.com/company/yourbrand-inc',
    connected: true,
    lastSynced: new Date('2025-05-03T16:45:00'),
    stats: {
      followers: 8200,
      following: 150,
      posts: 420,
      engagement: 5.3
    }
  },
  {
    id: '5',
    platform: 'tiktok',
    username: '@yourbrand',
    profileImageUrl: 'https://placehold.co/200x200?text=TT',
    accountUrl: 'https://tiktok.com/@yourbrand',
    connected: false,
    lastSynced: null,
    stats: {
      followers: 0,
      following: 0,
      posts: 0,
      engagement: 0
    }
  }
];

export const mockPosts: SocialPost[] = [
  {
    id: '1',
    platform: 'twitter',
    accountId: '1',
    content: 'Exciting news! Our new product line launches next week. Stay tuned for exclusive deals! #ProductLaunch #Deals',
    mediaUrls: ['https://placehold.co/600x400?text=Product+Preview'],
    scheduledFor: new Date('2025-05-15T10:00:00'),
    status: 'scheduled',
    stats: null
  },
  {
    id: '2',
    platform: 'instagram',
    accountId: '2',
    content: 'Behind the scenes look at our new collection. Which color is your favorite? 💙❤️💚',
    mediaUrls: [
      'https://placehold.co/600x600?text=Behind+Scenes+1',
      'https://placehold.co/600x600?text=Behind+Scenes+2'
    ],
    scheduledFor: new Date('2025-05-16T12:30:00'),
    status: 'scheduled',
    stats: null
  },
  {
    id: '3',
    platform: 'facebook',
    accountId: '3',
    content: "We're hiring! Join our dynamic team and be part of our growth story. Check out available positions at careers.yourbrand.com",
    mediaUrls: ['https://placehold.co/800x600?text=We+Are+Hiring'],
    scheduledFor: null,
    publishedAt: new Date('2025-05-01T09:00:00'),
    status: 'published',
    stats: {
      likes: 124,
      comments: 45,
      shares: 67
    }
  },
  {
    id: '4',
    platform: 'linkedin',
    accountId: '4',
    content: "Proud to announce we've been recognized as an industry leader in sustainability for the third consecutive year. Thanks to our dedicated team for making this possible!",
    mediaUrls: ['https://placehold.co/800x450?text=Award+Ceremony'],
    scheduledFor: null,
    publishedAt: new Date('2025-04-28T14:15:00'),
    status: 'published',
    stats: {
      likes: 312,
      comments: 28,
      shares: 54
    }
  },
  {
    id: '5',
    platform: 'twitter',
    accountId: '1',
    content: 'What features would you like to see in our app? Reply with your suggestions! #ProductFeedback',
    mediaUrls: [],
    scheduledFor: null,
    publishedAt: new Date('2025-05-03T15:45:00'),
    status: 'published',
    stats: {
      likes: 89,
      comments: 76,
      shares: 12
    }
  },
  {
    id: '6',
    platform: 'instagram',
    accountId: '2',
    content: 'Monday motivation from our CEO: "Success isn\'t about how much money you make, it\'s about the difference you make in people\'s lives." #MondayMotivation #Leadership',
    mediaUrls: ['https://placehold.co/600x600?text=CEO+Quote'],
    scheduledFor: null,
    status: 'draft',
    stats: null
  }
];

export const mockPerformanceByPlatform: Record<SocialPlatform, SocialStats> = {
  twitter: {
    followers: 12500,
    following: 1200,
    posts: 2340,
    engagement: 3.2
  },
  instagram: {
    followers: 45000,
    following: 800,
    posts: 750,
    engagement: 4.8
  },
  facebook: {
    followers: 28000,
    following: 0,
    posts: 1200,
    engagement: 2.1
  },
  linkedin: {
    followers: 8200,
    following: 150,
    posts: 420,
    engagement: 5.3
  },
  tiktok: {
    followers: 15000,
    following: 200,
    posts: 85,
    engagement: 7.9
  }
};

export const mockStatsByTimeframe: Record<SocialStatsTimeframe, {
  followers: number;
  engagement: number;
  posts: number;
}> = {
  '7d': {
    followers: 1250,
    engagement: 4.2,
    posts: 12
  },
  '30d': {
    followers: 5400,
    engagement: 3.8,
    posts: 45
  },
  '90d': {
    followers: 12800,
    engagement: 3.5,
    posts: 120
  },
  '12m': {
    followers: 48500,
    engagement: 3.2,
    posts: 480
  }
};

export const mockPostStatusCounts: Record<SocialPostStatus, number> = {
  published: 243,
  scheduled: 18,
  draft: 7,
  failed: 2
};

export const mockUpcomingPosts: SocialPost[] = mockPosts.filter(post => 
  post.status === 'scheduled' && post.scheduledFor && post.scheduledFor > new Date()
);

// Add this to fix the reference in AccountsOverview.tsx
export const mockSocialAccounts = mockAccounts;
