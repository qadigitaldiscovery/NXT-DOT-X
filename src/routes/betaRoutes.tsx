import React from 'react';
import { Route } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import BetaPermissionGuard from "@/components/beta/BetaPermissionGuard";
import { PlatformLayout } from "@/components/layouts/PlatformLayout";
import { NavCategory } from '@/components/layout/sidebar/types';
import { Home, Settings, Users, BarChart3, Award } from 'lucide-react';

// Beta Pages
import Beta1Dashboard from "@/pages/Beta1Dashboard";
import Beta1Settings from "@/pages/Beta1Settings";
import Beta2Dashboard from "@/pages/Beta2Dashboard";
import Beta2Analytics from "@/pages/Beta2Analytics";
import Beta2Members from "@/pages/Beta2Members";
import Beta2Rewards from "@/pages/Beta2Rewards";
import Beta2Settings from "@/pages/Beta2Settings";
import NotFound from "@/pages/NotFound";

// Navigation for Beta1
export const beta1NavCategories: NavCategory[] = [
  {
    name: "BETA 1",
    label: "Data Platform Beta",
    items: [
      { label: 'Dashboard', icon: Home, path: '/beta1' },
      { label: 'Settings', icon: Settings, path: '/beta1/settings' }
    ]
  }
];

// Navigation for Beta2
export const beta2NavCategories: NavCategory[] = [
  {
    name: "BETA 2",
    label: "Loyalty Platform Beta",
    items: [
      { label: 'Dashboard', icon: Home, path: '/beta2' },
      { label: 'Members', icon: Users, path: '/beta2/members' },
      { label: 'Rewards', icon: Award, path: '/beta2/rewards' },
      { label: 'Analytics', icon: BarChart3, path: '/beta2/analytics' },
      { label: 'Settings', icon: Settings, path: '/beta2/settings' }
    ]
  }
];

export const BetaRoutes = () => {
  return (
    <>
      {/* Beta1 Routes */}
      <Route path="/beta1">
        <Route index element={
          <ProtectedRoute>
            <BetaPermissionGuard betaModule="beta1">
              <PlatformLayout moduleTitle="Data Platform Beta" navCategories={beta1NavCategories}>
                <Beta1Dashboard />
              </PlatformLayout>
            </BetaPermissionGuard>
          </ProtectedRoute>
        } />
        
        <Route path="settings" element={
          <ProtectedRoute>
            <BetaPermissionGuard betaModule="beta1">
              <PlatformLayout moduleTitle="Beta 1 Settings" navCategories={beta1NavCategories}>
                <Beta1Settings />
              </PlatformLayout>
            </BetaPermissionGuard>
          </ProtectedRoute>
        } />

        {/* Catch-all for invalid Beta1 routes */}
        <Route path="*" element={
          <ProtectedRoute>
            <BetaPermissionGuard betaModule="beta1">
              <PlatformLayout moduleTitle="Not Found" navCategories={beta1NavCategories}>
                <NotFound />
              </PlatformLayout>
            </BetaPermissionGuard>
          </ProtectedRoute>
        } />
      </Route>

      {/* Beta2 Routes */}
      <Route path="/beta2">
        <Route index element={
          <ProtectedRoute>
            <BetaPermissionGuard betaModule="beta2">
              <PlatformLayout moduleTitle="Loyalty Platform Beta" navCategories={beta2NavCategories}>
                <Beta2Dashboard />
              </PlatformLayout>
            </BetaPermissionGuard>
          </ProtectedRoute>
        } />
        
        <Route path="members" element={
          <ProtectedRoute>
            <BetaPermissionGuard betaModule="beta2">
              <PlatformLayout moduleTitle="Beta 2 Members" navCategories={beta2NavCategories}>
                <Beta2Members />
              </PlatformLayout>
            </BetaPermissionGuard>
          </ProtectedRoute>
        } />
        
        <Route path="rewards" element={
          <ProtectedRoute>
            <BetaPermissionGuard betaModule="beta2">
              <PlatformLayout moduleTitle="Beta 2 Rewards" navCategories={beta2NavCategories}>
                <Beta2Rewards />
              </PlatformLayout>
            </BetaPermissionGuard>
          </ProtectedRoute>
        } />
        
        <Route path="analytics" element={
          <ProtectedRoute>
            <BetaPermissionGuard betaModule="beta2">
              <PlatformLayout moduleTitle="Beta 2 Analytics" navCategories={beta2NavCategories}>
                <Beta2Analytics />
              </PlatformLayout>
            </BetaPermissionGuard>
          </ProtectedRoute>
        } />
        
        <Route path="settings" element={
          <ProtectedRoute>
            <BetaPermissionGuard betaModule="beta2">
              <PlatformLayout moduleTitle="Beta 2 Settings" navCategories={beta2NavCategories}>
                <Beta2Settings />
              </PlatformLayout>
            </BetaPermissionGuard>
          </ProtectedRoute>
        } />

        {/* Catch-all for invalid Beta2 routes */}
        <Route path="*" element={
          <ProtectedRoute>
            <BetaPermissionGuard betaModule="beta2">
              <PlatformLayout moduleTitle="Not Found" navCategories={beta2NavCategories}>
                <NotFound />
              </PlatformLayout>
            </BetaPermissionGuard>
          </ProtectedRoute>
        } />
      </Route>
    </>
  );
};

export default BetaRoutes;
