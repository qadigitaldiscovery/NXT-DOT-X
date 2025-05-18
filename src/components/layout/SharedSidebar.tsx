
// Updated import statements, removing unused ones
import React from 'react';
import { useLocation } from 'react-router-dom';
import { MainSidebar } from './sidebar/MainSidebar';
import { NavCategory } from './sidebar/types';

interface SharedSidebarProps {
  open?: boolean;
  onToggle?: () => void;
  navItems?: any[];
  navCategories?: NavCategory[];
  items?: any[];
  homeItem?: any;
  className?: string;
  removeBottomToggle?: boolean;
  showToggleButton?: boolean;
  initialState?: 'expanded' | 'collapsed';
  onStateChange?: (state: 'expanded' | 'collapsed') => void;
}

export const SharedSidebar: React.FC<SharedSidebarProps> = ({
  open,
  onToggle,
  navItems,
  navCategories,
  items,
  homeItem,
  className,
  removeBottomToggle,
  showToggleButton,
  initialState,
  onStateChange,
}) => {
  const location = useLocation();

  return (
    <MainSidebar
      open={open}
      onToggle={onToggle}
      navItems={navItems}
      navCategories={navCategories}
      items={items}
      homeItem={homeItem}
      className={className}
      removeBottomToggle={removeBottomToggle}
      showToggleButton={showToggleButton}
      initialState={initialState}
      onStateChange={onStateChange}
    />
  );
};
