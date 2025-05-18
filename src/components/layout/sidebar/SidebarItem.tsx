import React from 'react';
import { cn } from "@/lib/utils";
import { NavLink } from 'react-router-dom';

interface SidebarItemProps {
  label: string;
  path?: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  textColor?: string;
  activeBgColor?: string;
  activeTextColor?: string;
  hoverBgColor?: string;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  path,
  icon,
  isActive = false,
  onClick,
  textColor = "text-gray-400",
  activeBgColor = "bg-blue-900/50",
  activeTextColor = "text-white",
  hoverBgColor = "hover:bg-gray-800/50"
}) => {
  return (
    path ? (
      <NavLink
        to={path}
        className={({ isActive: navLinkIsActive }) =>
          cn(
            "flex items-center w-full p-2 text-sm font-medium rounded-md transition-colors",
            textColor,
            hoverBgColor,
            isActive || navLinkIsActive ? activeBgColor : null,
            isActive || navLinkIsActive ? activeTextColor : null
          )
        }
      >
        {icon && <span className="mr-2">{icon}</span>}
        {label}
      </NavLink>
    ) : (
      <button
        onClick={onClick}
        className={cn(
          "flex items-center w-full p-2 text-sm font-medium rounded-md transition-colors",
          textColor,
          hoverBgColor,
          isActive ? activeBgColor : null,
          isActive ? activeTextColor : null
        )}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {label}
      </button>
    )
  );
};
