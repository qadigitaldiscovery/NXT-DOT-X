
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft, 
  ChevronRight, 
  Home, 
  BarChart3, 
  FileUp, 
  LineChart, 
  ArrowDownUp, 
  FileDown,
  Settings
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
}

interface NavItem {
  label: string;
  icon: React.ElementType;
  path: string;
}

interface NavCategory {
  name: string;
  items: NavItem[];
}

// Top level nav items (not in categories)
const topLevelNavItems: NavItem[] = [
  { label: 'Dashboard', icon: Home, path: '/' }
];

// Organize remaining nav items into categories
const navCategories: NavCategory[] = [
  {
    name: "Cost Management",
    items: [
      { label: 'Supplier Costing', icon: FileUp, path: '/supplier-costing' },
      { label: 'Cost Analysis', icon: BarChart3, path: '/cost-analysis' }
    ]
  },
  {
    name: "Pricing",
    items: [
      { label: 'Competitor Pricing', icon: LineChart, path: '/competitor-pricing' },
      { label: 'Price Management', icon: ArrowDownUp, path: '/price-management' }
    ]
  },
  {
    name: "Data",
    items: [
      { label: 'Export Data', icon: FileDown, path: '/export-data' }
    ]
  }
];

export const Sidebar = ({ open, onToggle }: SidebarProps) => {
  const isMobile = useIsMobile();
  const [openCategories, setOpenCategories] = React.useState<string[]>(["Cost Management"]);

  const handleCategoryToggle = (category: string) => {
    setOpenCategories(prev => 
      prev.includes(category) 
        ? prev.filter(cat => cat !== category) 
        : [...prev, category]
    );
  };

  return (
    <>
      {/* Mobile backdrop */}
      {open && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed md:sticky top-0 left-0 h-screen bg-sidebar z-30 shadow-lg flex flex-col transition-all duration-300 ease-in-out",
          open && !isMobile ? "w-64" : open && isMobile ? "w-64" : "w-0 md:w-16",
          isMobile && !open && "-translate-x-full",
          isMobile && open && "translate-x-0"
        )}
      >
        <div className={cn(
          "flex items-center justify-between p-4 border-b border-sidebar-border",
          !open && "md:justify-center"
        )}>
          <div className={cn(
            "flex items-center space-x-2",
            !open && "md:hidden"
          )}>
            <div className="h-8 w-8 rounded-full bg-sidebar-primary flex items-center justify-center">
              <span className="text-white font-bold">NX</span>
            </div>
            <h1 className="text-lg font-bold text-white truncate">NXT LEVEL TECH</h1>
          </div>
          
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="text-sidebar-foreground md:hidden"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          )}
        </div>

        {/* Full sidebar navigation - visible when open */}
        <nav className={cn(
          "flex-1 py-4 px-2 overflow-y-auto scrollbar-hide",
          !open && "md:hidden"
        )}>
          {/* Top level navigation items */}
          <ul className="space-y-1 mb-4">
            {topLevelNavItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => cn(
                    "flex items-center gap-3 px-4 py-3 rounded-md transition-colors",
                    isActive 
                      ? "bg-sidebar-primary text-white" 
                      : "text-sidebar-foreground hover:bg-sidebar-accent"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
          
          {/* Categorized navigation items */}
          <Accordion 
            type="multiple" 
            value={openCategories}
            className="space-y-1"
          >
            {navCategories.map((category) => (
              <AccordionItem 
                key={category.name} 
                value={category.name}
                className="border-none"
              >
                <AccordionTrigger 
                  className="py-2 px-3 rounded-md hover:bg-sidebar-accent hover:no-underline text-sidebar-foreground"
                  onClick={() => handleCategoryToggle(category.name)}
                >
                  <span className="text-sm font-medium">{category.name}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-0 pt-1">
                  <ul className="space-y-1 pl-2">
                    {category.items.map((item) => (
                      <li key={item.path}>
                        <NavLink
                          to={item.path}
                          className={({ isActive }) => cn(
                            "flex items-center gap-3 px-4 py-3 rounded-md transition-colors",
                            isActive 
                              ? "bg-sidebar-primary text-white" 
                              : "text-sidebar-foreground hover:bg-sidebar-accent"
                          )}
                        >
                          <item.icon className="h-5 w-5" />
                          <span>{item.label}</span>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </nav>

        {/* Icons only sidebar for collapsed state on desktop */}
        <div className={cn(
          "hidden md:flex flex-col items-center py-4 space-y-6",
          open && "md:hidden"
        )}>
          {/* Top level nav items first */}
          {topLevelNavItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "w-10 h-10 flex items-center justify-center rounded-md",
                isActive 
                  ? "bg-sidebar-primary text-white" 
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              )}
              title={item.label}
            >
              <item.icon className="h-5 w-5" />
            </NavLink>
          ))}
          
          {/* Then all the category items flattened */}
          {navCategories.flatMap(category => 
            category.items.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => cn(
                  "w-10 h-10 flex items-center justify-center rounded-md",
                  isActive 
                    ? "bg-sidebar-primary text-white" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                )}
                title={item.label}
              >
                <item.icon className="h-5 w-5" />
              </NavLink>
            ))
          )}
        </div>

        <div className={cn(
          "p-4 border-t border-sidebar-border",
          !open && "md:hidden"
        )}>
          <NavLink
            to="/settings"
            className={({ isActive }) => cn(
              "flex items-center justify-center gap-2 w-full px-4 py-2 rounded-md transition-colors",
              isActive 
                ? "bg-sidebar-primary text-white" 
                : "bg-sidebar-accent text-sidebar-foreground border-sidebar-border hover:bg-sidebar-primary hover:text-white"
            )}
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </NavLink>
        </div>
        
        {/* Settings icon for collapsed state */}
        <div className={cn(
          "hidden md:flex justify-center p-4 border-t border-sidebar-border",
          open && "md:hidden"
        )}>
          <NavLink
            to="/settings"
            className={({ isActive }) => cn(
              "w-10 h-10 flex items-center justify-center rounded-md",
              isActive 
                ? "bg-sidebar-primary text-white" 
                : "text-sidebar-foreground hover:bg-sidebar-accent"
            )}
            title="Settings"
          >
            <Settings className="h-5 w-5" />
          </NavLink>
        </div>
      </aside>

      {/* Toggle button - visible on all screen sizes */}
      <Button
        variant="outline"
        size="icon"
        onClick={onToggle}
        className={cn(
          "fixed z-40 rounded-full shadow-md bg-white",
          isMobile ? "left-4 bottom-4" : open ? "left-60 bottom-4" : "left-16 bottom-4",
        )}
      >
        {open ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </Button>
    </>
  );
};
