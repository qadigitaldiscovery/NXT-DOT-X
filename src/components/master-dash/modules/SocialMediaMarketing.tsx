
import React from 'react';
import { Share2 } from 'lucide-react';
import { ModuleCard } from '../ModuleCard';
import { useNavigate } from 'react-router-dom';

const SocialMediaMarketing = () => {
  const navigate = useNavigate();

  return (
    <ModuleCard
      title="Social Media Marketing"
      description="Manage social media campaigns and engagement"
      icon={<Share2 size={24} />}
      features={[
        { name: 'Campaign Management', path: '/social/campaigns' },
        { name: 'Content Calendar', path: '/social/calendar' },
        { name: 'Analytics Dashboard', path: '/social/analytics' },
        { name: 'Engagement Tools', path: '/social/engagement' }
      ]}
      onClick={() => navigate('/social-media')}
    />
  );
};

export default SocialMediaMarketing;
