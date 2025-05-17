
import React from 'react';

interface GaugeRatingProps {
  value: number;
}

export const GaugeRating: React.FC<GaugeRatingProps> = ({ value }) => {
  // Calculate the angle for the gauge needle based on the value (0-100)
  const angle = (value / 100) * 180;
  
  return (
    <div className="relative w-48 h-24">
      {/* Gauge Background */}
      <div className="absolute w-full h-full border-t-0 border-l-[12px] border-r-[12px] border-b-[12px] border-blue-100 rounded-b-full"></div>
      
      {/* Green section of gauge */}
      <div 
        className="absolute left-0 bottom-0 w-full h-full overflow-hidden"
        style={{
          clipPath: `path('M 0 48 A 48 48 0 0 1 96 48 L 48 48 Z')`
        }}
      >
        <div className="absolute w-full h-full border-t-0 border-l-[12px] border-r-[12px] border-b-[12px] border-green-500 rounded-b-full"></div>
      </div>

      {/* Gauge value marker */}
      <div className="absolute top-0 left-[48px] origin-bottom transform" style={{ transform: `rotate(${angle - 90}deg)` }}>
        <div className="w-[3px] h-[40px] bg-black"></div>
        <div className="w-[9px] h-[9px] bg-black rounded-full relative -top-1 -left-[3px]"></div>
      </div>
    </div>
  );
};
