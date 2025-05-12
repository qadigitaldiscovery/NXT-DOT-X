
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
  ChevronRight
} from "lucide-react";

const ProjectManagementLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-full">
      {/* Project sidebar navigation */}
      <div className={cn(
        "bg-slate-50 border-r border-slate-200 transition-all",
        isCollapsed ? "w-16" : "w-64"
      )}>
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <h2 className={cn("font-semibold", isCollapsed && "hidden")}>Project Management</h2>
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)} 
            className="p-1 rounded-md hover:bg-slate-200"
          >
            <ChevronRight className={cn(
              "h-5 w-5 transition-transform", 
              isCollapsed ? "rotate-180" : ""
            )} />
          </button>
        </div>
        <nav className="p-2 space-y-1">
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
                "pt-2 pb-1 px-3 text-xs font-medium text-slate-500 uppercase",
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
                label="Team" 
                isCollapsed={isCollapsed} 
              />
              <NavItem 
                to="#" 
                icon={BarChart4} 
                label="Reports" 
                isCollapsed={isCollapsed} 
              />
              <NavItem 
                to="#" 
                icon={Settings} 
                label="Settings" 
                isCollapsed={isCollapsed} 
              />
            </>
          )}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        {children || <Outlet />}
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
        "flex items-center space-x-2 px-3 py-2 rounded-md transition-colors",
        (isActive || linkActive) 
          ? "bg-slate-200 text-slate-900" 
          : "text-slate-700 hover:bg-slate-200 hover:text-slate-900"
      )}
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      {!isCollapsed && <span>{label}</span>}
    </NavLink>
  );
};

export default ProjectManagementLayout;
