
import React from 'react';
import { Users, Gift, BarChart3 } from 'lucide-react';
import { QuickNavCard } from './QuickNavCard';

export const QuickNavSection: React.FC = () => {
  const navItems = [
    {
      title: "Members",
      description: "Manage member accounts and view activity",
      icon: Users,
      path: "/beta2/members"
    },
    {
      title: "Rewards",
      description: "Manage and redeem loyalty rewards",
      icon: Gift,
      path: "/beta2/rewards"
    },
    {
      title: "Analytics",
      description: "View program performance analytics",
      icon: BarChart3,
      path: "/beta2/analytics"
    }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {navItems.map(item => (
        <QuickNavCard 
          key={item.title}
          title={item.title}
          description={item.description}
          icon={item.icon}
          path={item.path}
        />
      ))}
    </div>
  );
};
