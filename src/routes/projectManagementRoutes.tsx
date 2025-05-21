import React from "react";
import { Route } from "react-router-dom";
import PermissionGuard from "@/components/PermissionGuard";
import ProjectsPage from "@/pages/project-management/ProjectsPage";
import ProjectDetailsPage from "@/pages/project-management/ProjectDetailsPage";
import KanbanBoardPage from "@/pages/project-management/KanbanBoardPage";
import GanttChartPage from "@/pages/project-management/GanttChartPage";
import ProjectsDashboardPage from "@/pages/project-management/ProjectsDashboardPage";
import { ProjectManagementLayout } from "@/components/layout/ProjectManagementLayout";

// Create interface to match the expected props
interface PermissionGuardProps {
  permission: string;
  children: React.ReactNode;
}

// Create a wrapper component that converts requiredPermission to permission
const PermissionWrapper: React.FC<{ requiredPermission: string, children: React.ReactNode }> = ({ 
  requiredPermission, 
  children 
}) => {
  return (
    <PermissionGuard permission={requiredPermission}>
      {children}
    </PermissionGuard>
  );
};

export const ProjectManagementRoutes = () => {
  return [
    <Route key="projects" path="/projects" element={<ProjectManagementLayout />}>
      <Route index element={
        <PermissionWrapper requiredPermission="projects.access">
          <ProjectsDashboardPage />
        </PermissionWrapper>
      } />
      <Route path="list" element={
        <PermissionWrapper requiredPermission="projects.access">
          <ProjectsPage />
        </PermissionWrapper>
      } />
      <Route path=":projectId" element={
        <PermissionWrapper requiredPermission="projects.access">
          <ProjectDetailsPage />
        </PermissionWrapper>
      } />
      <Route path=":projectId/kanban" element={
        <PermissionWrapper requiredPermission="projects.access">
          <KanbanBoardPage />
        </PermissionWrapper>
      } />
      <Route path=":projectId/gantt" element={
        <PermissionWrapper requiredPermission="projects.access">
          <GanttChartPage />
        </PermissionWrapper>
      } />
    </Route>
  ];
};
