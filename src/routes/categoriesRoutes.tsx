
import { Route } from "react-router-dom";
import { PlatformLayout } from '@/components/layouts/PlatformLayout';
import CategoriesPage from "@/pages/auto/CategoriesPage";
import { FolderKanban, List, PieChart, Settings, Plus } from 'lucide-react';
import { NavCategory } from '@/components/layout/sidebar/types';

export const CategoriesNavCategories: NavCategory[] = [
  {
    name: "Categories",
    label: "Categories",
    items: [
      { label: "Overview", path: "/categories", icon: FolderKanban },
      { label: "All Categories", path: "/categories/list", icon: List },
      { label: "Create Category", path: "/categories/new", icon: Plus },
      { label: "Analytics", path: "/categories/analytics", icon: PieChart },
      { label: "Settings", path: "/categories/settings", icon: Settings }
    ]
  }
];

export const CategoriesRoutes = () => {
  return (
    <Route path="/categories">
      <Route index element={
        <PlatformLayout
          moduleTitle="Categories"
          navCategories={CategoriesNavCategories}
        >
          <CategoriesPage />
        </PlatformLayout>
      } />
      <Route path="list" element={
        <PlatformLayout
          moduleTitle="All Categories"
          navCategories={CategoriesNavCategories}
        >
          <CategoriesPage />
        </PlatformLayout>
      } />
      <Route path="new" element={
        <PlatformLayout
          moduleTitle="Create Category"
          navCategories={CategoriesNavCategories}
        >
          <CategoriesPage />
        </PlatformLayout>
      } />
      <Route path="analytics" element={
        <PlatformLayout
          moduleTitle="Categories Analytics"
          navCategories={CategoriesNavCategories}
        >
          <CategoriesPage />
        </PlatformLayout>
      } />
      <Route path="settings" element={
        <PlatformLayout
          moduleTitle="Categories Settings"
          navCategories={CategoriesNavCategories}
        >
          <CategoriesPage />
        </PlatformLayout>
      } />
    </Route>
  );
};
