
import { Route } from "react-router-dom";
import { PlatformLayout } from "@/components/layouts/PlatformLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import DotXDashboard from "@/pages/dot-x/Dashboard";
import DotXDashboard2 from "@/pages/dot-x/Dashboard2";
import DotXApi from "@/pages/dot-x/Api";
import DotXDataServices from "@/pages/dot-x/DataServices";
import DotXPlugins from "@/pages/dot-x/Plugins";
import DotXSettings from "@/pages/dot-x/Settings";
import { NavCategory } from '@/components/layout/sidebar/types';
import { LayoutDashboard, Code, Database, FileCode, Settings, Zap } from 'lucide-react';

export const dotXNavCategories: NavCategory[] = [
  {
    name: "DOT-X",
    label: "DOT-X PLATFORM",
    items: [
      { label: 'Dashboard', icon: LayoutDashboard, path: '/dot-x' },
      { label: 'DOT-X-2', icon: Zap, path: '/dot-x/dot-x-2' },
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
        <ProtectedRoute>
          <PlatformLayout
            moduleTitle="DOT-X Platform"
            navCategories={dotXNavCategories}
          >
            <DotXDashboard />
          </PlatformLayout>
        </ProtectedRoute>
      } />
      
      <Route path="dot-x-2" element={
        <ProtectedRoute>
          <PlatformLayout
            moduleTitle="DOT-X-2 Advanced Platform"
            navCategories={dotXNavCategories}
          >
            <DotXDashboard2 />
          </PlatformLayout>
        </ProtectedRoute>
      } />
      
      <Route path="api" element={
        <ProtectedRoute>
          <PlatformLayout
            moduleTitle="DOT-X API Integration"
            navCategories={dotXNavCategories}
          >
            <DotXApi />
          </PlatformLayout>
        </ProtectedRoute>
      } />
      
      <Route path="data-services" element={
        <ProtectedRoute>
          <PlatformLayout
            moduleTitle="DOT-X Data Services"
            navCategories={dotXNavCategories}
          >
            <DotXDataServices />
          </PlatformLayout>
        </ProtectedRoute>
      } />
      
      <Route path="plugins" element={
        <ProtectedRoute>
          <PlatformLayout
            moduleTitle="DOT-X Plugins"
            navCategories={dotXNavCategories}
          >
            <DotXPlugins />
          </PlatformLayout>
        </ProtectedRoute>
      } />
      
      <Route path="settings" element={
        <ProtectedRoute>
          <PlatformLayout
            moduleTitle="DOT-X Settings"
            navCategories={dotXNavCategories}
          >
            <DotXSettings />
          </PlatformLayout>
        </ProtectedRoute>
      } />
    </Route>
  );
};
