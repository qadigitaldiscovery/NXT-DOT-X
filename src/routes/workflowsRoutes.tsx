
import React from "react";
import { Route } from "react-router-dom";
import { PlatformLayout } from '@/components/layouts/PlatformLayout';
import WorkflowsPage from "@/pages/auto/WorkflowsPage";
import { GitCompareArrows, List, Plus, History, Settings } from 'lucide-react';
import { NavCategory } from '@/components/layout/sidebar/types';

export const WorkflowsNavCategories: NavCategory[] = [
  {
    name: "Workflows",
    label: "Workflows",
    items: [
      { label: "Dashboard", path: "/workflows", icon: GitCompareArrows },
      { label: "All Workflows", path: "/workflows/list", icon: List },
      { label: "Create Workflow", path: "/workflows/new", icon: Plus },
      { label: "History", path: "/workflows/history", icon: History },
      { label: "Settings", path: "/workflows/settings", icon: Settings }
    ]
  }
];

export const WorkflowsRoutes = () => {
  return [
    <Route key="workflows-index" path="/workflows">
      <Route index element={
        <PlatformLayout
          moduleTitle="Workflows"
          navCategories={WorkflowsNavCategories}
        >
          <WorkflowsPage />
        </PlatformLayout>
      } />
      <Route path="list" element={
        <PlatformLayout
          moduleTitle="All Workflows"
          navCategories={WorkflowsNavCategories}
        >
          <WorkflowsPage />
        </PlatformLayout>
      } />
      <Route path="new" element={
        <PlatformLayout
          moduleTitle="Create Workflow"
          navCategories={WorkflowsNavCategories}
        >
          <WorkflowsPage />
        </PlatformLayout>
      } />
      <Route path="history" element={
        <PlatformLayout
          moduleTitle="Workflow History"
          navCategories={WorkflowsNavCategories}
        >
          <WorkflowsPage />
        </PlatformLayout>
      } />
      <Route path="settings" element={
        <PlatformLayout
          moduleTitle="Workflow Settings"
          navCategories={WorkflowsNavCategories}
        >
          <WorkflowsPage />
        </PlatformLayout>
      } />
    </Route>
  ];
};
