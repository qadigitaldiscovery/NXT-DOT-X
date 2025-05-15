
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Box, 
  ListTodo, 
  ChartBar, 
  BarChart4, 
  Settings, 
  Users,
  Home,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import SharedDashboardLayout from "./SharedDashboardLayout";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { NavCategory } from "./sidebar/types";

const ProjectManagementLayout = ({ children }: { children?: React.ReactNode }) => {
  const navigate = useNavigate();

  // Define navigation categories for the Project Management module
  const navCategories: NavCategory[] = [
    {
      name: "Project Hub",
      label: "Project Hub",
      items: [
        { label: "Dashboard", path: "/projects", icon: LayoutDashboard },
        { label: "Projects", path: "/projects/list", icon: Box }
      ]
    },
    {
      name: "Current Project",
      label: "Current Project",
      items: [
        { label: "Overview", path: "#", icon: ListTodo },
        { label: "Kanban Board", path: "#", icon: ListTodo, roles: ["admin", "manager"] },
        { label: "Gantt Chart", path: "#", icon: ChartBar },
        { label: "Team Members", path: "#", icon: Users },
        { label: "Reports & Analytics", path: "#", icon: BarChart4, roles: ["admin"] },
        { label: "Project Settings", path: "#", icon: Settings, roles: ["admin", "manager"] }
      ]
    }
  ];

  // Custom footer with navigation controls
  const navigationFooter = (
    <div className="flex items-center justify-between w-full">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => navigate(-1)}
        className="text-blue-200 hover:text-white hover:bg-indigo-900 rounded-lg w-10 h-10"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => navigate('/')}
        className="text-blue-200 hover:text-white hover:bg-indigo-900 rounded-lg w-10 h-10"
      >
        <Home className="h-5 w-5" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => navigate(1)}
        className="text-blue-200 hover:text-white hover:bg-indigo-900 rounded-lg w-10 h-10"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );

  return (
    <SharedDashboardLayout
      moduleTitle="Project Management"
      navCategories={navCategories}
      customFooterContent={navigationFooter}
      sidebarClassName="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950"
      removeBottomToggle={false}
      showTopLeftToggle={true}
    >
      {children || <Outlet />}
    </SharedDashboardLayout>
  );
};

export default ProjectManagementLayout;
