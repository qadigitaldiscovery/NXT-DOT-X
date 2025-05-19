
import React from "react";
import { Route } from "react-router-dom";
import { PlatformLayout } from '@/components/layouts/PlatformLayout';
import RequestsPage from "@/pages/auto/RequestsPage";
import { FileInput, Plus, ClipboardList, Clock, Settings } from 'lucide-react';
import { NavCategory } from '@/components/layout/sidebar/types';

export const RequestsNavCategories: NavCategory[] = [
  {
    name: "Requests",
    label: "Submit Requests",
    items: [
      { label: "Dashboard", path: "/requests", icon: FileInput },
      { label: "New Request", path: "/requests/new", icon: Plus },
      { label: "My Requests", path: "/requests/my-requests", icon: ClipboardList },
      { label: "Pending Requests", path: "/requests/pending", icon: Clock },
      { label: "Settings", path: "/requests/settings", icon: Settings }
    ]
  }
];

export const RequestsRoutes = () => {
  return [
    <Route key="requests-index" path="/requests">
      <Route index element={
        <PlatformLayout
          moduleTitle="Requests Dashboard"
          navCategories={RequestsNavCategories}
        >
          <RequestsPage />
        </PlatformLayout>
      } />
      <Route path="new" element={
        <PlatformLayout
          moduleTitle="New Request"
          navCategories={RequestsNavCategories}
        >
          <RequestsPage />
        </PlatformLayout>
      } />
      <Route path="my-requests" element={
        <PlatformLayout
          moduleTitle="My Requests"
          navCategories={RequestsNavCategories}
        >
          <RequestsPage />
        </PlatformLayout>
      } />
      <Route path="pending" element={
        <PlatformLayout
          moduleTitle="Pending Requests"
          navCategories={RequestsNavCategories}
        >
          <RequestsPage />
        </PlatformLayout>
      } />
      <Route path="settings" element={
        <PlatformLayout
          moduleTitle="Request Settings"
          navCategories={RequestsNavCategories}
        >
          <RequestsPage />
        </PlatformLayout>
      } />
    </Route>
  ];
};
