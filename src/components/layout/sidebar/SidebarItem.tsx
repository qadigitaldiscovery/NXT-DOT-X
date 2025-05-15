
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SidebarItemProps } from './types';

export const SidebarItem = ({
  item,
  isActive,
  onClick,
  textColor,
  textHoverColor,
  activeBgColor,
  activeTextColor,
  hoverBgColor,
  hasChildren,
  isExpanded
}: SidebarItemProps) => {
  // Use href property with path as fallback for backwards compatibility
  const to = item.href || item.path || '#';
  
  // Handle the icon rendering safely
  const renderIcon = () => {
    const Icon = item.icon;
    if (typeof Icon === 'function') {
      return <Icon className="h-5 w-5 mr-2" />;
    } else {
      return <span className="mr-2">{Icon}</span>;
    }
  };

  const renderContent = () => (
    <>
      <span className="flex items-center flex-1">
        {renderIcon()}
        <span>{item.label}</span>
      </span>
      {hasChildren && (
        <span className="ml-auto">
          {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </span>
      )}
    </>
  );

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={onClick}
          className={cn(
            "flex items-center w-full py-2 px-3 rounded-md transition-colors duration-150",
            textColor,
            textHoverColor,
            hoverBgColor,
            isActive && `${activeBgColor} ${activeTextColor}`
          )}
        >
          {renderContent()}
        </button>
        {isExpanded && item.children && (
          <div className="pl-4 mt-1 space-y-1">
            {item.children.map((child) => (
              <NavLink
                key={child.label}
                to={child.href || child.path || '#'}
                className={({ isActive }) =>
                  cn(
                    "flex items-center py-2 px-3 rounded-md transition-colors duration-150",
                    textColor,
                    textHoverColor,
                    hoverBgColor,
                    isActive && `${activeBgColor} ${activeTextColor}`
                  )
                }
              >
                {typeof child.icon === 'function' ? (
                  <child.icon className="h-4 w-4 mr-2" />
                ) : (
                  <span className="mr-2">{child.icon}</span>
                )}
                <span className="text-sm">{child.label}</span>
              </NavLink>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <NavLink
      to={to}
      className={({ isActive: linkActive }) =>
        cn(
          "flex items-center py-2 px-3 rounded-md transition-colors duration-150",
          textColor,
          textHoverColor,
          hoverBgColor,
          (isActive || linkActive) && `${activeBgColor} ${activeTextColor}`
        )
      }
    >
      {renderContent()}
    </NavLink>
  );
};

export default SidebarItem;
