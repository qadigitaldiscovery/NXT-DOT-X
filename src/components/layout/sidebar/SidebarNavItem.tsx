
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
            "flex items-center justify-between px-4 py-4 rounded-md transition-colors text-xl cursor-pointer",
            textColor, textHoverColor, hoverBgColor
          )}
          onClick={() => onToggleExpand(item.label)}
        >
          <div className="flex items-center gap-4">
            <item.icon className="h-7 w-7" />
            <span>{item.label}</span>
          </div>
          {isExpanded ? 
            <ChevronDown className="h-6 w-6" /> : 
            <ChevronRight className="h-6 w-6" />
          }
        </div>
        {isExpanded && (
          <ul className="ml-10 space-y-2 mt-2">
            {item.children.map(child => (
              <li key={child.path}>
                <NavLink
                  to={child.path}
                  end
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-4 px-4 py-3 rounded-md transition-colors text-xl',
                      isActive
                        ? `${activeBgColor} ${activeTextColor} shadow-lg shadow-blue-900/30`
                        : `${textColor} ${textHoverColor} ${hoverBgColor}`
                    )
                  }
                >
                  <child.icon className="h-7 w-7" />
                  <span>{child.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  }

  return (
    <li key={item.path} className="my-2">
      <NavLink
        to={item.path}
        end
        className={({ isActive }) =>
          cn(
            'flex items-center gap-4 px-4 py-4 rounded-md transition-colors text-xl',
            isActive
              ? `${activeBgColor} ${activeTextColor} shadow-lg shadow-blue-900/30`
              : `${textColor} ${textHoverColor} ${hoverBgColor}`
          )
        }
      >
        <item.icon className="h-7 w-7" />
        <span>{item.label}</span>
      </NavLink>
    </li>
  );
};
