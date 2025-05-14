import React from 'react';

export const Topbar = () => {
  return (
    <header className="h-16 bg-dockred text-white flex items-center justify-between px-6 shadow">
      <h1 className="text-lg font-bold">Lovable Platform</h1>
      <div className="relative group">
        <div className="cursor-pointer">👤</div>
        <div className="absolute right-0 mt-2 hidden group-hover:block bg-white text-black rounded shadow-lg w-48 p-2 z-10">
          <a href="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</a>
          <a href="/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</a>
          <a href="/logout" className="block px-4 py-2 hover:bg-gray-100">Logout</a>
        </div>
      </div>
    </header>
  );
};
