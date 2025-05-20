
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface SidebarItemProps {
  label: string;
  path?: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  textColor?: string;
  textHoverColor?: string;
  activeBgColor?: string;
  activeTextColor?: string;
  hoverBgColor?: string;
  onClick?: () => void;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  path,
  icon,
  isActive = false,
  textColor = "text-blue-100",
  textHoverColor = "hover:text-white",
  activeBgColor = "bg-blue-800/50",
  activeTextColor = "text-white",
  hoverBgColor = "hover:bg-blue-900/50",
  onClick
}) => {
  const itemClasses = cn(
    "flex items-center px-3 py-2 rounded-md transition-colors",
    isActive ? activeTextColor : textColor,
    isActive ? activeBgColor : hoverBgColor,
    !isActive && textHoverColor,
    "hover:underline"
  );

  if (path) {
    return (
      <NavLink to={path} className={itemClasses} onClick={onClick} aria-label={label}>
        {icon && <span className="mr-2" aria-hidden="true">{icon}</span>}
        <span className="text-sm">{label}</span>
      </NavLink>
    );
  }

  return (
    <a 
      href="#"
      className={itemClasses} 
      onClick={(e) => {
        e.preventDefault();
        if (onClick) onClick();
      }}
      aria-label={label}
    >
      {icon && <span className="mr-2" aria-hidden="true">{icon}</span>}
      <span className="text-sm">{label}</span>
    </a>
  );
};
