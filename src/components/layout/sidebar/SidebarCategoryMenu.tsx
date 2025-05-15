
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { NavCategory, NavItem } from './types';
import { ChevronDown, ChevronRight } from 'lucide-react';
import SidebarItem from './SidebarItem';

interface SidebarCategoryMenuProps {
  category: NavCategory;
  textColor?: string;
  textHoverColor?: string;
  activeBgColor?: string;
  activeTextColor?: string;
  iconColor?: string;
}

const SidebarCategoryMenu: React.FC<SidebarCategoryMenuProps> = ({
  category,
  textColor = 'text-gray-700 dark:text-gray-200',
  textHoverColor = 'hover:text-gray-900 dark:hover:text-white',
  activeBgColor = 'bg-gray-200 dark:bg-gray-700',
  activeTextColor = 'text-gray-900 dark:text-white',
  iconColor = 'text-gray-500 dark:text-gray-400',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Normalize items to ensure href is present
  const normalizedItems = category.items.map(item => ({
    ...item,
    href: item.href || item.path || '#' // Ensure href is always present
  }));

  const isActiveCategory = normalizedItems.some(
    (item) => item.href === location.pathname
  );

  return (
    <div className="mb-2">
      <button
        className={`flex items-center justify-between w-full px-3 py-2 rounded-md ${textColor} ${textHoverColor} transition-colors`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">{category.name}</span>
        {isOpen ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </button>

      {isOpen && (
        <div className="mt-1 ml-2 space-y-1">
          {normalizedItems.map((item) => (
            <SidebarItem
              key={item.href}
              item={item}
              isActive={location.pathname === item.href}
              textColor={textColor}
              textHoverColor={textHoverColor}
              activeBgColor={activeBgColor}
              activeTextColor={activeTextColor}
              iconColor={iconColor}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarCategoryMenu;
