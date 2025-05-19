
import React from 'react';
import { Link } from 'react-router-dom';
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
  textColor = "text-gray-600",
  textHoverColor = "hover:text-gray-900",
  activeBgColor = "bg-gray-200",
  activeTextColor = "text-gray-900",
  hoverBgColor = "hover:bg-gray-100",
  onClick
}) => {
  const itemClasses = cn(
    "flex items-center px-3 py-2 rounded-md transition-colors",
    isActive ? activeTextColor : textColor,
    isActive ? activeBgColor : hoverBgColor,
    !isActive && textHoverColor
  );

  if (path) {
    return (
      <Link to={path} className={itemClasses} onClick={onClick}>
        {icon && <span className="mr-2">{icon}</span>}
        <span className="text-sm">{label}</span>
      </Link>
    );
  }

  return (
    <button className={itemClasses} onClick={onClick}>
      {icon && <span className="mr-2">{icon}</span>}
      <span className="text-sm">{label}</span>
    </button>
  );
};
