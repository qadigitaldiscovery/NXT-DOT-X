
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

const ProjectManagementLayout = ({ children }: { children?: React.ReactNode }) => {
  const navigate = useNavigate();

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

  // Custom footer with navigation controls
  const navigationFooter = (
    <div className="flex items-center justify-between p-2 border-t border-indigo-900/50 mt-auto">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => navigate(-1)}
        className="text-blue-200 hover:text-blue-100 hover:bg-indigo-900/50 rounded-lg"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => navigate('/')}
        className="text-blue-200 hover:text-blue-100 hover:bg-indigo-900/50 rounded-lg"
      >
        <Home className="h-5 w-5" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => navigate(1)}
        className="text-blue-200 hover:text-blue-100 hover:bg-indigo-900/50 rounded-lg"
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
