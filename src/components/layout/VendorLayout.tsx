
import React, { useState } from 'react';
import { BarChart3, FilePlus, Search, Package, FileSpreadsheet, Settings } from 'lucide-react';
import { SharedSidebar } from './SharedSidebar';
import { SharedNavbar } from './SharedNavbar';

interface SidebarItem {
  id: string;
  label: string;
  icon: any;
  path: string;
}

export const VendorLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const vendorNavItems: SidebarItem[] = [
    {
      id: 'overview',
      label: 'Overview',
      icon: BarChart3,
      path: '/vendors'
    },
    {
      id: 'add',
      label: 'Add New Vendor',
      icon: FilePlus,
      path: '/vendors/add'
    },
    {
      id: 'search',
      label: 'Search Vendors',
      icon: Search,
      path: '/vendors/search'
    },
    {
      id: 'products',
      label: 'Vendor Products',
      icon: Package,
      path: '/vendors/products'
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: FileSpreadsheet,
      path: '/vendors/reports'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      path: '/vendors/settings'
    }
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <SharedSidebar 
        open={sidebarOpen} 
        onToggle={toggleSidebar}
        navItems={vendorNavItems.map(item => ({
          id: item.id,
          label: item.label,
          icon: item.icon,
          path: item.path,
          items: []
        }))}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <SharedNavbar 
          onMenuClick={toggleSidebar}
          moduleTitle="Vendor Management"
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="container mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
