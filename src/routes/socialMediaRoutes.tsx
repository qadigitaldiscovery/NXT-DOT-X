
import React from "react";
import { Route } from "react-router-dom";
import { PlatformLayout } from '@/components/layouts/PlatformLayout';
import SocialMediaDashboard from "@/pages/social-media/Dashboard";
import SocialMediaAccounts from "@/pages/social-media/Accounts";
import SocialMediaCalendar from "@/pages/social-media/Calendar";
import SocialMediaEngagement from "@/pages/social-media/Engagement";
import SocialMediaSettings from "@/pages/social-media/Settings";
import { NavCategory } from '@/components/layout/sidebar/types';
import { MessageSquare, BarChart3, Calendar, Settings, Users } from 'lucide-react';

const socialMediaNavCategories: NavCategory[] = [
  {
    name: "Social Media",
    label: "SOCIAL MEDIA",
    items: [
      { label: 'Dashboard', icon: BarChart3, path: '/social-media' },
      { label: 'Accounts', icon: Users, path: '/social-media/accounts' },
      { label: 'Post Calendar', icon: Calendar, path: '/social-media/calendar' },
      { label: 'Engagement', icon: MessageSquare, path: '/social-media/engagement' },
      { label: 'Settings', icon: Settings, path: '/social-media/settings' }
    ]
  }
];

export const SocialMediaRoutes = () => {
  return [
    <Route key="social-media-index" path="/social-media">
      <Route index element={
        <PlatformLayout
          moduleTitle="Social Media Marketing"
          navCategories={socialMediaNavCategories}
        >
          <SocialMediaDashboard />
        </PlatformLayout>
      } />
      <Route path="accounts" element={
        <PlatformLayout
          moduleTitle="Social Media Accounts"
          navCategories={socialMediaNavCategories}
        >
          <SocialMediaAccounts />
        </PlatformLayout>
      } />
      <Route path="calendar" element={
        <PlatformLayout
          moduleTitle="Social Media Calendar"
          navCategories={socialMediaNavCategories}
        >
          <SocialMediaCalendar />
        </PlatformLayout>
      } />
      <Route path="engagement" element={
        <PlatformLayout
          moduleTitle="Social Media Engagement"
          navCategories={socialMediaNavCategories}
        >
          <SocialMediaEngagement />
        </PlatformLayout>
      } />
      <Route path="settings" element={
        <PlatformLayout
          moduleTitle="Social Media Settings"
          navCategories={socialMediaNavCategories}
        >
          <SocialMediaSettings />
        </PlatformLayout>
      } />
    </Route>
  ];
};
