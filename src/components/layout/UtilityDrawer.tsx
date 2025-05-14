import React from 'react';

export const UtilityDrawer = () => {
  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-metallic text-white shadow-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Quick Tools</h2>
      <ul>
        <li className="mb-2">📅 Calendar</li>
        <li className="mb-2">🔔 Notifications</li>
        <li className="mb-2">📊 Reports</li>
      </ul>
    </div>
  );
};
