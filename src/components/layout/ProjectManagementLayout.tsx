
import React from "react";
import { Outlet } from "react-router-dom";
import { 
  LayoutDashboard, 
  Box, 
  ListTodo, 
  ChartBar, 
  BarChart4, 
  Settings, 
  Users,
  Home
} from "lucide-react";
import SharedDashboardLayout from "./SharedDashboardLayout";

const ProjectManagementLayout = ({ children }: { children?: React.ReactNode }) => {
  // Define navigation categories for the Project Management module
  const navCategories = [
    {
      name: "Project Hub",
      items: [
        { label: "Dashboard", path: "/projects", icon: LayoutDashboard },
        { label: "Projects", path: "/projects/list", icon: Box }
      ]
    },
    {
      name: "Current Project",
      items: [
        { label: "Overview", path: "#", icon: ListTodo },
        { label: "Kanban Board", path: "#", icon: ListTodo },
        { label: "Gantt Chart", path: "#", icon: ChartBar },
        { label: "Team Members", path: "#", icon: Users },
        { label: "Reports & Analytics", path: "#", icon: BarChart4 },
        { label: "Project Settings", path: "#", icon: Settings }
      ]
    }
  ];

  return (
    <SharedDashboardLayout
      moduleTitle="Project Management"
      navCategories={navCategories}
      homeItem={{ label: "Master Dashboard", path: "/", icon: Home }}
    >
      {children || <Outlet />}
    </SharedDashboardLayout>
  );
};

export default ProjectManagementLayout;
