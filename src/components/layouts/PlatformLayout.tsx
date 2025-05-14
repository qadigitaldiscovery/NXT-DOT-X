
import React, { useState } from 'react';
import { 
  Sidebar, 
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider
} from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar';
import Topbar from '@/components/layouts/Topbar';
import { Button } from '@/components/ui/button';
import { MenuIcon } from 'lucide-react';
import { NavCategory } from '@/components/layout/sidebar/types';

interface PlatformLayoutProps {
  children: React.ReactNode;
  moduleTitle?: string;
  navCategories?: NavCategory[];
  customFooterContent?: React.ReactNode;
  removeBottomToggle?: boolean;
  showTopLeftToggle?: boolean;
}

export const PlatformLayout: React.FC<PlatformLayoutProps> = ({ 
  children, 
  moduleTitle = "Platform Dashboard",
  navCategories = [],
  customFooterContent,
  removeBottomToggle = false,
  showTopLeftToggle = true
}) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen overflow-hidden w-full">
        <Sidebar>
          <SidebarHeader className="p-4 border-b">
            <h2 className="font-medium">{moduleTitle}</h2>
          </SidebarHeader>
          <SidebarContent className="p-2">
            {/* Sidebar content will go here */}
          </SidebarContent>
          <SidebarFooter className="p-4 border-t">
            {customFooterContent || null}
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex flex-col flex-1 overflow-hidden">
          <Topbar title={moduleTitle} />
          
          <main className="flex-1 overflow-y-auto p-4">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default PlatformLayout;
