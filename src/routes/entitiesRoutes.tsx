
import { Route } from "react-router-dom";
import { PlatformLayout } from '@/components/layouts/PlatformLayout';
import EntitiesPage from "@/pages/auto/EntitiesPage";
import { Building, Users, FileText, Map, Settings, List } from 'lucide-react';
import { NavCategory } from '@/components/layout/sidebar/types';

export const EntitiesNavCategories: NavCategory[] = [
  {
    name: "Entities",
    label: "Entities",
    items: [
      { label: "Dashboard", path: "/entities", icon: Building },
      { label: "Directory", path: "/entities/list", icon: List },
      { label: "Personnel", path: "/entities/personnel", icon: Users },
      { label: "Documents", path: "/entities/documents", icon: FileText },
      { label: "Locations", path: "/entities/locations", icon: Map },
      { label: "Settings", path: "/entities/settings", icon: Settings }
    ]
  }
];

export const EntitiesRoutes = () => {
  return (
    <Route path="/entities">
      <Route index element={
        <PlatformLayout
          moduleTitle="Entities"
          navCategories={EntitiesNavCategories}
        >
          <EntitiesPage />
        </PlatformLayout>
      } />
      <Route path="list" element={
        <PlatformLayout
          moduleTitle="Entities Directory"
          navCategories={EntitiesNavCategories}
        >
          <EntitiesPage />
        </PlatformLayout>
      } />
      <Route path="personnel" element={
        <PlatformLayout
          moduleTitle="Entity Personnel"
          navCategories={EntitiesNavCategories}
        >
          <EntitiesPage />
        </PlatformLayout>
      } />
      <Route path="documents" element={
        <PlatformLayout
          moduleTitle="Entity Documents"
          navCategories={EntitiesNavCategories}
        >
          <EntitiesPage />
        </PlatformLayout>
      } />
      <Route path="locations" element={
        <PlatformLayout
          moduleTitle="Entity Locations"
          navCategories={EntitiesNavCategories}
        >
          <EntitiesPage />
        </PlatformLayout>
      } />
      <Route path="settings" element={
        <PlatformLayout
          moduleTitle="Entity Settings"
          navCategories={EntitiesNavCategories}
        >
          <EntitiesPage />
        </PlatformLayout>
      } />
    </Route>
  );
};
