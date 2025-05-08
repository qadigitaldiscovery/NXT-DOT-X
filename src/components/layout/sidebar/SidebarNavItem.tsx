
import React from 'react';
import { cn } from '@/lib/utils';
import { NavLink } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';

type NavItem = {
  label: string;
  icon: React.ElementType;
  path: string;
  children?: NavItem[];
};

interface SidebarNavItemProps {
  item: NavItem;
  isExpanded: boolean;
  onToggleExpand: (label: string) => void;
  textColor: string;
  textHoverColor: string;
  activeBgColor: string;
  activeTextColor: string;
  hoverBgColor: string;
}

export const SidebarNavItem = ({
  item,
  isExpanded,
  onToggleExpand,
  textColor,
  textHoverColor,
  activeBgColor,
  activeTextColor,
  hoverBgColor
}: SidebarNavItemProps) => {
  if (item.children) {
    return (
      <li key={item.path}>
        <div 
          className={cn(
            "flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-300 cursor-pointer text-sm",
            textColor, textHoverColor, hoverBgColor
          )}
          onClick={() => onToggleExpand(item.label)}
        >
          <div className="flex items-center gap-3">
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </div>
          {isExpanded ? 
            <ChevronDown className="h-4 w-4" /> : 
            <ChevronRight className="h-4 w-4" />
          }
        </div>
        {isExpanded && (
          <ul className="ml-8 space-y-1 mt-1">
            {item.children.map(child => (
              <li key={child.path}>
                <NavLink
                  to={child.path}
                  end
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 text-sm',
                      isActive
                        ? `${activeBgColor} ${activeTextColor} shadow-md shadow-blue-900/30`
                        : `${textColor} ${textHoverColor} ${hoverBgColor}`
                    )
                  }
                >
                  <child.icon className="h-4 w-4" />
                  <span className="font-medium">{child.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  }

  // Ensure Home is at the bottom by checking the label
  const isHomeItem = item.label === "Home";
  
  return (
    <li key={item.path} className={cn("my-1", isHomeItem && "mt-auto")}>
      <NavLink
        to={item.path}
        end
        className={({ isActive }) =>
          cn(
            'flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 text-sm',
            isActive
              ? `${activeBgColor} ${activeTextColor} shadow-md shadow-indigo-900/50`
              : `${textColor} ${textHoverColor} ${hoverBgColor}`
          )
        }
      >
        <item.icon className="h-5 w-5" />
        <span className="font-medium">{item.label}</span>
      </NavLink>
    </li>
  );
};
