
import { UnifiedSidebar } from './UnifiedSidebar';
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

export function SharedSidebar(props: any) {
  // For backward compatibility, just forward all props to UnifiedSidebar
  return (
    <UnifiedSidebar 
      homeItem={defaultHomeItem}
      useGlobalNavigation={true}
      moduleTitle="Data Management"
      {...props}
    />
  );
}
