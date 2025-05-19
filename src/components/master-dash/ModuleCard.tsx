
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
  path?: string;
  className?: string;
  variant?: 'default' | 'red' | 'dark' | 'light' | 'accent';
  features?: Feature[];
  allAccess?: boolean;
}
export const ModuleCard: React.FC<ModuleCardProps> = ({
  title,
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
      <div className="flex flex-col p-1 bg-zinc-100">
        {/* Title - centered text */}
        <h3 className="text-sm mb-1 text-center font-medium text-slate-500">
          {title}
        </h3>
        
        {/* All Access Tag - positioned to fit reduced height */}
        {allAccess && <span className="absolute top-1 right-1 bg-amber-600 text-white text-xs font-semibold px-1 py-0.5 rounded-full">
            All Access
          </span>}
        
        {/* Toggle button for features - smaller with less margin */}
        {features.length > 0 && <Button variant="outline" size="sm" className="mt-1 py-0.5 text-xs h-6" onClick={e => {
        e.stopPropagation();
        setShowFeatures(!showFeatures);
      }}>
            {showFeatures ? <>Hide <ChevronUp className="ml-1 h-2 w-2" /></> : <>Show <ChevronDown className="ml-1 h-2 w-2" /></>}
          </Button>}
      </div>

      {/* Feature list - shown only when expanded */}
      {showFeatures && features.length > 0 && <div className="relative px-2 pt-1 pb-1">
          <div className="bg-gray-50 rounded-lg p-1 border border-gray-200">
            <p className="text-xs text-gray-600 mb-1 font-medium">Features:</p>
            <div className="grid grid-cols-1 gap-0.5 max-h-32 overflow-y-auto pr-1">
              {features.map((feature, index) => <Button key={index} variant="ghost" size="sm" className="justify-start text-gray-700 hover:bg-gray-100 font-normal text-xs py-0.5 h-6" onClick={e => handleFeatureClick(feature.path, e)}>
                  <span className="truncate">{feature.name}</span>
                  <ExternalLink className="ml-auto h-2 w-2 text-gray-400" />
                </Button>)}
            </div>
          </div>
        </div>}
    </div>;
};
