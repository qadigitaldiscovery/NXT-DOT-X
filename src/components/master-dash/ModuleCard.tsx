
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { useState } from 'react';
interface Feature {
  name: string;
  path: string;
  description?: string;
  category?: string;
}
interface ModuleCardProps {
  title: string;
  icon: React.ReactNode;
  path?: string;
  className?: string;
  variant?: 'default' | 'red' | 'dark' | 'light' | 'accent';
  features?: Feature[];
  allAccess?: boolean;
}
export const ModuleCard: React.FC<ModuleCardProps> = ({
  title,
  icon,
  path,
  className,
  features = [],
  allAccess = false
}) => {
  const navigate = useNavigate();
  const [showFeatures, setShowFeatures] = useState(false);
  const handleClick = () => {
    if (path && features.length === 0) {
      navigate(path);
    } else if (features.length > 0) {
      setShowFeatures(!showFeatures);
    } else {
      console.warn(`No path or features defined for module: ${title}`);
    }
  };
  const handleFeatureClick = (featurePath: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(featurePath);
  };

  // Apply card styling based on variant
  const getCardStyle = () => {
    return "relative cursor-pointer rounded-lg shadow-sm border bg-white text-gray-800 border-gray-200";
  };
  return <div className={`${getCardStyle()} ${className}`} onClick={handleClick}>
      {/* Content container - reduced height with more compact spacing */}
      <div className="flex flex-col p-3 bg-zinc-100">
        {/* Title - smaller text and margins */}
        <h3 className="text-lg mb-2 text-center font-bold text-slate-500">
          {title}
        </h3>
        
        {/* Icon container - smaller padding and margin */}
        <div className="mx-auto rounded-full p-2 mb-2 bg-gray-100 text-gray-600">
          {icon}
        </div>

        {/* All Access Tag - positioned to fit reduced height */}
        {allAccess && <span className="absolute top-2 right-2 bg-amber-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
            All Access
          </span>}
        
        {/* Toggle button for features - smaller with less margin */}
        {features.length > 0 && <Button variant="outline" size="sm" className="mt-2 py-1 text-xs" onClick={e => {
        e.stopPropagation();
        setShowFeatures(!showFeatures);
      }}>
            {showFeatures ? <>Hide Features <ChevronUp className="ml-1 h-3 w-3" /></> : <>Show Features <ChevronDown className="ml-1 h-3 w-3" /></>}
          </Button>}
      </div>

      {/* Feature list - shown only when expanded */}
      {showFeatures && features.length > 0 && <div className="relative px-3 pt-1 pb-2">
          <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
            <p className="text-xs text-gray-600 mb-1 font-medium">Available Features:</p>
            <div className="grid grid-cols-1 gap-1 max-h-40 overflow-y-auto pr-1">
              {features.map((feature, index) => <Button key={index} variant="ghost" size="sm" className="justify-start text-gray-700 hover:bg-gray-100 font-normal text-xs py-1" onClick={e => handleFeatureClick(feature.path, e)}>
                  <span className="truncate">{feature.name}</span>
                  <ExternalLink className="ml-auto h-3 w-3 text-gray-400" />
                </Button>)}
            </div>
          </div>
        </div>}
    </div>;
};
