
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
  const Icon = item.icon;
  const path = item.path || item.href || '#';

  const renderContent = () => (
    <>
      <span className="flex items-center flex-1">
        {Icon && <Icon className="h-5 w-5 mr-2" />}
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
                to={child.path || child.href || '#'}
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
                {child.icon && <child.icon className="h-4 w-4 mr-2" />}
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
      to={path}
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
