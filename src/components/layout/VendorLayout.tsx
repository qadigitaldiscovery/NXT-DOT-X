
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ChevronRight, Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import type { SidebarItem } from '@/types/vendor';

// Define sidebar menu items with proper icon types
const sidebarMenu: SidebarItem[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: Menu,
    path: "/vendors/dashboard",
  },
  {
    id: "vendors",
    title: "Vendors",
    icon: Menu,
    path: "/vendors",
  },
  {
    id: "reports",
    title: "Reports",
    icon: Menu,
    path: "/vendors/reports",
  }
];

export const VendorLayout = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const isMobile = useIsMobile();

  React.useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-gray-900 text-gray-100 transition-all duration-300 ease-in-out fixed inset-y-0 left-0 z-10 md:relative",
          sidebarOpen ? "w-64" : "w-0 md:w-16"
        )}
      >
        {/* Sidebar header */}
        <div className="h-16 flex items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            {sidebarOpen && (
              <span className="text-xl font-semibold">Healthcare</span>
            )}
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:block hidden text-gray-400 hover:text-white"
          >
            <ChevronRight className={cn("h-5 w-5 transition-transform", !sidebarOpen && "rotate-180")} />
          </button>
        </div>

        {/* Sidebar content */}
        <div className="overflow-y-auto h-[calc(100vh-64px)]">
          <nav className="px-2 py-4">
            <ul className="space-y-1">
              {sidebarMenu.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.path}
                    className="flex items-center py-2 px-3 text-sm rounded hover:bg-gray-800"
                  >
                    {item.icon && <item.icon className="h-5 w-5 mr-3" />}
                    {sidebarOpen && <span>{item.title}</span>}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm h-16 flex items-center px-4 md:px-6">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden text-gray-500 hover:text-gray-700 mr-4"
          >
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          <h1 className="text-xl font-semibold">Healthcare Supplier Dashboard</h1>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
