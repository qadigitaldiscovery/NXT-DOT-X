
import React from "react";
import { Route } from "react-router-dom";
import { PlatformLayout } from '@/components/layouts/PlatformLayout';
import FilesPage from "@/pages/auto/FilesPage";
import { Files, Upload, Search, History, Settings } from 'lucide-react';
import { NavCategory } from '@/components/layout/sidebar/types';

export const FilesNavCategories: NavCategory[] = [
  {
    name: "Files",
    label: "Files",
    items: [
      { label: "Dashboard", path: "/files", icon: Files },
      { label: "Upload", path: "/files/upload", icon: Upload },
      { label: "Search", path: "/files/search", icon: Search },
      { label: "History", path: "/files/history", icon: History },
      { label: "Settings", path: "/files/settings", icon: Settings }
    ]
  }
];

export const FilesRoutes = () => {
  return [
    <Route key="files-index" path="/files">
      <Route index element={
        <PlatformLayout
          moduleTitle="Files"
          navCategories={FilesNavCategories}
        >
          <FilesPage />
        </PlatformLayout>
      } />
      <Route path="upload" element={
        <PlatformLayout
          moduleTitle="Upload Files"
          navCategories={FilesNavCategories}
        >
          <FilesPage />
        </PlatformLayout>
      } />
      <Route path="search" element={
        <PlatformLayout
          moduleTitle="Search Files"
          navCategories={FilesNavCategories}
        >
          <FilesPage />
        </PlatformLayout>
      } />
      <Route path="history" element={
        <PlatformLayout
          moduleTitle="File History"
          navCategories={FilesNavCategories}
        >
          <FilesPage />
        </PlatformLayout>
      } />
      <Route path="settings" element={
        <PlatformLayout
          moduleTitle="File Settings"
          navCategories={FilesNavCategories}
        >
          <FilesPage />
        </PlatformLayout>
      } />
    </Route>
  ];
};
