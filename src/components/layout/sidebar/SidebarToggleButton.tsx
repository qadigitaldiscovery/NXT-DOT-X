import React from 'react';

export const SidebarToggleButton = ({ onToggle }: { onToggle: () => void }) => (
  <button onClick={onToggle} className="text-sm text-gray-500 px-4 py-2">
    Toggle Sidebar
  </button>
);
