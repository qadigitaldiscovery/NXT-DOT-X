
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
            "flex items-center justify-between px-4 py-3 rounded-md transition-colors text-lg cursor-pointer",
            textColor, textHoverColor, hoverBgColor
          )}
          onClick={() => onToggleExpand(item.label)}
        >
          <div className="flex items-center gap-3">
            <item.icon className="h-6 w-6" />
            <span>{item.label}</span>
          </div>
          {isExpanded ? 
            <ChevronDown className="h-5 w-5" /> : 
            <ChevronRight className="h-5 w-5" />
          }
        </div>
        {isExpanded && (
          <ul className="ml-9 space-y-2 mt-2">
            {item.children.map(child => (
              <li key={child.path}>
                <NavLink
                  to={child.path}
                  end
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-4 py-3 rounded-md transition-colors text-lg',
                      isActive
                        ? `${activeBgColor} ${activeTextColor}`
                        : `${textColor} ${textHoverColor} ${hoverBgColor}`
                    )
                  }
                >
                  <child.icon className="h-6 w-6" />
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
    <li key={item.path}>
      <NavLink
        to={item.path}
        end
        className={({ isActive }) =>
          cn(
            'flex items-center gap-3 px-4 py-3 rounded-md transition-colors text-lg',
            isActive
              ? `${activeBgColor} ${activeTextColor}`
              : `${textColor} ${textHoverColor} ${hoverBgColor}`
          )
        }
      >
        <item.icon className="h-6 w-6" />
        <span>{item.label}</span>
      </NavLink>
    </li>
  );
};
