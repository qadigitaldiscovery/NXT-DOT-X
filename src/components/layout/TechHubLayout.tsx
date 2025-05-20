
import React from "react";
import { Outlet } from 'react-router-dom';
import { SharedNavbar } from './SharedNavbar';
import { 
  Sidebar, 
  SidebarProvider, 
  useSidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from '@/components/ui/sidebar';
import { Settings, Code, Globe, Database, Boxes } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Separate inner content component that uses the sidebar hook
const TechHubLayoutContent = () => {
  const { toggleSidebar } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (path: string) => {
    return location.pathname.includes(path);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <div className="flex flex-1">
        <Sidebar>
          <SidebarHeader className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Tech Hub</h2>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    isActive={isActive('/tech-hub/personas')}
                    onClick={() => navigate('/tech-hub/personas')}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>AI Personas</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    isActive={isActive('/tech-hub/api-management')}
                    onClick={() => navigate('/tech-hub/api-management')}
                  >
                    <Code className="mr-2 h-4 w-4" />
                    <span>API Management</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    isActive={isActive('/tech-hub/integrations')}
                    onClick={() => navigate('/tech-hub/integrations')}
                  >
                    <Globe className="mr-2 h-4 w-4" />
                    <span>Integrations</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    isActive={isActive('/tech-hub/cloud-services')}
                    onClick={() => navigate('/tech-hub/cloud-services')}
                  >
                    <Database className="mr-2 h-4 w-4" />
                    <span>Cloud Services</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    isActive={isActive('/tech-hub/technical-config')}
                    onClick={() => navigate('/tech-hub/technical-config')}
                  >
                    <Boxes className="mr-2 h-4 w-4" />
                    <span>Technical Config</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="p-4 border-t">
            <div className="text-xs text-muted-foreground text-center">
              Tech Hub v1.2.0
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col">
          <SharedNavbar onMenuClick={toggleSidebar} moduleTitle="Tech Hub" />
          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

// Main layout component that provides the SidebarProvider context
export function TechHubLayout({ children }: { children?: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <TechHubLayoutContent />
    </SidebarProvider>
  );
}
