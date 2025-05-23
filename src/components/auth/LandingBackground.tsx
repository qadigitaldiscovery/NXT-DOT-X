
import React, { ReactNode } from 'react';

interface LandingBackgroundProps {
  children: ReactNode;
  backgroundImageUrl: string;
}

export const LandingBackground: React.FC<LandingBackgroundProps> = ({ children, backgroundImageUrl }) => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* Full-screen background image */}
      <div className="absolute inset-0 z-0 bg-black" style={{
        backgroundImage: `url('${backgroundImageUrl}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }} />
      
      {/* Semi-transparent overlay to ensure text readability */}
      <div className="absolute inset-0 z-0 bg-black/30" />

      {/* Content positioned on top of background */}
      <div className="relative z-10 flex flex-col items-center justify-center mt-32">
        {children}
      </div>
    </div>
  );
};
