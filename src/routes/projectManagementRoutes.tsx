
import React from "react";
import { Route } from "react-router-dom";
import PermissionGuard from "@/components/PermissionGuard";
import ProjectsPage from "@/pages/project-management/ProjectsPage";
import ProjectDetailsPage from "@/pages/project-management/ProjectDetailsPage";
import KanbanBoardPage from "@/pages/project-management/KanbanBoardPage";
import GanttChartPage from "@/pages/project-management/GanttChartPage";
import ProjectsDashboardPage from "@/pages/project-management/ProjectsDashboardPage";
import { ProjectManagementLayout } from "@/components/layout/ProjectManagementLayout";

export const ProjectManagementRoutes = () => {
  return [
    <Route key="projects" path="/projects" element={<ProjectManagementLayout />}>
      <Route index element={
        <PermissionGuard requiredPermission="projects.access">
          <ProjectsDashboardPage />
        </PermissionGuard>
      } />
      <Route path="list" element={
        <PermissionGuard requiredPermission="projects.access">
          <ProjectsPage />
        </PermissionGuard>
      } />
      <Route path=":projectId" element={
        <PermissionGuard requiredPermission="projects.access">
          <ProjectDetailsPage />
        </PermissionGuard>
      } />
      <Route path=":projectId/kanban" element={
        <PermissionGuard requiredPermission="projects.access">
          <KanbanBoardPage />
        </PermissionGuard>
      } />
      <Route path=":projectId/gantt" element={
        <PermissionGuard requiredPermission="projects.access">
          <GanttChartPage />
        </PermissionGuard>
      } />
    </Route>
  ];
};
