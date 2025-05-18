
import React from 'react';

interface MainSidebarBackdropProps {
  onToggle: () => void;
}

export const MainSidebarBackdrop: React.FC<MainSidebarBackdropProps> = ({ onToggle }) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 z-20 backdrop-blur-sm" 
      onClick={onToggle} 
    />
  );
};
