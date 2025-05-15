
import { Route } from "react-router-dom";
import { PlatformLayout } from "@/components/layouts/PlatformLayout";
import DotXDashboard from "@/pages/dot-x/Dashboard";
import DotXApi from "@/pages/dot-x/Api";
import DotXDataServices from "@/pages/dot-x/DataServices";
import DotXPlugins from "@/pages/dot-x/Plugins";
import DotXSettings from "@/pages/dot-x/Settings";
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
          <DotXDashboard />
        </PlatformLayout>
      } />
      <Route path="api" element={
        <PlatformLayout
          moduleTitle="DOT-X API Integration"
          navCategories={dotXNavCategories}
        >
          <DotXApi />
        </PlatformLayout>
      } />
      <Route path="data-services" element={
        <PlatformLayout
          moduleTitle="DOT-X Data Services"
          navCategories={dotXNavCategories}
        >
          <DotXDataServices />
        </PlatformLayout>
      } />
      <Route path="plugins" element={
        <PlatformLayout
          moduleTitle="DOT-X Plugins"
          navCategories={dotXNavCategories}
        >
          <DotXPlugins />
        </PlatformLayout>
      } />
      <Route path="settings" element={
        <PlatformLayout
          moduleTitle="DOT-X Settings"
          navCategories={dotXNavCategories}
        >
          <DotXSettings />
        </PlatformLayout>
      } />
    </Route>
  );
};
