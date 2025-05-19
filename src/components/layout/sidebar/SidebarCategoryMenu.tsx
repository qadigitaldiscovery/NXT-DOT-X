
import { useState } from 'react';
import { SidebarItem } from './SidebarItem';
import { NavItem } from './types';

interface SidebarCategoryMenuProps {
  title?: string;
  items: NavItem[];
  currentPath: string;
  userRole?: string;
}

export const SidebarCategoryMenu = ({
  title,
  items,
  currentPath
}: SidebarCategoryMenuProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mb-2">
      <div
        className="flex items-center justify-between p-2 rounded cursor-pointer hover:bg-gray-800/50"
        onClick={toggleExpand}
      >
        <span className="text-sm font-semibold text-gray-300">{title}</span>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${
            isExpanded ? 'rotate-90' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          ></path>
        </svg>
      </div>
      
      {isExpanded && (
        <ul className="mt-1 space-y-1">
          {items.map((item, index) => {
            const isActive = item.path === currentPath;
            const itemIcon = item.icon ? <item.icon className="w-5 h-5" /> : null;
            
            return (
              <li key={index} className="px-1">
                <SidebarItem
                  key={index}
                  label={item.label}
                  path={item.path}
                  icon={itemIcon}
                  isActive={isActive}
                  textColor="text-gray-400"
                  textHoverColor="hover:text-white"
                  activeBgColor="bg-blue-900/50"
                  activeTextColor="text-white"
                  hoverBgColor="hover:bg-gray-800/50"
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
