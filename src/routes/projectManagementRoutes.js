import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Route } from "react-router-dom";
import PermissionGuard from "@/components/PermissionGuard";
import ProjectsPage from "@/pages/project-management/ProjectsPage";
import ProjectDetailsPage from "@/pages/project-management/ProjectDetailsPage";
import KanbanBoardPage from "@/pages/project-management/KanbanBoardPage";
import GanttChartPage from "@/pages/project-management/GanttChartPage";
import ProjectsDashboardPage from "@/pages/project-management/ProjectsDashboardPage";
import { ProjectManagementLayout } from "@/components/layout/ProjectManagementLayout";
// Create a wrapper component that converts requiredPermission to permission
const PermissionWrapper = ({ requiredPermission, children }) => {
    return (_jsx(PermissionGuard, { permission: requiredPermission, children: children }));
};
export const ProjectManagementRoutes = () => {
    return [
        _jsxs(Route, { path: "/projects", element: _jsx(ProjectManagementLayout, {}), children: [_jsx(Route, { index: true, element: _jsx(PermissionWrapper, { requiredPermission: "projects.access", children: _jsx(ProjectsDashboardPage, {}) }) }), _jsx(Route, { path: "list", element: _jsx(PermissionWrapper, { requiredPermission: "projects.access", children: _jsx(ProjectsPage, {}) }) }), _jsx(Route, { path: ":projectId", element: _jsx(PermissionWrapper, { requiredPermission: "projects.access", children: _jsx(ProjectDetailsPage, {}) }) }), _jsx(Route, { path: ":projectId/kanban", element: _jsx(PermissionWrapper, { requiredPermission: "projects.access", children: _jsx(KanbanBoardPage, {}) }) }), _jsx(Route, { path: ":projectId/gantt", element: _jsx(PermissionWrapper, { requiredPermission: "projects.access", children: _jsx(GanttChartPage, {}) }) })] }, "projects")
    ];
};
