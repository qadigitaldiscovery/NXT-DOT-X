
import { cn } from "@/lib/utils";
import { MainSidebarBackdrop } from "./MainSidebarBackdrop";
import { MainSidebarContent } from "./MainSidebarContent";

export interface MainSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
  items?: any[]; // Added for type compatibility
  homeItem?: any; // Added for type compatibility
  navItems?: any[]; // Added for type compatibility
  navCategories?: any[]; // Added for type compatibility
  showToggleButton?: boolean; // Added for type compatibility
  removeBottomToggle?: boolean; // Added for type compatibility
  initialState?: "expanded" | "collapsed"; // Added for type compatibility
  onStateChange?: (state: "expanded" | "collapsed") => void; // Added for type compatibility
  useGlobalNavigation?: boolean; // Added for type compatibility
  open?: boolean; // Added for type compatibility
  onToggle?: () => void; // Added for type compatibility
}

export function MainSidebar({ isOpen = false, onClose, className }: MainSidebarProps) {
  return (
    <>
      <MainSidebarBackdrop isOpen={isOpen} onClose={onClose} />
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-full w-72 flex-col border-r border-r-border bg-secondary transition-transform duration-300 ease-in-out dark:border-r-muted/50",
          isOpen ? "translate-x-0" : "-translate-x-full",
          className
        )}
      >
        <MainSidebarContent onClose={onClose} />
      </aside>
    </>
  );
}
