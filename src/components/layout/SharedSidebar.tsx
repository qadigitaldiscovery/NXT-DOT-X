import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  Menu as MenuIcon,
  Home as HomeIcon,
  BarChart3,
  FileUp,
  LineChart,
  ArrowDownUp,
  FileDown,
  FileText,
  Settings as SettingsIcon,
  FileBarChart2,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

// Unified nav structure
const unifiedNav = [
  {
    label: 'Dashboard',
    icon: HomeIcon,
    path: '/',
  },
  {
    label: 'Cost Management',
    children: [
      { label: 'Supplier Costing', icon: FileUp, path: '/supplier-costing' },
      { label: 'Cost Analysis', icon: BarChart3, path: '/cost-analysis' },
    ],
  },
  {
    label: 'Pricing',
    children: [
      { label: 'Competitor Pricing', icon: LineChart, path: '/competitor-pricing' },
      { label: 'Price Management', icon: ArrowDownUp, path: '/price-management' },
    ],
  },
  {
    label: 'Data',
    children: [
      { label: 'Export Data', icon: FileDown, path: '/export-data' },
    ],
  },
  {
    label: 'Reports',
    icon: FileBarChart2,
    path: '/reports',
  },
  {
    label: 'Settings',
    icon: SettingsIcon,
    path: '/settings',
  },
];

type NavItem = {
  label: string;
  icon: React.ElementType;
  path: string;
  children?: NavItem[];
};

type NavCategory = {
  name: string;
  items: NavItem[];
};

type SharedSidebarProps = {
  open: boolean;
  onToggle: () => void;
  navItems?: NavCategory[]; // Make navItems optional
};

// Accept navItems as a prop for custom menus
export const SharedSidebar = ({ open, onToggle, navItems }: SharedSidebarProps) => {
  const isMobile = useIsMobile();
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);
  const sidebarBgColor = 'bg-slate-800';
  const textColor = 'text-gray-300';
  const textHoverColor = 'hover:text-white';
  const activeBgColor = 'bg-blue-600';
  const activeTextColor = 'text-white';
  const headerTextColor = 'text-white';
  const hoverBgColor = 'hover:bg-slate-700';

  // Use navItems if provided, otherwise use unifiedNav
  const menu = navItems || unifiedNav;

  const toggleExpanded = (label: string) => {
    setExpandedItems(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label) 
        : [...prev, label]
    );
  };

  const isExpanded = (label: string) => {
    return expandedItems.includes(label);
  };

  return (
    <>
      {/* Mobile backdrop - Keep or remove based on preference */}
      {open && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={onToggle}
        />
      )}

      <aside 
        className={cn(
          "fixed md:sticky top-0 left-0 h-screen z-30 shadow-lg flex flex-col transition-all duration-300 ease-in-out", // Use transition-all for width too
          sidebarBgColor,
          open ? "w-60" : "w-0 md:w-20", // Use w-20 (80px) for collapsed to fit icons + padding
          isMobile && !open && "-translate-x-full",
          isMobile && open && "translate-x-0"
        )}
      >
        {/* Sidebar Header with Text and Toggle */}
        <div className={cn(
          "flex items-center justify-between p-4 h-16", // Use justify-between
        )}>
          {/* Render Title only when open */}
          {open && (
            <h1 className={cn("text-xl font-bold whitespace-nowrap", headerTextColor)}>
              NXT DOT-X
            </h1>
          )}
          {/* Toggle Button is always rendered, but margin/position might adjust if needed */}
          {/* On desktop, it should be visible even when closed to allow reopening */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            // Adjust margin/position based on open state if needed
            className={cn(headerTextColor, textHoverColor, open ? "ml-2" : "mx-auto")}
          >
            {isMobile ? (
              <ChevronLeft className="h-5 w-5" />
            ) : ( 
              // Show different icons based on open state for desktop toggle
              open ? <ChevronLeft className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" /> 
            )}
          </Button>
        </div>

        {/* Full Navigation List (Visible when open) */}
        <nav className={cn(
          "flex-1 py-4 px-2 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-700",
          !open && "hidden" // Hide when sidebar is collapsed
        )}>
          <ul className="space-y-1">
            {menu.map((item) =>
              item.items || item.children ? (
                <li key={item.name || item.label}>
                  <div className="px-3 py-2 text-xs font-semibold uppercase text-gray-400 tracking-wider">
                    {item.name || item.label}
                  </div>
                  <ul className="space-y-1 mb-2">
                    {(item.items || []).map((sub) => (
                      sub.children ? (
                        <li key={sub.path}>
                          <div className="flex items-center justify-between px-3 py-2 rounded-md transition-colors text-sm cursor-pointer"
                               onClick={() => toggleExpanded(sub.label)}
                               className={cn(textColor, textHoverColor, hoverBgColor)}>
                            <div className="flex items-center gap-3">
                              <sub.icon className="h-5 w-5" />
                              <span>{sub.label}</span>
                            </div>
                            {isExpanded(sub.label) ? 
                              <ChevronDown className="h-4 w-4" /> : 
                              <ChevronRight className="h-4 w-4" />
                            }
                          </div>
                          {isExpanded(sub.label) && (
                            <ul className="ml-8 space-y-1 mt-1">
                              {sub.children.map(child => (
                                <li key={child.path}>
                                  <NavLink
                                    to={child.path}
                                    end
                                    className={({ isActive }) =>
                                      cn(
                                        'flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm',
                                        isActive
                                          ? `${activeBgColor} ${activeTextColor}`
                                          : `${textColor} ${textHoverColor} hover:bg-slate-700`
                                      )
                                    }
                                  >
                                    <child.icon className="h-5 w-5" />
                                    <span>{child.label}</span>
                                  </NavLink>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ) : (
                        <li key={sub.path}>
                          <NavLink
                            to={sub.path}
                            end
                            className={({ isActive }) =>
                              cn(
                                'flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm',
                                isActive
                                  ? `${activeBgColor} ${activeTextColor}`
                                  : `${textColor} ${textHoverColor} hover:bg-slate-700`
                              )
                            }
                          >
                            <sub.icon className="h-5 w-5" />
                            <span>{sub.label}</span>
                          </NavLink>
                        </li>
                      )
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm',
                        isActive
                          ? `${activeBgColor} ${activeTextColor}`
                          : `${textColor} ${textHoverColor} hover:bg-slate-700`
                      )
                    }
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              )
            )}
          </ul>
        </nav>

        {/* Icon-Only Navigation (Visible when collapsed on desktop) */}
        <div className={cn(
          "flex-1 flex-col items-center pt-4 space-y-2 overflow-y-auto scrollbar-hide", // Added pt-4 for spacing from header
          open ? "hidden" : "hidden md:flex" 
        )}>
          {menu.map((item) =>
            (item.items || item.children)
              ? (item.items || []).map((sub) => (
                  <NavLink
                    key={sub.path + '-icon'}
                    to={sub.path}
                    end
                    className={({ isActive }) =>
                      cn(
                        'w-12 h-12 flex items-center justify-center rounded-md transition-colors',
                        isActive ? `${activeBgColor} ${activeTextColor}` : `${textColor} ${hoverBgColor}`
                      )
                    }
                    title={sub.label}
                  >
                    <sub.icon className="h-5 w-5" />
                  </NavLink>
                ))
              : (
                <NavLink
                  key={item.path + '-icon'}
                  to={item.path}
                  end
                  className={({ isActive }) =>
                    cn(
                      'w-12 h-12 flex items-center justify-center rounded-md transition-colors',
                      isActive ? `${activeBgColor} ${activeTextColor}` : `${textColor} ${hoverBgColor}`
                    )
                  }
                  title={item.label}
                >
                  <item.icon className="h-5 w-5" />
                </NavLink>
              )
          )}
        </div>

        {/* Footer can be empty or used later */}
        <div className="mt-auto h-10"></div> {/* Empty footer placeholder or for future use */}

      </aside>
    </>
  );
};
