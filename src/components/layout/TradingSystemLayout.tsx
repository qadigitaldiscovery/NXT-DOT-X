import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarProvider, 
  useSidebar,
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { MenuIcon, Home } from 'lucide-react';
import { SharedNavbar } from './SharedNavbar';
import { navCategories, masterDashItem } from './sidebar/NavigationConfig';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface TradingSystemLayoutProps {
  moduleTitle?: string;
  children?: React.ReactNode;
}

// Separate the inner content that uses the sidebar hook
const TradingSystemContent: React.FC<TradingSystemLayoutProps> = ({ moduleTitle, children }) => {
  const navigate = useNavigate();
  const { toggleSidebar } = useSidebar();
  const location = useLocation();
  
  const handleNavigate = (path?: string) => {
    if (path) {
      navigate(path);
    }
  };
  
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar>
        <SidebarHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">DOT-X Platform</h2>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar}
              className="text-gray-500 hover:bg-gray-100"
            >
              <MenuIcon className="h-5 w-5" />
            </Button>
          </div>
        </SidebarHeader>
        
        <SidebarContent>
          {navCategories.map((category) => (
            <SidebarGroup key={category.name}>
              <SidebarGroupLabel>{category.name}</SidebarGroupLabel>
              <SidebarMenu>
                {category.items.map((item) => (
                  <SidebarMenuItem key={item.path || item.href}>
                    <SidebarMenuButton 
                      onClick={() => handleNavigate(item.path || item.href)}
                      tooltip={item.label}
                      isActive={location.pathname === (item.path || item.href) || (item.path ? location.pathname.startsWith(`${item.path}/`) : false)}
                    >
                      {item.icon && React.createElement(item.icon, { className: "h-4 w-4" })}
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          ))}
        </SidebarContent>
        
        <SidebarFooter className="p-4 border-t">
          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={() => handleNavigate(masterDashItem.path || masterDashItem.href)}
              tooltip="Master Dashboard"
            >
              <Home className="h-4 w-4" />
              <span>Master Dashboard</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <div className="text-xs text-muted-foreground mt-2 text-center">DOT-X v2.5.8</div>
        </SidebarFooter>
      </Sidebar>
      
      <div className={cn(
        "flex flex-col flex-1 overflow-hidden",
        "md:rounded-tl-xl"
      )}>
        <SharedNavbar 
          onMenuClick={toggleSidebar} 
          moduleTitle={moduleTitle || "Data Management"}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

// Main layout component that provides the SidebarProvider context
export const TradingSystemLayout: React.FC<TradingSystemLayoutProps> = (props) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <TradingSystemContent {...props} />
    </SidebarProvider>
  );
};
