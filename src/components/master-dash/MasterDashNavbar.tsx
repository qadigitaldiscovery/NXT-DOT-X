
import React from 'react';
import { ThemeToggle } from '@/components/ui/theme-toggle';

interface MasterDashNavbarProps {
  user?: {
    email?: string;
    role?: string;
  } | null;
}

const MasterDashNavbar: React.FC<MasterDashNavbarProps> = ({
  user
}) => {
  return (
    <header className="flex items-center justify-between p-4 border-b border-slate-800 bg-gray-200">
      <h1 className="text-xl font-semibold">Business Management Platform</h1>
      <div className="flex items-center gap-4">
        <div className="flex gap-2">
          <button className="p-2 text-slate-700 hover:text-slate-900">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 15a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4Z" />
              <path d="M4 10h6" />
              <path d="M14 10h6" />
              <path d="M9 15v5" />
              <path d="M15 15v5" />
              <path d="M12 10V3" />
              <path d="M6 7l6-4 6 4" />
            </svg>
          </button>
          <button className="p-2 text-slate-700 hover:text-slate-900">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
              <path d="m9 10 2 2 4-4" />
            </svg>
          </button>
          <button className="p-2 text-slate-700 hover:text-slate-900">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <path d="m17 8-5-5-5 5" />
              <path d="M12 3v12" />
            </svg>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
            {user?.email?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div className="p-2 bg-slate-700 rounded-md text-white">
            {user?.role || 'User'}
          </div>
          <div className="w-8 h-8 flex items-center justify-center bg-blue-500 rounded-md">
            <span className="text-white font-bold">+</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MasterDashNavbar;
