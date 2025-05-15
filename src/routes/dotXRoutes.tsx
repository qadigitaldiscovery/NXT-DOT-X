
import { Route } from "react-router-dom";
import { PlatformLayout } from "@/components/layouts/PlatformLayout";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/NotFound";
import { NavCategory } from '@/components/layout/sidebar/types';
import { LayoutDashboard, Code, Database, FileCode, Settings } from 'lucide-react';

const dotXNavCategories: NavCategory[] = [
  {
    name: "DOT-X",
    label: "DOT-X PLATFORM",
    items: [
      { label: 'Dashboard', icon: LayoutDashboard, path: '/dot-x' },
      { label: 'API Integration', icon: Code, path: '/dot-x/api' },
      { label: 'Data Services', icon: Database, path: '/dot-x/data-services' },
      { label: 'Plugins', icon: FileCode, path: '/dot-x/plugins' },
      { label: 'Settings', icon: Settings, path: '/dot-x/settings' }
    ]
  }
];

export const DotXRoutes = () => {
  return (
    <Route path="/dot-x">
      <Route index element={
        <PlatformLayout
          moduleTitle="DOT-X Platform"
          navCategories={dotXNavCategories}
        >
          <Dashboard />
        </PlatformLayout>
      } />
      <Route path="api" element={
        <PlatformLayout
          moduleTitle="DOT-X API Integration"
          navCategories={dotXNavCategories}
        >
          <Dashboard />
        </PlatformLayout>
      } />
      <Route path="data-services" element={
        <PlatformLayout
          moduleTitle="DOT-X Data Services"
          navCategories={dotXNavCategories}
        >
          <Dashboard />
        </PlatformLayout>
      } />
      <Route path="plugins" element={
        <PlatformLayout
          moduleTitle="DOT-X Plugins"
          navCategories={dotXNavCategories}
        >
          <Dashboard />
        </PlatformLayout>
      } />
      <Route path="settings" element={
        <PlatformLayout
          moduleTitle="DOT-X Settings"
          navCategories={dotXNavCategories}
        >
          <Dashboard />
        </PlatformLayout>
      } />
      
      <Route path="*" element={
        <PlatformLayout
          moduleTitle="Not Found"
          navCategories={dotXNavCategories}
        >
          <NotFound />
        </PlatformLayout>
      } />
    </Route>
  );
};
