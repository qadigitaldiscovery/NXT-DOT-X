
interface QuantumCoreProps {
  core?: {
    progress: number;
    days: number[];
  };
}

export const QuantumCoreCard = ({ 
  core = { 
    progress: 64, 
    days: [35, 41, 45, 64, 38, 43, 52, 42, 38, 45] 
  } 
}: QuantumCoreProps) => {
  // Find the index of the highest value (for highlighting)
  const highestIndex = core.days.indexOf(Math.max(...core.days));
  
  return (
    <div className="frosted-card h-full">
      <div className="glossy-overlay" />
      
      <div className="flex flex-col h-full">
        <h3 className="text-silver-300/80 mb-2 font-medium">Quantum Progress</h3>
        
        {/* Progress indicator pill */}
        <div className="relative my-6">
          <div className="absolute w-full h-px bg-black-800 top-1/2 -translate-y-1/2"></div>
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-redmetal-400 text-silver-100 rounded-full px-3 py-1 text-xs font-medium">
            {core.progress}%
          </div>
        </div>
        
        {/* Bar chart */}
        <div className="mt-8 flex items-end justify-between h-24">
          {core.days.map((value, index) => {
            const dayNumber = index + 11; // Starting from day 11
            const height = `${value}%`;
            const isHighlight = index === highestIndex;
            
            return (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className={`w-3 rounded-full ${isHighlight ? 'bg-silver-300' : 'bg-redmetal-400'}`}
                  style={{ height }}
                ></div>
                <span className={`text-xs mt-2 ${isHighlight ? 'text-silver-100' : 'text-silver-300/60'} tabular-nums`}>
                  {dayNumber}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
