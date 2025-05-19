
import React from "react";
import { Route } from "react-router-dom";
import { PlatformLayout } from '@/components/layouts/PlatformLayout';
import AIExtractPage from "@/pages/auto/AIExtractPage";
import { FileCode, Upload, FileSearch, Settings, Database } from 'lucide-react';
import { NavCategory } from '@/components/layout/sidebar/types';

export const AIExtractNavCategories: NavCategory[] = [
  {
    name: "AI Extract",
    label: "AI Extract",
    items: [
      { label: "Dashboard", path: "/ai-extract", icon: FileCode },
      { label: "Upload Documents", path: "/ai-extract/upload", icon: Upload },
      { label: "View Extractions", path: "/ai-extract/extractions", icon: FileSearch },
      { label: "Data Storage", path: "/ai-extract/storage", icon: Database },
      { label: "Settings", path: "/ai-extract/settings", icon: Settings }
    ]
  }
];

export const AIExtractRoutes = () => {
  return [
    <Route key="ai-extract-index" path="/ai-extract">
      <Route index element={
        <PlatformLayout
          moduleTitle="AI Extract"
          navCategories={AIExtractNavCategories}
        >
          <AIExtractPage />
        </PlatformLayout>
      } />
      <Route path="upload" element={
        <PlatformLayout
          moduleTitle="Upload Documents"
          navCategories={AIExtractNavCategories}
        >
          <AIExtractPage />
        </PlatformLayout>
      } />
      <Route path="extractions" element={
        <PlatformLayout
          moduleTitle="View Extractions"
          navCategories={AIExtractNavCategories}
        >
          <AIExtractPage />
        </PlatformLayout>
      } />
      <Route path="storage" element={
        <PlatformLayout
          moduleTitle="Data Storage"
          navCategories={AIExtractNavCategories}
        >
          <AIExtractPage />
        </PlatformLayout>
      } />
      <Route path="settings" element={
        <PlatformLayout
          moduleTitle="AI Extract Settings"
          navCategories={AIExtractNavCategories}
        >
          <AIExtractPage />
        </PlatformLayout>
      } />
    </Route>
  ];
};
