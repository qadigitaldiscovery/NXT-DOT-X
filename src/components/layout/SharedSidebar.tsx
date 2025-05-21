
import { useEffect, useState } from 'react';
import { MainSidebar } from './sidebar/MainSidebar/MainSidebar';
import { useModules } from '@/hooks/useModules';
import type { NavItem, NavCategory } from './sidebar/types';
import { 
  Home, 
  BarChart3, 
  Building, 
  FileText, 
  Settings, 
  Database, 
  FileUp, 
  ShoppingCart 
} from 'lucide-react';

const defaultHomeItem: NavItem = {
  label: 'Home',
  href: '/dashboard',
  icon: Home
};

export function SharedSidebar() {
  const { modules } = useModules();
  const [navigationCategories, setNavigationCategories] = useState<NavCategory[]>([]);

  useEffect(() => {
    // Convert modules to navigation categories
    if (!modules) return;

    // Map module types to icons
    const moduleIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
      'analytics': BarChart3,
      'suppliers': Building,
      'documents': FileText,
      'settings': Settings,
      'data': Database,
      'uploads': FileUp,
      'products': ShoppingCart,
      'default': Home
    };

    // Function to get icon for a module
    const getModuleIcon = (moduleType: string) => {
      return moduleIconMap[moduleType] || moduleIconMap.default;
    };

    // Group modules by their category
    const modulesByCategory = modules
      .filter(module => module.status === 'enabled')
      .reduce((acc: Record<string, any[]>, module) => {
        const category = module.category || 'Other';
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(module);
        return acc;
      }, {});

    // Convert to NavCategory array
    const categories: NavCategory[] = Object.entries(modulesByCategory).map(([categoryName, modulesInCategory]) => {
      return {
        name: categoryName,
        label: categoryName,
        items: modulesInCategory.map(module => ({
          label: module.name,
          href: `/modules/${module.id}`,
          icon: getModuleIcon(module.type || 'default')
        }))
      };
    });

    // Add data management section separately since it's a key section
    const dataManagementCategory: NavCategory = {
      name: 'Data Management',
      label: 'Data Management',
      items: [
        {
          label: 'Dashboard',
          href: '/data-management',
          icon: BarChart3
        },
        {
          label: 'Suppliers',
          href: '/data-management/suppliers',
          icon: Building
        },
        {
          label: 'Documents',
          href: '/data-management/documents',
          icon: FileText
        },
        {
          label: 'Uploads',
          href: '/data-management/uploads',
          icon: FileUp
        },
        {
          label: 'Settings',
          href: '/data-management/settings',
          icon: Settings
        }
      ]
    };

    // Ensure Data Management is at the top
    setNavigationCategories([dataManagementCategory, ...categories]);
  }, [modules]);

  return (
    <MainSidebar
      homeItem={defaultHomeItem}
      items={navigationCategories}
    />
  );
}
