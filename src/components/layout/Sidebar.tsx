
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
  FileDown
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
}

interface NavItem {
  label: string;
  icon: React.ElementType;
  path: string;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: Home, path: '/' },
  { label: 'Supplier Costing', icon: FileUp, path: '/supplier-costing' },
  { label: 'Cost Analysis', icon: BarChart3, path: '/cost-analysis' },
  { label: 'Competitor Pricing', icon: LineChart, path: '/competitor-pricing' },
  { label: 'Price Management', icon: ArrowDownUp, path: '/price-management' },
  { label: 'Export Data', icon: FileDown, path: '/export-data' },
];

export const Sidebar = ({ open, onToggle }: SidebarProps) => {
  const isMobile = useIsMobile();

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
      <div 
        className={cn(
          "fixed top-0 left-0 bottom-0 w-64 bg-sidebar z-30 shadow-lg flex flex-col transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full",
          "md:relative md:translate-x-0"
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
          <ul className="space-y-1">
            {navItems.map((item) => (
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
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full bg-sidebar-accent text-sidebar-foreground border-sidebar-border hover:bg-sidebar-primary hover:text-white"
          >
            Settings
          </Button>
        </div>
      </div>

      {/* Sidebar toggle button for desktop */}
      {!isMobile && (
        <Button
          variant="outline"
          size="icon"
          onClick={onToggle}
          className={cn(
            "fixed bottom-4 left-64 z-30 rounded-full shadow-md transition-transform duration-300",
            !open && "left-4 transform rotate-180"
          )}
        >
          {open ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      )}
    </>
  );
};
