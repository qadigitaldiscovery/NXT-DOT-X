
import { cn } from "@/lib/utils";
import { MainSidebarBackdrop } from "./MainSidebarBackdrop";
import { MainSidebarContent } from "./MainSidebarContent";
import { MainSidebarCollapsed } from "./MainSidebarCollapsed";
import { useIsMobile } from "@/hooks/use-mobile";

export interface MainSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
  
  // Navigation props
  navItems?: any[]; 
  navCategories?: any[];
  items?: any[];
  homeItem?: any;
  
  // Control props
  showToggleButton?: boolean;
  removeBottomToggle?: boolean;
  initialState?: "expanded" | "collapsed";
  onStateChange?: (state: "expanded" | "collapsed") => void;
  useGlobalNavigation?: boolean;
  
  // Backward compatibility props
  open?: boolean;
  onToggle?: () => void;
}

export function MainSidebar({ 
  isOpen = false, 
  onClose,
  open, 
  onToggle,
  className,
  navItems = [],
  navCategories = [],
  items = [],
  homeItem,
  showToggleButton = false,
  removeBottomToggle = false,
  initialState,
  onStateChange,
  useGlobalNavigation = false
}: MainSidebarProps) {
  const isMobile = useIsMobile();
  
  // Use either the new or old prop naming for consistency
  const sidebarOpen = open !== undefined ? open : isOpen;
  const handleClose = onClose || onToggle;

  return (
    <>
      <MainSidebarBackdrop isOpen={sidebarOpen} onClose={handleClose} />
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 flex h-full flex-col transition-transform duration-300 ease-in-out",
          "md:sticky md:border-r md:border-r-sidebar-border",
          sidebarOpen ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0 md:w-16",
          className
        )}
      >
        {/* Full sidebar content when expanded */}
        {(sidebarOpen || !isMobile) && (
          <MainSidebarContent 
            onClose={handleClose} 
            navCategories={navCategories}
            navItems={navItems}
            items={items}
            homeItem={homeItem}
            useGlobalNavigation={useGlobalNavigation}
          />
        )}
        
        {/* Icon-Only sidebar content when collapsed and on desktop */}
        {!sidebarOpen && !isMobile && (
          <MainSidebarCollapsed 
            navCategories={navCategories}
            navItems={navItems}
            items={items} 
            homeItem={homeItem}
            useGlobalNavigation={useGlobalNavigation}
          />
        )}
      </aside>
    </>
  );
}
