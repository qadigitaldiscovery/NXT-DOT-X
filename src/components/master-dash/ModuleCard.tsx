
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface Feature {
  name: string;
  path: string;
}

interface ModuleCardProps {
  title: string;
  path: string;
  features?: Feature[];
  description?: string;
  variant?: 'default' | 'active' | 'inactive';
}

export const ModuleCard: React.FC<ModuleCardProps> = ({
  title,
  path,
  features = [],
  description,
  variant = 'default',
}) => {
  const navigate = useNavigate();

  const handleModuleClick = () => {
    navigate(path);
  };

  const handleFeatureClick = (featurePath: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(featurePath);
  };

  const variantStyles = {
    default: 'border-gray-200 bg-card hover:border-primary/20 hover:shadow-md',
    active: 'border-green-500/30 bg-green-50 dark:bg-green-950/20',
    inactive: 'border-gray-200 bg-gray-50/50 dark:bg-gray-900/30 opacity-70'
  };

  return (
    <Card 
      className={cn(
        "transition-all duration-200 cursor-pointer h-full",
        variantStyles[variant]
      )}
      onClick={handleModuleClick}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold tracking-tight">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-1.5">
          {features.map((feature, index) => (
            <a
              key={index}
              href={feature.path}
              onClick={(e) => handleFeatureClick(feature.path, e)}
              className="text-sm hover:underline flex items-center text-muted-foreground hover:text-foreground"
              aria-label={`Open ${feature.name}`}
            >
              <span className="ml-1">{feature.name}</span>
            </a>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <a
          href={path}
          onClick={(e) => {
            e.preventDefault();
            handleModuleClick();
          }}
          className="text-sm font-medium flex items-center text-primary hover:underline"
          aria-label={`Go to ${title}`}
        >
          View {title}
          <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
        </a>
      </CardFooter>
    </Card>
  );
};
