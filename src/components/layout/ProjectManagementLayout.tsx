
import React, { useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Box, 
  LayoutDashboard, 
  ListTodo, 
  ChartBar, 
  BarChart4, 
  Settings, 
  Users,
  ChevronRight,
  Home
} from "lucide-react";
import { SharedNavbar } from "./SharedNavbar";

const ProjectManagementLayout = ({ children }: { children?: React.ReactNode }) => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen flex-col">
      {/* Reuse the shared navbar component with project management title */}
      <SharedNavbar 
        onMenuClick={() => setIsCollapsed(!isCollapsed)} 
        moduleTitle="Project Management" 
      />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Project sidebar navigation */}
        <div className={cn(
          "bg-slate-50 dark:bg-gray-800 border-r border-slate-200 dark:border-slate-700 transition-all",
          isCollapsed ? "w-16" : "w-64"
        )}>
          <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
            <h2 className={cn("font-semibold text-slate-800 dark:text-slate-200", isCollapsed && "hidden")}>
              Project Hub
            </h2>
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)} 
              className="p-1 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <ChevronRight className={cn(
                "h-5 w-5 transition-transform", 
                isCollapsed ? "rotate-180" : ""
              )} />
            </button>
          </div>
          
          <nav className="p-2 space-y-2">
            <NavItem 
              to="/projects" 
              icon={LayoutDashboard} 
              label="Dashboard" 
              isCollapsed={isCollapsed} 
              isActive={location.pathname === '/projects'}
            />
            <NavItem 
              to="/projects/list" 
              icon={Box} 
              label="Projects" 
              isCollapsed={isCollapsed} 
              isActive={location.pathname === '/projects/list'}
            />
            
            {location.pathname.includes('/projects/') && location.pathname !== '/projects/list' && (
              <>
                <div className={cn(
                  "pt-3 pb-1 px-3 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase",
                  isCollapsed && "hidden"
                )}>
                  Current Project
                </div>
                <NavItem 
                  to={`${location.pathname.split('/kanban')[0].split('/gantt')[0]}`}
                  icon={ListTodo} 
                  label="Overview" 
                  isCollapsed={isCollapsed} 
                  isActive={!location.pathname.includes('/kanban') && !location.pathname.includes('/gantt')}
                />
                <NavItem 
                  to={`${location.pathname.split('/kanban')[0].split('/gantt')[0]}/kanban`}
                  icon={ListTodo} 
                  label="Kanban Board" 
                  isCollapsed={isCollapsed} 
                  isActive={location.pathname.includes('/kanban')}
                />
                <NavItem 
                  to={`${location.pathname.split('/kanban')[0].split('/gantt')[0]}/gantt`}
                  icon={ChartBar} 
                  label="Gantt Chart" 
                  isCollapsed={isCollapsed} 
                  isActive={location.pathname.includes('/gantt')}
                />
                <NavItem 
                  to="#" 
                  icon={Users} 
                  label="Team Members" 
                  isCollapsed={isCollapsed} 
                />
                <NavItem 
                  to="#" 
                  icon={BarChart4} 
                  label="Reports & Analytics" 
                  isCollapsed={isCollapsed} 
                />
                <NavItem 
                  to="#" 
                  icon={Settings} 
                  label="Project Settings" 
                  isCollapsed={isCollapsed} 
                />
              </>
            )}
            
            {/* Back to Master Dashboard */}
            <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-700">
              <NavItem 
                to="/" 
                icon={Home} 
                label="Master Dashboard" 
                isCollapsed={isCollapsed} 
              />
            </div>
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-gray-900">
          {children || <Outlet />}
        </div>
      </div>
    </div>
  );
};

interface NavItemProps {
  to: string;
  icon: React.FC<{ className?: string }>;
  label: string;
  isCollapsed: boolean;
  isActive?: boolean;
}

const NavItem = ({ to, icon: Icon, label, isCollapsed, isActive }: NavItemProps) => {
  return (
    <NavLink 
      to={to}
      className={({ isActive: linkActive }) => cn(
        "flex items-center gap-2 px-3 py-2 rounded-md transition-colors",
        (isActive || linkActive) 
          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" 
          : "text-slate-700 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800"
      )}
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      {!isCollapsed && <span>{label}</span>}
    </NavLink>
  );
};

export default ProjectManagementLayout;
