
import React from 'react';
import { Share2 } from 'lucide-react';
import { ModuleCard } from '../ModuleCard';

const SocialMediaMarketing = () => {
  return (
    <ModuleCard
      title="Social Media Marketing"
      description="Manage social media campaigns and content distribution"
      icon={<Share2 size={24} />}
      features={[
        { name: 'Content Calendar', path: '/social/calendar' },
        { name: 'Campaign Management', path: '/social/campaigns' },
        { name: 'Analytics Dashboard', path: '/social/analytics' },
        { name: 'Account Management', path: '/social/accounts' }
      ]}
      onClick={() => window.location.href = '/social-media'}
    />
  );
};

export default SocialMediaMarketing;
