
import React from 'react';
import { Outlet } from 'react-router-dom';

export function NoSidebarLayout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default NoSidebarLayout;
