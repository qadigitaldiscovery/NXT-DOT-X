
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

interface Feature {
  name: string;
  path: string;
  description?: string;
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

  // Design variants based on the reference image
  const getVariantClasses = () => {
    switch (variant) {
      case 'red':
        return "bg-gradient-to-br from-redmetal-600 to-black text-white border-red-900";
      case 'dark':
        return "bg-gradient-to-br from-redmetal-600 to-black text-white border-gray-800";
      case 'light':
        return "bg-gradient-to-br from-redmetal-600 to-black text-white border-gray-200";
      case 'accent':
        return "bg-gradient-to-br from-redmetal-600 to-black text-white border-blue-700";
      default:
        return "bg-gradient-to-br from-redmetal-600 to-black text-white border-gray-800";
    }
  };

  // Icon container style variants
  const getIconContainerClasses = () => {
    switch (variant) {
      case 'red':
        return "bg-redmetal-600 text-white ring-2 ring-red-600";
      case 'dark':
        return "bg-gray-800 text-white ring-2 ring-gray-700";
      case 'light':
        return "bg-white text-gray-900 ring-2 ring-gray-200 shadow-sm";
      case 'accent':
        return "bg-blue-800 text-white ring-2 ring-blue-700";
      default:
        return "bg-gray-800 text-white ring-2 ring-gray-700";
    }
  };

  return (
    <motion.div 
      className={cn(
        "relative overflow-hidden cursor-pointer", 
        "rounded-xl shadow-lg border", 
        getVariantClasses(), 
        className,
        showFeatures && "pb-4"
      )} 
      onClick={handleClick} 
      whileHover={{
        scale: 1.02
      }} 
      transition={{
        duration: 0.3
      }}
    >
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-10" 
        style={{
          backgroundImage: "url('/lovable-uploads/f591cd6e-de49-44cf-bfb9-207fcd31b3ce.png')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }} 
      />
      
      {/* Neon blue splash/accent */}
      <div 
        className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-blue-500/30 blur-xl animate-pulse-neon" 
        style={{
          background: "radial-gradient(circle at center, rgba(56,189,248,0.6) 0%, rgba(59,130,246,0.3) 40%, transparent 70%)"
        }} 
      />
      
      {/* Content container */}
      <div className="relative z-10 flex flex-col p-6">
        {/* Title - Large and prominent like in the reference */}
        <h3 className="font-bold text-xl mb-6 text-center">
          {title}
        </h3>
        
        {/* Icon container - centered like in the reference */}
        <div className={cn(
          "mx-auto rounded-full p-4 mb-4", 
          getIconContainerClasses()
        )}>
          {icon}
        </div>

        {/* All Access Tag */}
        {allAccess && (
          <span className="absolute top-3 right-3 bg-amber-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
            All Access
          </span>
        )}
        
        {/* Toggle button for features */}
        {features.length > 0 && (
          <Button 
            variant="outline" 
            size="sm"
            className="mt-4 text-white border border-gray-600 bg-black/40 hover:bg-black/60"
            onClick={(e) => {
              e.stopPropagation();
              setShowFeatures(!showFeatures);
            }}
          >
            {showFeatures ? (
              <>Hide Features <ChevronUp className="ml-2 h-4 w-4" /></>
            ) : (
              <>Show Features <ChevronDown className="ml-2 h-4 w-4" /></>
            )}
          </Button>
        )}
      </div>

      {/* Feature list - shown only when expanded */}
      {showFeatures && features.length > 0 && (
        <motion.div 
          className="relative z-10 px-4 pt-2"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-black/50 rounded-lg p-3 border border-gray-700">
            <p className="text-sm text-gray-300 mb-3 font-medium">Available Features:</p>
            <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto custom-scrollbar pr-1">
              {features.map((feature, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="justify-start text-white hover:bg-white/10 font-normal"
                  onClick={(e) => handleFeatureClick(feature.path, e)}
                >
                  <span className="truncate">{feature.name}</span>
                  <ExternalLink className="ml-auto h-3.5 w-3.5 text-blue-400" />
                </Button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
