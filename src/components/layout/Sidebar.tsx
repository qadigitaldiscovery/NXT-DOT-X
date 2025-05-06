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

// Organize nav items into categories
const navCategories: NavCategory[] = [
  { 
    name: "Overview",
    items: [
      { label: 'Dashboard', icon: Home, path: '/' }
    ]
  },
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
  const [openCategories, setOpenCategories] = React.useState<string[]>(["Overview"]);

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
          "fixed top-0 left-0 bottom-0 w-64 bg-sidebar z-30 shadow-lg flex flex-col transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-sidebar-primary flex items-center justify-center">
              <span className="text-white font-bold">NX</span>
            </div>
            <h1 className="text-lg font-bold text-white">NXT LEVEL TECH</h1>
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

        <nav className="flex-1 py-4 px-2 overflow-y-auto scrollbar-hide">
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

        <div className="p-4 border-t border-sidebar-border">
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
      </aside>

      {/* Toggle button - visible on all screen sizes */}
      <Button
        variant="outline"
        size="icon"
        onClick={onToggle}
        className={cn(
          "fixed z-40 rounded-full shadow-md bg-white",
          open 
            ? "left-60 bottom-4 transition-all duration-300" 
            : "left-4 bottom-4 transition-all duration-300",
        )}
      >
        {open ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </Button>
    </>
  );
};
