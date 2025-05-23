
import React from 'react';
import { MessageSquare } from 'lucide-react';
import { ModuleCard } from '../ModuleCard';
import { useNavigate } from 'react-router-dom';

const Communications = () => {
  const navigate = useNavigate();

  return (
    <ModuleCard
      title="Communications Hub"
      description="Centralized communication and messaging platform"
      icon={<MessageSquare size={24} />}
      features={[
        { name: 'Email Management', path: '/communications/email' },
        { name: 'SMS Gateway', path: '/communications/sms' },
        { name: 'Chat System', path: '/communications/chat' },
        { name: 'Notifications', path: '/communications/notifications' }
      ]}
      onClick={() => navigate('/communications')}
      variant="default"
    />
  );
};

export default Communications;
