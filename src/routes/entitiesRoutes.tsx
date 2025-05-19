
import React from "react";
import { Route } from "react-router-dom";
import { PlatformLayout } from '@/components/layouts/PlatformLayout';
import EntitiesPage from "@/pages/auto/EntitiesPage";
import { Building, Users, FileText, Map, Settings, ListOrdered } from 'lucide-react';
import { NavCategory } from '@/components/layout/sidebar/types';
import ProtectedRoute from "@/components/ProtectedRoute";

export const EntitiesNavCategories: NavCategory[] = [
  {
    name: "Entities",
    label: "Entities",
    items: [
      { label: "Dashboard", path: "/entities", icon: Building },
      { label: "Directory", path: "/entities/list", icon: ListOrdered },
      { label: "Personnel", path: "/entities/personnel", icon: Users },
      { label: "Documents", path: "/entities/documents", icon: FileText },
      { label: "Locations", path: "/entities/locations", icon: Map },
      { label: "Settings", path: "/entities/settings", icon: Settings }
    ]
  }
];

export const EntitiesRoutes = () => {
  return [
    <Route key="entities-index" path="/entities">
      <Route index element={
        <ProtectedRoute>
          <PlatformLayout
            moduleTitle="Entities"
            navCategories={EntitiesNavCategories}
          >
            <EntitiesPage />
          </PlatformLayout>
        </ProtectedRoute>
      } />
      <Route path="list" element={
        <ProtectedRoute>
          <PlatformLayout
            moduleTitle="Entities Directory"
            navCategories={EntitiesNavCategories}
          >
            <EntitiesPage />
          </PlatformLayout>
        </ProtectedRoute>
      } />
      <Route path="personnel" element={
        <ProtectedRoute>
          <PlatformLayout
            moduleTitle="Entity Personnel"
            navCategories={EntitiesNavCategories}
          >
            <EntitiesPage />
          </PlatformLayout>
        </ProtectedRoute>
      } />
      <Route path="documents" element={
        <ProtectedRoute>
          <PlatformLayout
            moduleTitle="Entity Documents"
            navCategories={EntitiesNavCategories}
          >
            <EntitiesPage />
          </PlatformLayout>
        </ProtectedRoute>
      } />
      <Route path="locations" element={
        <ProtectedRoute>
          <PlatformLayout
            moduleTitle="Entity Locations"
            navCategories={EntitiesNavCategories}
          >
            <EntitiesPage />
          </PlatformLayout>
        </ProtectedRoute>
      } />
      <Route path="settings" element={
        <ProtectedRoute>
          <PlatformLayout
            moduleTitle="Entity Settings"
            navCategories={EntitiesNavCategories}
          >
            <EntitiesPage />
          </PlatformLayout>
        </ProtectedRoute>
      } />
    </Route>
  ];
};
