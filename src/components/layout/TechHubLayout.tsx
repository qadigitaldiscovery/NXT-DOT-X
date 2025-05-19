
import React from "react";
import { Outlet } from 'react-router-dom';
import { SharedNavbar } from './SharedNavbar';
import { Sidebar } from '@/components/ui/sidebar';

export function TechHubLayout({ children }: { children?: React.ReactNode }) {
  const handleMenuClick = () => {
    console.log('Menu clicked');
    // Implement menu toggle functionality if needed
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <div className="flex flex-1">
        <Sidebar className="border-r bg-white/80 backdrop-blur-sm">
          {/* Sidebar content can be added here if needed */}
        </Sidebar>
        <div className="flex-1 flex flex-col">
          <SharedNavbar onMenuClick={handleMenuClick} moduleTitle="Tech Hub" />
          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-7xl mx-auto">
              {children || <Outlet />}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
