
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight } from 'lucide-react';

export interface ModuleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: { name: string; path: string }[];
  onClick?: () => void;
  variant?: 'default' | 'premium' | 'beta';
  path?: string; // Add path prop
}

export const ModuleCard: React.FC<ModuleCardProps> = ({
  title,
  description,
  icon,
  features,
  onClick,
  variant = 'default',
  path
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (path) {
      navigate(path);
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'premium':
        return 'border-yellow-200 bg-gradient-to-br from-yellow-50 to-amber-50 hover:from-yellow-100 hover:to-amber-100';
      case 'beta':
        return 'border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100';
      default:
        return 'border-gray-200 bg-white hover:bg-gray-50';
    }
  };

  const getVariantBadge = () => {
    switch (variant) {
      case 'premium':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Premium</Badge>;
      case 'beta':
        return <Badge className="bg-purple-100 text-purple-800 border-purple-200">Beta</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card 
      className={`cursor-pointer transition-all duration-200 hover:shadow-lg group ${getVariantStyles()}`}
      onClick={handleClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-blue-600 group-hover:text-blue-700 transition-colors">
              {icon}
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                {title}
              </CardTitle>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {getVariantBadge()}
            <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
          </div>
        </div>
        <CardDescription className="text-gray-600 mt-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-2">
          {features.slice(0, 4).map((feature, index) => (
            <div
              key={index}
              className="text-sm text-gray-500 hover:text-blue-600 transition-colors cursor-pointer p-1 rounded hover:bg-blue-50"
              onClick={(e) => {
                e.stopPropagation();
                navigate(feature.path);
              }}
            >
              • {feature.name}
            </div>
          ))}
        </div>
        {features.length > 4 && (
          <div className="text-xs text-gray-400 mt-2">
            +{features.length - 4} more features
          </div>
        )}
      </CardContent>
    </Card>
  );
};
