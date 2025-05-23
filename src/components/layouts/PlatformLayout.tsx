import React from 'react';

interface PlatformLayoutProps {
  children: React.ReactNode;
  moduleTitle: string; // Added moduleTitle prop
  useGlobalNavigation: boolean; // Added useGlobalNavigation prop
}

const PlatformLayout: React.FC<PlatformLayoutProps> = ({ children, moduleTitle, useGlobalNavigation }) => {
  return (
    <div className="platform-layout">
      {/* Placeholder for header/sidebar */}
      <main className="platform-content">
        {children}
      </main>
      {/* Placeholder for footer */}
    </div>
  );
};

export { PlatformLayout };
