
import React from 'react';
import { Navbar } from './Navbar';
import { 
  Sidebar,
  SidebarProvider,
  SidebarInset,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent
} from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { NavLink } from 'react-router-dom';
import { topLevelNavItems, navCategories, settingsItem } from './sidebar/NavigationConfig';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const isMobile = useIsMobile();

  React.useEffect(() => {
    // Close sidebar by default on mobile
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <SidebarProvider defaultOpen={sidebarOpen} onOpenChange={setSidebarOpen}>
      <div className="flex h-screen overflow-hidden bg-background">
        <Sidebar 
          collapsible={isMobile ? "offcanvas" : "icon"} 
          side="left"
          variant="sidebar"
        >
          <SidebarHeader className="flex items-center p-4 h-16">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-sidebar-primary flex items-center justify-center">
                <span className="text-white font-bold">NX</span>
              </div>
              <h1 className="text-lg font-bold text-white">NXT LEVEL TECH</h1>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            {/* Top level nav items */}
            <SidebarGroup>
              <SidebarMenu>
                {topLevelNavItems.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton asChild tooltip={item.label}>
                      <NavLink 
                        to={item.path}
                        className={({ isActive }) => cn(isActive && "data-[active=true]")}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
            
            {/* Categories */}
            {navCategories.map((category) => (
              <SidebarGroup key={category.name}>
                <SidebarGroupLabel>{category.name}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {category.items.map((item) => (
                      <SidebarMenuItem key={item.path}>
                        <SidebarMenuButton asChild tooltip={item.label}>
                          <NavLink 
                            to={item.path}
                            className={({ isActive }) => cn(isActive && "data-[active=true]")}
                          >
                            <item.icon className="h-5 w-5" />
                            <span>{item.label}</span>
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>
          
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={settingsItem.label}>
                  <NavLink 
                    to={settingsItem.path}
                    className={({ isActive }) => cn("w-full", isActive && "data-[active=true]")}
                  >
                    <settingsItem.icon className="h-5 w-5" />
                    <span>{settingsItem.label}</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset className="flex flex-col overflow-hidden">
          <Navbar onMenuClick={toggleSidebar} />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};
