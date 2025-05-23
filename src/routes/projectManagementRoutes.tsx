
import { Route } from "react-router-dom";
import PermissionGuard from "@/components/PermissionGuard";
import ProjectsPage from "@/pages/project-management/ProjectsPage";
import ProjectDetailsPage from "@/pages/project-management/ProjectDetailsPage";
import KanbanBoardPage from "@/pages/project-management/KanbanBoardPage";
import GanttChartPage from "@/pages/project-management/GanttChartPage";
import ProjectsDashboardPage from "@/pages/project-management/ProjectsDashboardPage";

export const ProjectManagementRoutes = () => {
  return (
    <>
      <Route path="/projects" element={
        <PermissionGuard requiredPermission="projects.access">
          <ProjectsDashboardPage />
        </PermissionGuard>
      } />
      <Route path="/projects/list" element={
        <PermissionGuard requiredPermission="projects.access">
          <ProjectsPage />
        </PermissionGuard>
      } />
      <Route path="/projects/:projectId" element={
        <PermissionGuard requiredPermission="projects.access">
          <ProjectDetailsPage />
        </PermissionGuard>
      } />
      <Route path="/projects/:projectId/kanban" element={
        <PermissionGuard requiredPermission="projects.access">
          <KanbanBoardPage />
        </PermissionGuard>
      } />
      <Route path="/projects/:projectId/gantt" element={
        <PermissionGuard requiredPermission="projects.access">
          <GanttChartPage />
        </PermissionGuard>
      } />
    </>
  );
};
