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
  variant = 'default',
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
      {/* Content container */}
      <div className="flex flex-col p-6 bg-zinc-100">
        {/* Title */}
        <h3 className="text-xl mb-6 text-center font-bold text-slate-500">
          {title}
        </h3>
        
        {/* Icon container - centered */}
        <div className="mx-auto rounded-full p-4 mb-4 bg-gray-100 text-gray-600">
          {icon}
        </div>

        {/* All Access Tag */}
        {allAccess && <span className="absolute top-3 right-3 bg-amber-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
            All Access
          </span>}
        
        {/* Toggle button for features */}
        {features.length > 0 && <Button variant="outline" size="sm" className="mt-4" onClick={e => {
        e.stopPropagation();
        setShowFeatures(!showFeatures);
      }}>
            {showFeatures ? <>Hide Features <ChevronUp className="ml-2 h-4 w-4" /></> : <>Show Features <ChevronDown className="ml-2 h-4 w-4" /></>}
          </Button>}
      </div>

      {/* Feature list - shown only when expanded */}
      {showFeatures && features.length > 0 && <div className="relative px-4 pt-2 pb-4">
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
            <p className="text-sm text-gray-600 mb-3 font-medium">Available Features:</p>
            <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto pr-1">
              {features.map((feature, index) => <Button key={index} variant="ghost" size="sm" className="justify-start text-gray-700 hover:bg-gray-100 font-normal" onClick={e => handleFeatureClick(feature.path, e)}>
                  <span className="truncate">{feature.name}</span>
                  <ExternalLink className="ml-auto h-3.5 w-3.5 text-gray-400" />
                </Button>)}
            </div>
          </div>
        </div>}
    </div>;
};