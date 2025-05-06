
import { cn } from "@/lib/utils"

// Export context and provider
export { useSidebar, SidebarProvider } from "./sidebar-context"

// Export main components
export { Sidebar } from "./sidebar"
export { SidebarTrigger } from "./sidebar-trigger"
export { SidebarRail } from "./sidebar-rail"
export { SidebarMenuButton } from "./sidebar-menu-button"

// Export all sub-components
export {
  SidebarInset,
  SidebarInput,
  SidebarHeader,
  SidebarFooter,
  SidebarSeparator,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton
} from "./sidebar-components"

// Re-export variants
export { sidebarMenuButtonVariants } from "./sidebar-menu-button"

// Now we need to delete the original sidebar.tsx file
<lov-delete file_path="src/components/ui/sidebar.tsx" />

// Update the import in src/components/layout/DashboardLayout.tsx to use the new sidebar components
<lov-write file_path="src/components/layout/DashboardLayout.tsx">
import React from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

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
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar open={sidebarOpen} onToggle={toggleSidebar} />
      <div 
        className={cn(
          "flex-1 flex flex-col overflow-hidden transition-all duration-300",
          isMobile && sidebarOpen ? "ml-0" : !isMobile && sidebarOpen ? "md:ml-64" : "md:ml-16"
        )}
      >
        <Navbar onMenuClick={toggleSidebar} />
        <main 
          className={cn(
            "flex-1 overflow-y-auto p-4 md:p-6 transition-all duration-200",
            isMobile && sidebarOpen && "opacity-50"
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
};
