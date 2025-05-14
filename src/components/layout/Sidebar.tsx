import React from 'react';
import { Link } from 'react-router-dom';

export const Sidebar = () => {
  return (
    <aside className="w-64 h-full bg-dockred-dark text-white flex flex-col justify-between p-4">
      <nav className="space-y-4">
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/dashboard-v2" className="hover:underline">New Dashboard</Link>
        <Link to="/projects" className="hover:underline">Projects</Link>
      </nav>
      <div className="space-y-2">
        <Link to="/settings" className="text-sm text-gray-300 hover:text-white">Settings</Link>
        <Link to="/logout" className="text-sm text-gray-300 hover:text-white">Logout</Link>
      </div>
    </aside>
  );
};
