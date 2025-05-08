
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
            "flex items-center justify-between px-5 py-5 rounded-lg transition-all duration-300 cursor-pointer text-2xl",
            textColor, textHoverColor, hoverBgColor
          )}
          onClick={() => onToggleExpand(item.label)}
        >
          <div className="flex items-center gap-5">
            <item.icon className="h-10 w-10" />
            <span className="font-mono tracking-wide text-xl">{item.label}</span>
          </div>
          {isExpanded ? 
            <ChevronDown className="h-8 w-8" /> : 
            <ChevronRight className="h-8 w-8" />
          }
        </div>
        {isExpanded && (
          <ul className="ml-14 space-y-3 mt-3">
            {item.children.map(child => (
              <li key={child.path}>
                <NavLink
                  to={child.path}
                  end
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-5 px-5 py-4 rounded-lg transition-all duration-300 text-xl',
                      isActive
                        ? `${activeBgColor} ${activeTextColor} shadow-lg shadow-blue-900/30`
                        : `${textColor} ${textHoverColor} ${hoverBgColor}`
                    )
                  }
                >
                  <child.icon className="h-9 w-9" />
                  <span className="font-mono text-lg">{child.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  }

  return (
    <li key={item.path} className="my-3">
      <NavLink
        to={item.path}
        end
        className={({ isActive }) =>
          cn(
            'flex items-center gap-5 px-5 py-5 rounded-lg transition-all duration-300 text-xl',
            isActive
              ? `${activeBgColor} ${activeTextColor} shadow-lg shadow-indigo-900/50`
              : `${textColor} ${textHoverColor} ${hoverBgColor}`
          )
        }
      >
        <item.icon className="h-10 w-10" />
        <span className="font-mono tracking-wide text-xl">{item.label}</span>
      </NavLink>
    </li>
  );
};
