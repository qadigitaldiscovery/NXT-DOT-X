import { Route } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
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
            <PlatformLayout moduleTitle="Data Platform Beta" navCategories={beta1NavCategories}>
              <Beta1Dashboard />
            </PlatformLayout>
          </ProtectedRoute>
        } />
        
        <Route path="settings" element={
          <ProtectedRoute>
            <PlatformLayout moduleTitle="Beta 1 Settings" navCategories={beta1NavCategories}>
              <Beta1Settings />
            </PlatformLayout>
          </ProtectedRoute>
        } />

        {/* Catch-all for invalid Beta1 routes */}
        <Route path="*" element={
          <ProtectedRoute>
            <PlatformLayout moduleTitle="Not Found" navCategories={beta1NavCategories}>
              <NotFound />
            </PlatformLayout>
          </ProtectedRoute>
        } />
      </Route>

      {/* Beta2 Routes */}
      <Route path="/beta2">
        <Route index element={
          <ProtectedRoute>
            <PlatformLayout moduleTitle="Loyalty Platform Beta" navCategories={beta2NavCategories}>
              <Beta2Dashboard />
            </PlatformLayout>
          </ProtectedRoute>
        } />
        
        <Route path="members" element={
          <ProtectedRoute>
            <PlatformLayout moduleTitle="Beta 2 Members" navCategories={beta2NavCategories}>
              <Beta2Members />
            </PlatformLayout>
          </ProtectedRoute>
        } />
        
        <Route path="rewards" element={
          <ProtectedRoute>
            <PlatformLayout moduleTitle="Beta 2 Rewards" navCategories={beta2NavCategories}>
              <Beta2Rewards />
            </PlatformLayout>
          </ProtectedRoute>
        } />
        
        <Route path="analytics" element={
          <ProtectedRoute>
            <PlatformLayout moduleTitle="Beta 2 Analytics" navCategories={beta2NavCategories}>
              <Beta2Analytics />
            </PlatformLayout>
          </ProtectedRoute>
        } />
        
        <Route path="settings" element={
          <ProtectedRoute>
            <PlatformLayout moduleTitle="Beta 2 Settings" navCategories={beta2NavCategories}>
              <Beta2Settings />
            </PlatformLayout>
          </ProtectedRoute>
        } />

        {/* Catch-all for invalid Beta2 routes */}
        <Route path="*" element={
          <ProtectedRoute>
            <PlatformLayout moduleTitle="Not Found" navCategories={beta2NavCategories}>
              <NotFound />
            </PlatformLayout>
          </ProtectedRoute>
        } />
      </Route>
    </>
  );
};

export default BetaRoutes; 