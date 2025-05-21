
import React from "react";
import { Route } from "react-router-dom";
import { PlatformLayout } from "@/components/layouts/PlatformLayout";
import Dashboard from "@/pages/social-media/Dashboard";
import Accounts from "@/pages/social-media/Accounts";
import Calendar from "@/pages/social-media/Calendar";
import Engagement from "@/pages/social-media/Engagement";
import Settings from "@/pages/social-media/Settings";
import NotFound from "@/pages/NotFound";

export const SocialMediaRoutes = () => {
  return [
    <Route 
      key="social-media-dashboard"
      path="/social-media" 
      element={
        <PlatformLayout moduleTitle="Social Media Dashboard" useGlobalNavigation={true}>
          <Dashboard />
        </PlatformLayout>
      } 
    />,
    <Route 
      key="social-media-accounts"
      path="/social-media/accounts" 
      element={
        <PlatformLayout moduleTitle="Social Media Accounts" useGlobalNavigation={true}>
          <Accounts />
        </PlatformLayout>
      } 
    />,
    <Route 
      key="social-media-calendar"
      path="/social-media/calendar" 
      element={
        <PlatformLayout moduleTitle="Social Media Calendar" useGlobalNavigation={true}>
          <Calendar />
        </PlatformLayout>
      } 
    />,
    <Route 
      key="social-media-engagement"
      path="/social-media/engagement" 
      element={
        <PlatformLayout moduleTitle="Social Media Engagement" useGlobalNavigation={true}>
          <Engagement />
        </PlatformLayout>
      } 
    />,
    <Route 
      key="social-media-settings"
      path="/social-media/settings" 
      element={
        <PlatformLayout moduleTitle="Social Media Settings" useGlobalNavigation={true}>
          <Settings />
        </PlatformLayout>
      } 
    />,
    <Route 
      key="social-media-not-found"
      path="/social-media/*" 
      element={
        <PlatformLayout moduleTitle="Page Not Found" useGlobalNavigation={true}>
          <NotFound />
        </PlatformLayout>
      } 
    />
  ];
};
