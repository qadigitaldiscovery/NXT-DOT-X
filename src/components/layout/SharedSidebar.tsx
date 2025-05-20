
import { useEffect, useState } from 'react';
import { MainSidebar } from './sidebar/MainSidebar/MainSidebar';
import { useModules } from '@/hooks/useModules';
import type { NavItem, NavCategory } from './sidebar/types';
import { Home } from 'lucide-react';

const defaultHomeItem: NavItem = {
  label: 'Home',
  href: '/dashboard',
  icon: Home
};

export function SharedSidebar() {
  const { modules } = useModules();
  const [navigationCategories, setNavigationCategories] = useState<NavCategory[]>([]);

  useEffect(() => {
    // Convert modules to navigation items
    const items: NavItem[] = modules
      .filter(module => module.status === 'enabled')
      .map(module => ({
        label: module.name,
        href: `/modules/${module.id}`,
        // Since module.icon is a string, we'll need to handle icon mapping in a real implementation
        // For now, we'll use Home as a default icon
        icon: Home
      }));

    // Create a single category containing all items
    const categories: NavCategory[] = [{
      name: 'Modules',
      label: 'Modules',
      items: items
    }];

    setNavigationCategories(categories);
  }, [modules]);

  return (
    <MainSidebar
      homeItem={defaultHomeItem}
      items={navigationCategories}
    />
  );
}
