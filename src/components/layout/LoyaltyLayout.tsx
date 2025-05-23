import React from 'react';

interface LoyaltyLayoutProps {
  children: React.ReactNode;
}

const LoyaltyLayout: React.FC<LoyaltyLayoutProps> = ({ children }) => {
  return (
    <div className="loyalty-layout">
      {/* Placeholder for Loyalty-specific header/navigation */}
      <main className="loyalty-content">
        {children}
      </main>
      {/* Placeholder for Loyalty-specific footer */}
    </div>
  );
};

export { LoyaltyLayout };
