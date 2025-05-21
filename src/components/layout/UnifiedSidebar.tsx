
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { NavCategory, NavItem } from './sidebar/types';
import { useSidebar } from '@/context/SidebarContext';
import { SidebarMobileBackdrop } from './sidebar/unified/SidebarMobileBackdrop';
import { SidebarHeader } from './sidebar/unified/SidebarHeader';
import { ExpandedSidebarContent } from './sidebar/unified/ExpandedSidebarContent';
import { CollapsedSidebarContent } from './sidebar/unified/CollapsedSidebarContent';
import { useNavigation } from './sidebar/unified/useNavigation';
import { navCategories } from './sidebar/NavigationConfig';

export interface UnifiedSidebarProps {
  isOpen?: boolean;
  onToggle?: () => void;
  items?: NavCategory[];
  homeItem?: NavItem;
  moduleTitle?: string;
  useGlobalNavigation?: boolean;
}

export function UnifiedSidebar({
  isOpen: propIsOpen,
  onToggle: propOnToggle,
  items = [],
  homeItem,
  moduleTitle = 'Navigation',
  useGlobalNavigation = false
}: UnifiedSidebarProps) {
  const isMobile = useIsMobile();
  
  // Use the context if available, otherwise use props
  const sidebarContext = useSidebar();
  const isOpen = propIsOpen !== undefined ? propIsOpen : sidebarContext?.isOpen;
  const onToggle = propOnToggle || sidebarContext?.toggle;
  
  // Determine which navigation to use
  const effectiveNavItems = useGlobalNavigation ? navCategories : items;
  
  // Use our custom navigation hook
  const { 
    expandedCategories, 
    setExpandedCategories, 
    isItemActive, 
    handleItemClick 
  } = useNavigation();

  return (
    <>
      {/* Mobile backdrop */}
      <SidebarMobileBackdrop 
        isOpen={!!isOpen && isMobile} 
        onClose={() => onToggle?.()}
      />
      
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-full flex-col transition-transform duration-300 ease-in-out bg-gray-900",
          "md:sticky md:border-r md:border-r-gray-800",
          isOpen ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0 md:w-16"
        )}
      >
        {/* Sidebar Header */}
        <SidebarHeader 
          isOpen={!!isOpen} 
          onToggle={() => onToggle?.()} 
          moduleTitle={moduleTitle} 
        />
        
        {/* Sidebar Content - Expanded View */}
        <div className={cn(
          "flex-1 overflow-auto bg-gray-900 text-white",
          !isOpen && "hidden md:hidden"
        )}>
          <ExpandedSidebarContent 
            homeItem={homeItem}
            navItems={effectiveNavItems}
            expandedCategories={expandedCategories}
            setExpandedCategories={setExpandedCategories}
            isItemActive={isItemActive}
            handleItemClick={(item) => handleItemClick(item, onToggle, isMobile)}
            isMobile={isMobile}
          />
        </div>
        
        {/* Sidebar Content - Collapsed View (Icon Only) */}
        {!isOpen && !isMobile && (
          <CollapsedSidebarContent 
            homeItem={homeItem}
            navItems={effectiveNavItems}
            isItemActive={isItemActive}
            handleItemClick={(item) => handleItemClick(item, onToggle, isMobile)}
          />
        )}
      </aside>
    </>
  );
}
